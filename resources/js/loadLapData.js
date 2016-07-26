
// $('#simButton').on('click',  function() {
//   simulateLap();
// });

function loadLapData(lapID){
	var lapName = jobData_parsed[1][lapID-1];
	$.getJSON( "resources/data/"+lapName +".json", loadLapCallback);
}
function loadLapCallback( data ) {
	if(!simData.hasOwnProperty(currEvent)){
		simData[currEvent]= {};
	}
	if(!simData[currEvent].hasOwnProperty('lapData')){
		simData[currEvent].lapData={};
	}
	window.simData[currEvent].lapData[lapID-1] = data;
}