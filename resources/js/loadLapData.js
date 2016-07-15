
$('#simButton').on('click',  function() {
  simulateLap();
});

function simulateLap(){
	$.getJSON( "resources/data/SimResult_XYZ_Run000123.json", function( data ) {
		var time = data.FIELD1;
		var timeIncrements = +time[1];
		var speed = data.FIELD3;
		
		time.pop();
		speed.pop();
		var distance = [];
		distance[0] = 0;
		for (var i = 0; i < time.length; i++) {
			speed[i] = parseFloat(speed[i]); 
			distance[i+1] = distance[i]+ speed[i]/3.6*timeIncrements;
		}
		distance.pop();


		var list = [];
		for (var i = 0; i <= time.length-1; i++) {
		    list.push(i);
		}

		plotResults("canvas1", list, speed);
		//plotResults("canvas1", distance, speed);
	})
}