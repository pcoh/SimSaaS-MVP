var canvas = document.getElementById('canvas1');
var context = canvas.getContext('2d');
var maxVal = 200;
canvas.width = 1200;
canvas.height = maxVal*1.05;

context.beginPath();
context.moveTo(100, 150);
context.lineTo(450, 50);
context.lineWidth = 1;

// set line color
context.strokeStyle = '#08c1fe';
context.stroke();