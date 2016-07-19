//var canvas = document.getElementById('canvas1');


function clickPlotButton(){
  $(this).toggleClass('plotted');
  $targetCell = $(this);
  getLapsToBePlotted($targetCell);
  
  plotData();
}

function getLapsToBePlotted(){
  $thisID = $targetCell.attr("id");
  lapID = parseInt($thisID.replace('plotCell',''));
  if ($.inArray(lapID, toBePlotted) == -1){
    toBePlotted.push(lapID);
  }else{
    var index = toBePlotted.indexOf(lapID);
    toBePlotted.splice(index, 1);
  }

}

function plotData(){
	
	// check which plots are to be plotted in:
	var plotIDs = [],
	channelNames = [];
	$('.plot').each(function() {
	    plotIDs.push(this.id);
	});
	var plotObject = {};
	// for each plot, 
	for (var i = 0; i<plotIDs.length; i++){
		// 	check which cannels need to be plotted (for each of the laps):
		plotObject[plotIDs[i]] = {};
		plotObject[plotIDs[i]].channelName = $("#"+plotIDs[i]).children().children(".channelSelector").val();
		plotObject[plotIDs[i]].YData = {};
		var maxYVal = Number.NEGATIVE_INFINITY;
		var minYVal = Number.POSITIVE_INFINITY;
		//fetch the data of the channels:
		for (var j=0; j< toBePlotted.length; j++){
			channelIndex= channelNamesInFiles.indexOf(plotObject[plotIDs[i]].channelName );
			var fieldIndex = channelIndex+1;
			plotObject[plotIDs[i]].YData[toBePlotted[j]] = lapData[toBePlotted[j]-1]["FIELD"+fieldIndex].slice(1);
			// 	find maximum and minimum values across all laps 
			maxYCurr = Math.max.apply(Math,plotObject[plotIDs[i]].YData[toBePlotted[j]]);
			minYCurr = Math.min.apply(Math,plotObject[plotIDs[i]].YData[toBePlotted[j]]);
			
			if (maxYCurr > maxYVal){
				maxYVal = maxYCurr;
			}
			if (minYCurr < minYVal){
				minYVal = minYCurr;
			}
		}
		plotObject[plotIDs[i]].maxYVal = maxYVal;
		plotObject[plotIDs[i]].minYVal = minYVal;




		// 	scale the plot to accommodate min and max
		// 	plot each channel
	}
	a = 1;

}

function plotChannel(canvasName, xVar, yVar){
	var canvas = document.getElementById(canvasName);
	var context = canvas.getContext('2d');
	var maxXVal = Math.max.apply(Math,xVar);
	var maxYVal = Math.max.apply(Math,yVar)*1.05;
	
	canvas.width = maxXVal;
	canvas.height = maxYVal;

	// plotAxes(maxYVal)

	context.beginPath();
	context.moveTo(0, 0);
	for (var i=0; i<xVar.length; i++){
		context.lineTo(xVar[i],maxYVal-yVar[i] );
	}
	// context.lineTo(10,100 );
	// context.lineTo(10,200 );
	
	context.lineWidth = 2;

	// set line color
	context.strokeStyle = '#08c1fe';
	context.stroke();
}





// var time = data.FIELD1.slice(1),
// 		timeIncrements = +time[1],
// 		CHA_Speed = data.FIELD2.slice(1),	
// 	 	DRV_Pedal_Pos = data.FIELD3.slice(1),
// 		DRV_Brk_Pressure_F = data.FIELD4.slice(1),
// 		GBX_Position = data.FIELD5.slice(1),
// 		CHA_Acc_Lat = data.FIELD6.slice(1),
// 		DRV_Steer_Angle = data.FIELD7.slice(1),
// 		CHA_Yaw_Rate = data.FIELD8.slice(1),
// 		TRK_Distance = data.FIELD9.slice(1);
	
// 	// time.pop();
// 	// CHA_Speed.pop();
// 	// var distance = [];
// 	// distance[0] = 0;
// 	// for (var i = 0; i < time.length; i++) {
// 	// 	CHA_Speed[i] = parseFloat(CHA_Speed[i]); 
// 	// 	distance[i+1] = distance[i]+ CHA_Speed[i]/3.6*timeIncrements;
// 	// }
// 	// distance.pop();

// 	// var list = [];
// 	// for (var i = 0; i <= time.length-1; i++) {
// 	//     list.push(i);
// 	// }

// 	//plotChannel("canvas1", list, CHA_Speed);

// 	// var GBX_scaled = [];
// 	// for (var i=0; i<GBX_Position.length; i++){
// 	// 	GBX_scaled[i] = GBX_Position[i]*100;
// 	// }


// 	plotChannel("canvas1", distance, GBX_scaled);