$(document).ready(function(){
	$.getJSON("testJSON.json", { name: "Patrick"},getJSONCallback);
	//$.getJSON( "resources/data/"+(currEvent < 10 ? '0'+currEvent : currEvent)+'/'+lapName +".json", loadLapCallback);

})




function getJSONCallback(data){
	window.fetchedData = data;
	$.each(data.person, function(){
		$("ul").append("<li>name: "+this['name']+"</li>");
	})
}