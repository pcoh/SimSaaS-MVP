
// //initialize variables
// plotCount = 1;
// stdPlotOpcacity = $(".divPlotContainer").css("opacity");
// dragPlotOpacity = '0.4';
// tableSpaceScroll = false;



$( document ).ready(function() {
    resizeTrackArea();
    resizeWorkSpace();
    $("#divControlTableRow").css({ 'margin-bottom': $("#divTableAndSpacer").height()});
    $("#divTableAndSpacer").css({ 'top': $("#divControlTableRow").height()+$("#divEventBanner").height()});

    $('#divTableAndSpacer').on('mousewheel',function(event) {
      wheel = event.originalEvent.wheelDeltaY;
      scrollPos = $("#divWorkspaceContainer").scrollTop()-wheel;
      tableSpaceScroll = true;
        
      $('#divWorkspaceContainer').scroll( );
      tableSpaceScroll = false;
    });

    controlTable2Pos();
});
$( window ).resize(function() {
	resizeTrackArea();
	resizeWorkSpace();
  scrollPos = $("#divWorkspaceContainer").scrollTop();
  smartScroll(scrollPos); 
})

$('.addPlot').on('click',  function() {
  plotCount = plotCount +1;
	plotContHTML = createPlotContainer(plotCount);
	$( plotContHTML ).insertBefore( $(this).parent()).slideDown();
	addListenerToPlots();	
});

$('#divWorkspaceContainer').on('click', 'div a .removePlot', function() {
	$(this).parent().parent().slideUp(400, function() {
		$(this).remove();
	});
	addListenerToPlots();
	plotCount = plotCount -1;
});

addListenerToPlots();