function resizeTrackArea() {
  $("#divTrackContainer").height($( window ).height());
}

$( document ).ready(function() {
    resizeTrackArea();
});
$( window ).resize(function() {
	resizeTrackArea();
})