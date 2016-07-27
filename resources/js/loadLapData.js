function loadLapData(lapID){
	var lapName = jobData_parsed[1][lapID-1];
	$.getJSON( "resources/data/"+(currEvent < 10 ? '0'+currEvent : currEvent)+'/'+lapName +".json", loadLapCallback);
}

function loadLapCallback( data ) {
	if(!simData.hasOwnProperty(currEvent)){
		simData[currEvent]= {};
	}
	if(!simData[currEvent].hasOwnProperty('lapData')){
		simData[currEvent].lapData={};
	}
	window.simData[currEvent].lapData[lapID-1] = data;
	alert('dunzo!');
}