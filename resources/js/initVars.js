//initialize variables
plotCount = 1;
stdPlotOpcacity = $(".divPlotContainer").css("opacity");
dragPlotOpacity = '0.4';
tableSpaceScroll = false;
jobPath = "resources/data/jobOverview.json";
//numRowsT1 = 0;
lapData = [];
toBePlotted = [];

plotColors = ['#08c1fe','#FF4826','#FFB400','#00FE56','#FF8300'];
axisColor = '#FFF';
tickMarkColor = '#FFF'
acceptableTickInts = [0.001, 0.005, 0.01, 0.05,0.1,0.25,0.5,1,2,5,10,25,50,100,250,500,1000,2500,5000];
tickLength = 8;
tickLabelFont="1.1em";
tickLabelColor = '#FFF'