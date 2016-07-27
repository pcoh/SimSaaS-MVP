$( document ).ready(function() {
  $('#simButton').button('disable');
  buildEventControls();
  
    
  $('#event'+currEvent).click();
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
$('#divTable2Container').scroll(function(event) {
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
	//plotCount = plotCount -1;
});


$( ".tableHeader.sortable" ).click(function() {
      
      sortAxis = (this.innerHTML);
      if(lastSorted == sortAxis){
        sortDir = sortDirVector[axesVector.indexOf(sortAxis)]*-1;
        sortDirVector = sortDirVector_default.slice(0);
        sortDirVector[axesVector.indexOf(sortAxis)] = sortDir;
      }else{
        sortDirVector = sortDirVector_default.slice(0);
        sortDir = sortDirVector[axesVector.indexOf(sortAxis)];        
      }
      $( ".tableHeader" ).removeClass("sortAsc");
      $( ".tableHeader" ).removeClass("sortDesc");
      if (sortDir == 1){
       $(this).addClass("sortAsc");
      }else{
       $(this).addClass("sortDesc") 
      }
      lastSorted = sortAxis;
      $( ".diamondRow" ).remove();
      fillTable1(sortAxis, sortDir);
      
    });
