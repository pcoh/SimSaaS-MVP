function clickPlotButton(){
	$targetCell = $(this);
	lapID = getPlotLapID($targetCell);

	if ($(this).hasClass("plotCell")){
		$(this).toggleClass('plotted');
	}else if ($(this).hasClass("removeCell")){
		$("#plotCell"+lapID).toggleClass('plotted');
	}


	getLapsToBePlotted(lapID); 
	if($.inArray(lapID, toBePlotted) != -1){
		addLapToTable2(lapID); 
	}else{
		removeLapFromTable2(lapID);
	}
	plotData();
	
	
}

addLapToTable2 = function(lapID){
  	//if ($("#plotRow"+lapID).length ==0){
    
    if (toBePlotted.length %2 !=0){
      var rowType = "oddRow";
    }else{
      var rowType = "evenRow"
    }

  	var lapHTML2 = "<div class=\"plotRow " +rowType +"\" id=\"plotRow"+lapID+"\"><span id=\"removeCell"+lapID+ "\" class=\"cell removeCell\"></span><span class=\"cell lapTimeCell\"></span><span class=\"cell trackGripCell\"></span>"+
	    "<span class=\"cell wingPosCell\"></span><span class=\"cell RHF_Cell\"></span><span class=\"cell RHR_Cell\"></span><span class=\"cell SSF_Cell\"></span>"+
	    "<span class=\"cell SSR_Cell\"></span><span class=\"cell ARBF_Cell\"></span><span class=\"cell ARBR_Cell\"></span><span class=\"cell colorCell rightMost\">"+
	    "<div class=\"colorSample\"></div></span>";
	//}
	$("#rowContainer2").append(lapHTML2);
	$("#plotRow"+lapID).children('.lapTimeCell').html($("#lapRow"+lapID).children('.lapTimeCell').html());
	$("#plotRow"+lapID).children('.trackGripCell').html($("#lapRow"+lapID).children('.trackGripCell').html());
	$("#plotRow"+lapID).children('.wingPosCell').html($("#lapRow"+lapID).children('.wingPosCell').html());
	$("#plotRow"+lapID).children('.RHF_Cell').html($("#lapRow"+lapID).children('.RHF_Cell').html());
	$("#plotRow"+lapID).children('.RHR_Cell').html($("#lapRow"+lapID).children('.RHR_Cell').html());
	$("#plotRow"+lapID).children('.SSF_Cell').html($("#lapRow"+lapID).children('.SSF_Cell').html());
	$("#plotRow"+lapID).children('.SSR_Cell').html($("#lapRow"+lapID).children('.SSR_Cell').html());
	$("#plotRow"+lapID).children('.ARBF_Cell').html($("#lapRow"+lapID).children('.ARBF_Cell').html());
	$("#plotRow"+lapID).children('.ARBR_Cell').html($("#lapRow"+lapID).children('.ARBR_Cell').html());

	reStyleRows('#rowContainer2','.plotRow');

	$("#plotRow"+lapID)
      .children(".removeCell")
      .on('click',  clickPlotButton);
}

function removeLapFromTable2(lapID){
	$("#plotRow"+lapID).remove();
	reStyleRows('#rowContainer2','.plotRow');
}


function getLapsToBePlotted(lapID){	 	
	if ($.inArray(lapID, toBePlotted) == -1){
		toBePlotted.push(lapID);
	}else{
		var index = toBePlotted.indexOf(lapID);
		toBePlotted.splice(index, 1);
	}
}
function getPlotLapID($targetCell){
	$thisID = $targetCell.attr("id");
	//lapID = parseInt($thisID.replace('plotCell',''));
	lapID = parseInt($thisID.match(/\d+/));
	return lapID;
}

function plotData(){
	clearAllPlots();
	if (toBePlotted.length == 0){		
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
	var xUnit = channelUnits[xFieldIndex-1];
	// for each plot, 
	for (var i = 0; i<plotIDs.length; i++){
		// 	check which cannels need to be plotted (for each of the laps):
		plotObject[plotIDs[i]] = {};
		plotObject[plotIDs[i]].channelName = $("#"+plotIDs[i]).children().children(".channelSelector").val();
		plotObject[plotIDs[i]].XData = {};
		plotObject[plotIDs[i]].YData = {};		
		plotObject[plotIDs[i]].XUnit = [];
		plotObject[plotIDs[i]].YUnit = [];		
		
		var maxXVal = Number.NEGATIVE_INFINITY;
		var minXVal = Number.POSITIVE_INFINITY;
		var maxYVal = Number.NEGATIVE_INFINITY;
		var minYVal = Number.POSITIVE_INFINITY;
		
		var canvasName = plotIDs[i].replace("plot","canvas");
		var canvas = document.getElementById(canvasName);
		canvas.width =$(".canvasContainer").width();
		canvas.height =$(".canvasContainer").height();
		var context = canvas.getContext('2d');
		var cursorCanvasName = plotIDs[i].replace("plot","cursorCanvas");
		var cursorCanvas = document.getElementById(cursorCanvasName);
		cursorCanvas.width = $(".canvasContainer").width(); 
		cursorCanvas.height = $(".canvasContainer").height();
		$("#cursorCanvas"+(i+1)).css({"margin-top" : -$(".canvasContainer").height()});

		//fetch the data of the channels:
		for (var j=0; j< toBePlotted.length; j++){
			var yFieldIndex = channelNamesInFiles.indexOf(plotObject[plotIDs[i]].channelName )+1;
		if (j==0){
			var yUnit = channelUnits[yFieldIndex-1];
			plotObject[plotIDs[i]].XUnit = xUnit;
			plotObject[plotIDs[i]].YUnit = yUnit;
		}
			
			plotObject[plotIDs[i]].XData[toBePlotted[j]] = simData[currEvent].lapData[toBePlotted[j]-1]["FIELD"+xFieldIndex].slice(1);
			plotObject[plotIDs[i]].YData[toBePlotted[j]] = simData[currEvent].lapData[toBePlotted[j]-1]["FIELD"+yFieldIndex].slice(1);
			
			// 	find maximum and minimum values across all laps 
			maxXCurr = Math.max.apply(Math,plotObject[plotIDs[i]].XData[toBePlotted[j]]);
			minXCurr = Math.min.apply(Math,plotObject[plotIDs[i]].XData[toBePlotted[j]]);
			maxYCurr = Math.max.apply(Math,plotObject[plotIDs[i]].YData[toBePlotted[j]]);
			minYCurr = Math.min.apply(Math,plotObject[plotIDs[i]].YData[toBePlotted[j]]);

			if (maxXCurr > maxXVal){
				maxXVal = maxXCurr;
			}
			if (minXCurr < minXVal){
				minXVal = minXCurr;
			}
			if (maxYCurr > maxYVal){
				maxYVal = maxYCurr;
			}
			if (minYCurr < minYVal){
				minYVal = minYCurr;
			}
		
			plotObject[plotIDs[i]].maxXVal = maxXVal;
			plotObject[plotIDs[i]].minXVal = minXVal;
			plotObject[plotIDs[i]].maxYVal = maxYVal;
			plotObject[plotIDs[i]].minYVal = minYVal;		
		}

		// set Range of plot axes:
		var xPlotRange = [plotObject[plotIDs[i]].minXVal,plotObject[plotIDs[i]].maxXVal];
		var yPlotRange = setYAxisRange(plotObject[plotIDs[i]].minYVal, plotObject[plotIDs[i]].maxYVal);		
		for (var j=0; j< toBePlotted.length; j++){
			var plotColor = plotColors[j];
			plotChannel(canvasName,context, plotObject[plotIDs[i]].XData[toBePlotted[j]],plotObject[plotIDs[i]].YData[toBePlotted[j]],xPlotRange[0],xPlotRange[1],yPlotRange[0],yPlotRange[1],plotColor);
		}
		var axisLocation = setAxisLocation("X", yPlotRange[0],yPlotRange[1]);
		var scaledXAxisData = scaleData2Canvas("X",axisLocation, canvasName, yPlotRange[0],yPlotRange[1], true);
		var axisLocation = setAxisLocation("Y", xPlotRange[0],xPlotRange[1]);
		var scaledYAxisData = scaleData2Canvas("Y",axisLocation, canvasName, xPlotRange[0],xPlotRange[1], true);

		plotAxis("X", scaledXAxisData, canvasName, yPlotRange[0],yPlotRange[1]);
		plotAxis("Y", scaledYAxisData, canvasName, xPlotRange[0],xPlotRange[1]);

		var xTickPos = calcTickPos("X",xPlotRange);
		var yTickPos = calcTickPos("Y",yPlotRange);
		xTickPosScaled = scaleData2Canvas("X", xTickPos, canvasName, xPlotRange[0],xPlotRange[1], false);
		yTickPosScaled = scaleData2Canvas("Y", yTickPos, canvasName, yPlotRange[0],yPlotRange[1], false);

		plotTickMarks("X", xTickPosScaled, scaledXAxisData[0], scaledYAxisData[0],canvasName);
		plotTickMarks("Y", yTickPosScaled, scaledYAxisData[0], scaledXAxisData[0],canvasName);

		plotTickValues("X",xTickPos, xTickPosScaled, scaledXAxisData[0], scaledYAxisData[0], canvasName, xUnit);
		plotTickValues("Y",yTickPos, yTickPosScaled, scaledYAxisData[0], scaledXAxisData[0], canvasName, yUnit);
		


	}
	window.plotObject =plotObject;
	$(".cursorCanvas").on('mousemove',  onCursorCanvasHover);
    $(".cursorCanvas").on('mouseleave',  onCursorCanvasLeave);
}

function setYAxisRange(minYVal, maxYVal){
	var yRange = maxYVal-minYVal;
	var yBufferTop = yRange*0.15;
	var yBufferBottom = yRange*0.05;
	var yMin;
	if (minYVal == 0){
		yMin = 0;
	}else{
		yMin = minYVal - yBufferBottom;
		yMax = maxYVal + yBufferTop;
	}
	var yPlotRange = [yMin, yMax];
	return yPlotRange;
}

function setAxisLocation(AxisDir, oppositeAxisMin,oppositeAxisMax){
	var axisLocation = 0;		
		if (0 <= oppositeAxisMin || 0 > oppositeAxisMax){
			var axisLocation= [oppositeAxisMin];
		}else{
			var axisLocation = [0];
		}
	return axisLocation;
}

function plotChannel(canvasName, context, xVar, yVar, minXVal, maxXVal, minYVal, maxYVal,plotColor){
	//scale and shift data for plotting (also invert y Data):
	scaledXData = scaleData2Canvas("X",xVar, canvasName, minXVal, maxXVal, false);
	scaledYData = scaleData2Canvas("Y",yVar, canvasName, minYVal, maxYVal, false);	

	context.beginPath();
	context.moveTo(scaledXData[1], scaledYData[1]);
	for (var i=1; i<scaledXData.length; i++){
		context.lineTo(scaledXData[i],scaledYData[i] );
	}
	context.lineWidth = 1;
	context.strokeStyle = plotColor;
	context.stroke();
	context.closePath();
}

function scaleData2Canvas(axisDir, data, canvasName, minVal, maxVal, axisFlag){
	var canvasWidth = $("#"+canvasName).width();
	var canvasHeight = $("#"+canvasName).height();
	var scaledData = [];
	
	// if (axisFlag){
	// 	if (data[0] <= minVal || data[0]  > maxVal){
	// 		data[0]=minVal;
	// 	}
	// }
	for (var i=0; i<data.length; i++){
		if (axisDir == "X" && !axisFlag || axisDir == "Y" && axisFlag){
			scaledData[i] = (data[i]-minVal)*canvasWidth/(maxVal-minVal);
		}else{
			scaledData[i] = canvasHeight- (data[i]-minVal)*canvasHeight/(maxVal-minVal);
		}
	}
	return scaledData;
}
function plotAxis(axisDir, scaledAxisData, canvasName, minVal, maxVal){
		
	var canvas = document.getElementById(canvasName);
	var context = canvas.getContext('2d');

	context.beginPath();
	if (axisDir == "X"){
		context.moveTo(0, scaledAxisData[0]);
		context.lineTo($("#"+canvasName).width(),scaledAxisData[0]);
	}else{
		context.moveTo(scaledAxisData[0],0);
		context.lineTo(scaledAxisData[0],$("#"+canvasName).height());
	}
	context.lineWidth = 1;
	context.strokeStyle = axisColor;
	context.stroke();
	context.closePath();
}

function calcTickPos(axisDir, axisRange){	
	var i = acceptableTickInts.length-1;
	axisMin = axisRange[0];
	axisMax = axisRange[1];
	var tickCount = (axisMax-axisMin)/acceptableTickInts[i]; 

	if(axisDir =="X"){
		minTickCount = 7;		
	}else{
		minTickCount = 5;
	}
	
	while (tickCount < minTickCount){
		i--;
		tickCount = (axisMax-axisMin)/acceptableTickInts[i]; 
	}	
	
	tickInts = acceptableTickInts[i];
	tickPos = [0];
	while(tickPos[tickPos.length-1] < axisMax-tickInts){
		tickPos.push(tickPos[tickPos.length-1]+tickInts);
	}
	while(tickPos[0] > axisMin+tickInts){
		tickPos.splice(0,0,tickPos[0]-tickInts);
	}

	var zeroIndex = tickPos.indexOf(0);
	if (zeroIndex != -1){
		tickPos.splice(zeroIndex,1);
	}
	return tickPos;
}

function plotTickMarks (axisDir, data, axisPos, oppAxisPos, canvasName){
	var canvas = document.getElementById(canvasName);
	var context = canvas.getContext('2d');
	var minDistFromAxis = 10;

	context.beginPath();
	if (axisDir == "X"){
		for (var i = 0; i<data.length; i++){
			if (Math.abs(data[i]-oppAxisPos) > minDistFromAxis){
				context.moveTo(data[i], axisPos);
				context.lineTo(data[i],axisPos - tickLength);
			}
		}
	}else{
		for (var i = 0; i<data.length; i++){
			if (Math.abs(data[i]-oppAxisPos) > minDistFromAxis){
				context.moveTo(axisPos,data[i]);
				context.lineTo(axisPos + tickLength,data[i]);
			}
		}
	}
	context.lineWidth = 1;
	context.strokeStyle = tickMarkColor;
	context.stroke();
	context.closePath();
}

function plotTickValues(axisDir,tickValues, tickPos, axisPos, oppAxisPos, canvasName, axisUnit){
	var canvas = document.getElementById(canvasName);
	var context = canvas.getContext('2d');
	var canvasWidth = $("#"+canvasName).width();
	var canvasHeight = $("#"+canvasName).height();
	var minDistFromAxis = 10;
	// var xOffset = 0;
	var xBuffer = 2;
	var yBuffer = 6;
	var tickVertPos = -10;
	var precision, currPrecision;


	var periodIndex = (tickInts + "").indexOf(".");
	if(periodIndex == -1){
		var maxPrecision = 0;
	}else{
		var maxPrecision = (tickInts + "").split(".")[1].length;
	}
	 
	for(var i=0; i<tickValues.length; i++){
		periodIndex = (tickValues[i] + "").indexOf(".");
		if(periodIndex == -1){
			currPrecision = 0;
		}else{
			currPrecision = (tickValues[i] + "").split(".")[1].length;
		}
		precision = Math.min(currPrecision,maxPrecision);
		if(precision != 0){
			tickValues[i] = tickValues[i].toPrecision(precision);
		}
	}

	context.font=tickLabelFont;
	context.fillStyle = tickLabelColor;
	context.textAlign = "center";
	if(axisDir=="X"){
		if (axisPos < canvasHeight-12){
			tickVertPos = 12;
		}
		context.textAlign = "center";
		for (var i=0; i<tickValues.length;i++){
			
			if (Math.abs(tickPos[i]-oppAxisPos) > minDistFromAxis){
				if(canvasWidth - tickPos[i]< xBuffer && canvasWidth - tickPos[i] >=0){
					context.textAlign = "right";
					tickPos[i] = canvasWidth -xBuffer;
				}
				if (i==tickValues.length-1){
					tickValues[i] = tickValues[i] + "[" + axisUnit +"]";
				}
				context.fillText(tickValues[i], tickPos[i], axisPos+tickVertPos);
			}
		}
	}else{
		context.textAlign = "left";
		for (var i=0; i<tickValues.length;i++){
			if (Math.abs(tickPos[i]-oppAxisPos) > minDistFromAxis){
				if(tickPos[i]< yBuffer && tickPos[i] >= 0){
					tickPos[i] = yBuffer;
				}
				if(canvasHeight - tickPos[i]< yBuffer && canvasHeight - tickPos[i]>= 0){					
					tickPos[i] = canvasHeight -yBuffer;
				}

				if (i==tickValues.length-1){
					tickValues[i] = tickValues[i] + "[" + axisUnit +"]";
				}
				context.fillText(tickValues[i],  axisPos+12,tickPos[i] +4);
			}
		}
	}
}

function onCursorCanvasHover(e){
	//e.preventDefault();
	var canvasID = $(this).attr("id");
	var canvas = document.getElementById(canvasID);
	var mousePos = getMousePos(canvas, e);
	var cursorVals = calcCursorVals(mousePos, canvasID);
	var units = getUnits(canvasID);
	var context = canvas.getContext("2d");
	var xBuffer = 50;
	var xOffset;
	
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	context.beginPath();
	context.moveTo(mousePos.x, 0);
	context.lineTo(mousePos.x,canvas.height);
	context.lineWidth = 1;
	context.strokeStyle = axisColor;
	context.stroke();
	context.closePath();

	context.font=cursorLabelFont;
	var lineHeight = 18;
	var precision;
	if (canvas.width - mousePos.x > xBuffer){
		context.textAlign = "left";
		xOffset = 12;
	}else{
		context.textAlign = "right";
		xOffset = -12;
	}
	

	switch(true){
		case cursorVals[i] > 1000:
			precision = 0;
			break;
		case cursorVals[i] > 300:
			precision = 1;
			break;
		case cursorVals[i] > 10:
			precision = 2;
			break;
		case cursorVals[i] > 1:
			precision = 3;
			break;
		default: 
			precision = 4;
			break;

	}
	
	for (var i=0; i<cursorVals.length; i++){
		context.fillStyle = plotColors[i];
		context.fillText(cursorVals[i].toPrecision(precision)+"["+units+"]", mousePos.x+xOffset, mousePos.y+ lineHeight*i);
	}
}

function calcCursorVals(mousePos, canvasID){
	var xPos_Canvas = mousePos.x;
	var maxXVal = plotObject["plot"+canvasID.replace("cursorCanvas","")].maxXVal;
	
	var xPos_Data = xPos_Canvas/$("#"+canvasID).width()*maxXVal;
	var yPos_Data = [];
	var currPlot = "plot"+canvasID.replace("cursorCanvas","");
	for(var i=0; i< toBePlotted.length;i++){
		var xData = plotObject[currPlot].XData[toBePlotted[i]];
		var yData = plotObject[currPlot].YData[toBePlotted[i]];
		yPos_Data[i] = interpolate(xPos_Data,xData,yData)
	}
	return yPos_Data;
}
function interpolate(xVal,xVect,yVect){
	var i =0;
	while (xVal > xVect[i]){
		i++;
	}
	var x_lo = parseFloat(xVect[i-1]),
		x_hi = parseFloat(xVect[i]),
		y_lo = parseFloat(yVect[i-1]),
		y_hi = parseFloat(yVect[i]);

	yPos_Data =  y_lo + (y_hi-y_lo)/(x_hi-x_lo)*(xVal-x_lo);
	return yPos_Data;
}
function getUnits(canvasID){
	var units = plotObject["plot"+canvasID.replace("cursorCanvas","")].YUnit;
	return units;
}

function onCursorCanvasLeave(e){
	var canvasID = $(this).attr("id");
	var canvas = document.getElementById(canvasID);
	var context = canvas.getContext("2d");
	
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function getMousePos(canvas, e) {
	var rect = canvas.getBoundingClientRect();
	return {
	 	x: Math.round((e.clientX-rect.left)/(rect.right-rect.left)*canvas.width),
		y: Math.round((e.clientY-rect.top)/(rect.bottom-rect.top)*canvas.height)
	};
}

function clearAllPlots(){
	$('.plotCanvas').each(function(idx, item) {
		var context = item.getContext("2d");
		context.clearRect(0, 0, item.width, item.height);
		context.beginPath();        
	});
	//context.clearRect(0, 0, canvas.width, canvas.height);
}