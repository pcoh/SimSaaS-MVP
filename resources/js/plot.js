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
		plotObject[plotIDs[i]].YData = {};
		plotObject[plotIDs[i]].XData = {};
		plotObject[plotIDs[i]].YUnit = [];
		plotObject[plotIDs[i]].XUnit = [];
		
		
		
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
		if (j==0){
			var yUnit = channelUnits[yFieldIndex-1];
			plotObject[plotIDs[i]].XUnit = xUnit;
			plotObject[plotIDs[i]].YUnit = yUnit;
		}
			
			plotObject[plotIDs[i]].YData[toBePlotted[j]] = lapData[toBePlotted[j]-1]["FIELD"+yFieldIndex].slice(1);
			plotObject[plotIDs[i]].XData[toBePlotted[j]] = lapData[toBePlotted[j]-1]["FIELD"+xFieldIndex].slice(1);
			
			
			

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
			
			
		}
		for (var j=0; j< toBePlotted.length; j++){
			var plotColor = plotColors[j];
			plotChannel(canvasName,context, plotObject[plotIDs[i]].XData[toBePlotted[j]],plotObject[plotIDs[i]].YData[toBePlotted[j]],plotObject[plotIDs[i]].minXVal,plotObject[plotIDs[i]].maxXVal,plotObject[plotIDs[i]].minYVal,plotObject[plotIDs[i]].maxYVal,plotColor);
		}
	}
}

function plotChannel(canvasName, context, xVar, yVar, minXVal, maxXVal, minYVal, maxYVal,plotColor){
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

	context.lineWidth = 1;
	context.strokeStyle = plotColor;
	context.stroke();
	context.closePath();
}
function clearAllPlots(){
	$('.plotCanvas').each(function(idx, item) {
		var context = item.getContext("2d");
		context.clearRect(0, 0, item.width, item.height);
		context.beginPath();        
	});
	//context.clearRect(0, 0, canvas.width, canvas.height);
}