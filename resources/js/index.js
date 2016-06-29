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