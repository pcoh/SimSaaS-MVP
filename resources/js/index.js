function readJobData(jobPath){
    $.getJSON(jobPath, getJasonCallback);
}

function getJasonCallback(data){
  var jobData = data;
  var size = Object.keys(jobData).length;
  var jobGrips = [], jobWingPositions = [], jobRideHeights_F = [], jobRideHeights_R = [], jobSpringStiffnesses_F = [], jobSpringStiffnesses_R = [], jobARBStiffnesses_F = [], jobARBStiffnesses_R = [];
  for (var i=0; i<size; i++){
    jobGrips[i] = jobData[i+1]["General_Parameters.Overall_Grip_[%]"];
    jobWingPositions[i] = jobData[i+1]["General_Parameters.Rear_Wing_Position_[deg]"];
    jobRideHeights_F[i] = jobData[i+1]["Initialization.Ride_Height.RideHeight_FL_Garage_[mm]"];
    jobRideHeights_R[i] = jobData[i+1]["Initialization.Ride_Height.RideHeight_RR_Garage_[mm]"];
    jobSpringStiffnesses_F[i] = jobData[i+1]["Spring.FL.Spring_Force_Gradient_[N/mm]"];
    jobSpringStiffnesses_R[i] = jobData[i+1]["Spring.RL.Spring_Force_Gradient_[N/mm]"];
    jobARBStiffnesses_F[i] = jobData[i+1]["Anti_Roll_Bar.Front.Characteristics_Linear.ARB_Stiffness_[N/mm]"];
    jobARBStiffnesses_R[i] = jobData[i+1]["Anti_Roll_Bar.Rear.Chararcteristics_Linear.ARB_Stiffness_[N/mm]"];
  }
  extractVarParams(jobGrips,jobWingPositions, jobRideHeights_F,jobRideHeights_R,jobSpringStiffnesses_F,jobSpringStiffnesses_R,jobARBStiffnesses_F,jobARBStiffnesses_R); 
  window.jobData = jobData;
}

function unique(list) {
  var result = [];
  $.each(list, function(i, e) {
    if ($.inArray(e, result) == -1) result.push(e);
  });
  return result;
}


function extractVarParams(jobGrips,jobWingPositions, jobRideHeights_F,jobRideHeights_R,jobSpringStiffnesses_F,jobSpringStiffnesses_R,jobARBStiffnesses_F,jobARBStiffnesses_R){
  uniqueGrip = unique( jobGrips );
  uniqueWingPos = unique( jobWingPositions );
  uniqueRF_F = unique( jobRideHeights_F );
  uniqueRF_R = unique( jobRideHeights_R );
  uniqueSS_F = unique( jobSpringStiffnesses_F );
  uniqueSS_R = unique( jobSpringStiffnesses_R );
  uniqueARB_F = unique( jobARBStiffnesses_F );
  uniqueARB_R = unique( jobARBStiffnesses_R );
  setDDOptions(uniqueGrip,uniqueWingPos,uniqueRF_F,uniqueRF_R,uniqueSS_F,uniqueSS_R,uniqueARB_F,uniqueARB_R);
};

function setDDOptions(uniqueGrip,uniqueWingPos,uniqueRF_F,uniqueRF_R,uniqueSS_F,uniqueSS_R,uniqueARB_F,uniqueARB_R){
  //a = arguments;
  var controlNames = ["selectTrackGrip", "selectWingPos", "selectRH_Front", "selectRH_Rear", "selectSpringStiff_Front","selectSpringStiff_Rear", "selectARBStiff_Front","selectARBStiff_Rear"];
  var controlUnits = ["%", "deg","mm","mm", "N/mm", "N/mm", "N/mm", "N/mm"];
  for(var j = 0; j<arguments.length; j++){
    var optionsAsString = "";
    uniqueValues = arguments[j];
    for(var i = 0; i < uniqueValues.length; i++) {
      optionsAsString += "<option value='" + i + "'>" + uniqueValues[i] + controlUnits[j]+"</option>";
    }
    $( "#"+controlNames[j] ).html( optionsAsString );
    $("#"+controlNames[j]).val(0);
    $("#"+controlNames[j]).selectmenu("refresh");
  }
}

$( document ).ready(function() {
  readJobData(jobPath);
  resizeTrackArea();
  resizeWorkSpace();
  $("#divControlTableRow").css({ 'margin-bottom': $("#divTableAndSpacer").outerHeight(true)});
  $("#divTableAndSpacer").css({ 'top': $("#divControlTableRow").offset().top + $("#divControlTableRow").outerHeight(false)});
  controlTable2Pos();
  positionBG();
});

$( window ).resize(function() {
	resizeTrackArea();
	resizeWorkSpace();
  scrollPos = $("#divWorkspaceContainer").scrollTop();
  smartScroll(scrollPos); 
  positionBG();
  resizeSelectMenus();
})

$( '#divTrackContainer').scroll(function(event) {
    customScrollBar(event);      
  });
  $( '#table1ContentScroller').scroll(function(event) {
    customScrollBar(event);      
  });
  $( '#divTable1Container').scroll(function(event) {
    customScrollBar(event);      
  });    
  $( '#divWorkspaceContainer').scroll(function(event) {
    customScrollBar(event);      
  });    

$('#divTableAndSpacer').on('mousewheel',function(event) {
  wheel = event.originalEvent.wheelDeltaY;
  scrollPos = $("#divWorkspaceContainer").scrollTop()-wheel;
  tableSpaceScroll = true;        
  $('#divWorkspaceContainer').scroll( );
  tableSpaceScroll = false;
});

$('.eventSelector').on('click',  function() {
  $('.eventSelector').removeClass('activeEvent')
  $(this).addClass('activeEvent');
  var activeRound = $(this).clone().children().remove().end().text();
  var eventName = $(this).children('.divtrackName').html();
  $('#eventHeadline').html(activeRound + ' - '+ eventName);
});

$('.plotCell').on('click',  function() {
  $(this).toggleClass('plotted');
});

$('.addPlot').on('click',  function() {
  plotCount = plotCount +1;
	plotContHTML = createPlotContainer(plotCount);
  

	$( plotContHTML ).insertBefore( $(this).parent()).slideDown();
  $(function() {
    $( ".channelSelector" ).selectmenu();
  })
	addListenerToPlots();	
});

$('#divWorkspaceContainer').on('click', 'div a .removePlot', function() {
	$(this).parent().parent().slideUp(400, function() {
		$(this).parent().remove();
	});
	addListenerToPlots();
	plotCount = plotCount -1;
});

//addListenerToPlots();