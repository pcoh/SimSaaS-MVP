function resizeTrackArea() {
  $("#divTrackContainer").height($( window ).height());
}
function resizeWorkSpace() {
	var WSheight = $( window ).height()-$("#divEventBanner").height()-$("#navTrackNavBar").height();
  	$("#divWorkspaceContainer").height(WSheight);
  	//alert($( window ).height() + " "+$("#divEventBanner").height() + " " + $("#navTrackNavBar").height()+ " " + WSheight);
}

$( document ).ready(function() {
    resizeTrackArea();
    resizeWorkSpace();
});
$( window ).resize(function() {
	resizeTrackArea();
	resizeWorkSpace();
})

$('.addPlot').on('click',  function() {
     // $( "<div class=\"col-sm-12 fuchsia divPlotContainer myhidden\" >PlotContainer<a href=\"#\"><span class=\"removePlot grey\">Remove Plot</span></a></div>" ).insertBefore( $(this).parent(), function(){
     // 	$(this).closest(".divPlotContainer" ).show();
     // });

	$( "<div class=\"col-sm-12 fuchsia divPlotContainer\" >PlotContainer<a href=\"#\"><span class=\"removePlot grey\">Remove Plot</span></a></div>" ).insertBefore( $(this).parent()).slideDown();
});

$('#divWorkspaceContainer').on('click', 'div a .removePlot', function() {
	$(this).parent().parent().slideUp(400, function() {
		$(this).remove();
	});
});