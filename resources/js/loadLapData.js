
// $('#simButton').on('click',  function() {
//   simulateLap();
// });

function loadLapData(lapID){
	var lapName = jobData_parsed[1][lapID-1];
	$.getJSON( "resources/data/"+lapName +".json", loadLapCallback);
}
function loadLapCallback( data ) {
	window.lapData[lapID-1] = data;
}