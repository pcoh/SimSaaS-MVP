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
	if (toBePlotted.length == 0){
		clearAllPlots();
		return;
	}	
	// check which plots are to be plotted in:
	var plotIDs = [],
	channelNames = [];
	$('.plot').each(function() {
	    plotIDs.push(this.id);
	});
	var plotObject = {};
	var xFieldIndex= channelNamesInFiles.indexOf("TRK_Distance")+1;
	// for each plot, 
	for (var i = 0; i<plotIDs.length; i++){
		// 	check which cannels need to be plotted (for each of the laps):
		plotObject[plotIDs[i]] = {};
		plotObject[plotIDs[i]].channelName = $("#"+plotIDs[i]).children().children(".channelSelector").val();
		plotObject[plotIDs[i]].YData = {};
		plotObject[plotIDs[i]].XData = {};
		var maxYVal = Number.NEGATIVE_INFINITY;
		var minYVal = Number.POSITIVE_INFINITY;
		var maxXVal = Number.NEGATIVE_INFINITY;
		var minXVal = Number.POSITIVE_INFINITY;

		var canvasName = plotIDs[i].replace("plot","canvas");
		var canvas = document.getElementById(canvasName);
		canvas.width =$(".canvasContainer").width();
		canvas.height =$(".canvasContainer").height();
		var context = canvas.getContext('2d');

		//fetch the data of the channels:
		for (var j=0; j< toBePlotted.length; j++){
			var yFieldIndex = channelNamesInFiles.indexOf(plotObject[plotIDs[i]].channelName )+1;
			plotObject[plotIDs[i]].YData[toBePlotted[j]] = lapData[toBePlotted[j]-1]["FIELD"+yFieldIndex].slice(1);
			plotObject[plotIDs[i]].XData[toBePlotted[j]] = lapData[toBePlotted[j]-1]["FIELD"+xFieldIndex].slice(1);
			var plotColor = plotColors[j];
			
			

			// 	find maximum and minimum values across all laps 
			maxYCurr = Math.max.apply(Math,plotObject[plotIDs[i]].YData[toBePlotted[j]]);
			minYCurr = Math.min.apply(Math,plotObject[plotIDs[i]].YData[toBePlotted[j]]);

			maxXCurr = Math.max.apply(Math,plotObject[plotIDs[i]].XData[toBePlotted[j]]);
			minXCurr = Math.min.apply(Math,plotObject[plotIDs[i]].XData[toBePlotted[j]]);
			
			if (maxYCurr > maxYVal){
				maxYVal = maxYCurr;
			}
			if (minYCurr < minYVal){
				minYVal = minYCurr;
			}
			if (maxXCurr > maxXVal){
				maxXVal = maxXCurr;
			}
			if (minXCurr < minXVal){
				minXVal = minXCurr;
			}
		
			plotObject[plotIDs[i]].maxYVal = maxYVal;
			plotObject[plotIDs[i]].minYVal = minYVal;
			plotObject[plotIDs[i]].maxXVal = maxXVal;
			plotObject[plotIDs[i]].minXVal = minXVal;

			
			plotChannel(canvasName,context, plotObject[plotIDs[i]].XData[toBePlotted[j]],plotObject[plotIDs[i]].YData[toBePlotted[j]],plotObject[plotIDs[i]].minXVal,plotObject[plotIDs[i]].maxXVal,plotObject[plotIDs[i]].minYVal,plotObject[plotIDs[i]].maxYVal,plotColor);
		}
		// 	scale the plot to accommodate min and max
		// 	plot each channel
	}
	

}

function plotChannel(canvasName, context, xVar, yVar, minXVal, maxXVal, minYVal, maxYVal,plotColor){
	
	// var maxXVal = Math.max.apply(Math,xVar);
	// var maxYVal = Math.max.apply(Math,yVar)*1.05;
	
	// canvas.width = maxXVal;
	// canvas.height = maxYVal;

	// plotAxes(maxYVal)

	//scale and shift data for plotting (also invert y Data):
	var xRange = maxXVal-minXVal;
	var yRange = maxYVal-minYVal;
	var canvasWidth = $("#"+canvasName).width();
	var canvasHeight = $("#"+canvasName).height();

	var scaledXData = [], scaledYData = [];
	for (var i=0; i<xVar.length; i++){
		scaledXData[i] = (xVar[i]-minXVal)*canvasWidth/xRange;
		scaledYData[i] = canvasHeight- (yVar[i]-minYVal)*canvasHeight/yRange;
	}

	context.beginPath();
	context.moveTo(scaledXData[1], scaledYData[1]);
	for (var i=1; i<scaledXData.length; i++){
		context.lineTo(scaledXData[i],scaledYData[i] );
	}
	// context.lineTo(10,100 );
	// context.lineTo(10,200 );
	
	context.lineWidth = 1;

	// set line color
	context.strokeStyle = plotColor;
	context.stroke();
	context.closePath()
	a = 1;
}
function clearAllPlots(){
	$('.plotCanvas').each(function(idx, item) {
		var context = item.getContext("2d");
		context.clearRect(0, 0, item.width, item.height);
		context.beginPath();        
	});
	//context.clearRect(0, 0, canvas.width, canvas.height);
}