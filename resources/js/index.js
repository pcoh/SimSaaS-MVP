$(function() {
    $( "#selectTrackGrip" ).selectmenu();
})

$(function() {
    $( "#selectWingPos" ).selectmenu();
})

$(function() {
    $( "#selectRH_Front" ).selectmenu();
})

$(function() {
    $( "#selectRH_Rear" ).selectmenu();
})

$(function() {
    $( "#selectSpringStiff_Front" ).selectmenu();
})

$(function() {
    $( "#selectSpringStiff_Rear" ).selectmenu();
})

$(function() {
    $( "#selectARBStiff_Front" ).selectmenu();
})

$(function() {
    $( "#selectARBStiff_Rear" ).selectmenu();
})

$(function() {
    $( "button" )
      .button()
      .click(function( event ) {
        event.preventDefault();
      });
});

function customScrollBar($event){
  var delay = 1000;
  var timeout = null;
  var targetElement = event.target;      
  $(targetElement).addClass('scrolling');
  clearTimeout(timeout);
  timeout = setTimeout(function(){
    $(targetElement).removeClass('scrolling');
  },delay);
}

$( document ).ready(function() {
  //$(function(){
      //$('.scroll-pane').jScrollPane();
  //});
  resizeTrackArea();
  resizeWorkSpace();
  $("#divControlTableRow").css({ 'margin-bottom': $("#divTableAndSpacer").height()});
  $("#divTableAndSpacer").css({ 'top': $("#divControlTableRow").offset().top + $("#divControlTableRow").outerHeight(false)});

  $('#divTableAndSpacer').on('mousewheel',function(event) {

    wheel = event.originalEvent.wheelDeltaY;
    scrollPos = $("#divWorkspaceContainer").scrollTop()-wheel;
    tableSpaceScroll = true;        
    $('#divWorkspaceContainer').scroll( );
    tableSpaceScroll = false;
  });

  controlTable2Pos();
  positionBG();

  $( '#divTrackContainer').scroll(function(event) {
    customScrollBar(event);      
  });
  $( '#table1ContentScroller').scroll(function(event) {
    customScrollBar(event);      
  });
  $( '#divTable1Container').scroll(function(event) {
    customScrollBar(event);      
  });    
  $( '#divWorkspaceContainer').scroll(function(event) {
    customScrollBar(event);      
  });    
});

$( window ).resize(function() {
	resizeTrackArea();
	resizeWorkSpace();
  scrollPos = $("#divWorkspaceContainer").scrollTop();
  smartScroll(scrollPos); 
  positionBG();
  resizeSelectMenus();
})

$('.addPlot').on('click',  function() {
  plotCount = plotCount +1;
	plotContHTML = createPlotContainer(plotCount);
	$( plotContHTML ).insertBefore( $(this).parent()).slideDown();
	addListenerToPlots();	
});

$('#divWorkspaceContainer').on('click', 'div a .removePlot', function() {
	$(this).parent().parent().slideUp(400, function() {
		$(this).parent().remove();
	});
	addListenerToPlots();
	plotCount = plotCount -1;
});

addListenerToPlots();