$( document ).ready(function() {
  readJobData(jobPath);
  resizeTrackArea();
  resizeWorkSpace();
  $("#divControlTableRow").css({ 'margin-bottom': $("#divTableAndSpacer").outerHeight(true)});
  $("#divTableAndSpacer").css({ 'top': $("#divControlTableRow").offset().top + $("#divControlTableRow").outerHeight(false)});
  controlTable2Pos();
  positionBG();
  populatePlot1DD();
});

$( window ).resize(function() {
	resizeTrackArea();
	resizeWorkSpace();
  scrollPos = $("#divWorkspaceContainer").scrollTop();
  smartScroll(scrollPos); 
  positionBG();
  resizeSelectMenus();
  plotData();
})

$('#divTrackContainer').scroll(function(event) {
  customScrollBar(event);      
});
$('#table1ContentScroller').scroll(function(event) {
  customScrollBar(event);      
});
$('#divTable1Container').scroll(function(event) {
  customScrollBar(event);      
});    
$('#divWorkspaceContainer').scroll(function(event) {
  customScrollBar(event);      
});  

$('#divTableAndSpacer').on('mousewheel',function(event) {
  wheel = event.originalEvent.wheelDeltaY;
  scrollPos = $("#divWorkspaceContainer").scrollTop()-wheel;
  tableSpaceScroll = true;        
  $('#divWorkspaceContainer').scroll( );
  tableSpaceScroll = false;
});

$('#simButton').on('click',  function() {
  getSimSettings();
   // loadLapData(); 
});

$('.eventSelector').on('click',  function() {
  $('.eventSelector').removeClass('activeEvent')
  $(this).addClass('activeEvent');
  var activeRound = $(this).clone().children().remove().end().text();
  var eventName = $(this).children('.divtrackName').html();
  $('#eventHeadline').html(activeRound + ' - '+ eventName);
});

$('.addPlot').on('click',  function() {
  plotCount = plotCount +1;
	plotContHTML = createPlotContainer(plotCount);  

	$( plotContHTML ).insertBefore( $(this).parent()).slideDown();
  
  $( ".channelSelector" ).selectmenu();
  
	addListenerToPlots();	
  $(".channelSelector").on('selectmenuchange',  onChannelSelectorChange);
  plotData();
});

$('#divWorkspaceContainer').on('click', 'div a .removePlot', function() {
	$(this).parent().parent().slideUp(400, function() {
		$(this).parent().remove();
	});
	addListenerToPlots();
	plotCount = plotCount -1;
});

