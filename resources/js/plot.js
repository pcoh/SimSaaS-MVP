


//var canvas = document.getElementById('canvas1');


function plotResults(canvasName, xVar, yVar){
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