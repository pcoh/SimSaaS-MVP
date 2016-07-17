function readJobData(jobPath){
    $.getJSON(jobPath, getJasonCallback);
}

function getJasonCallback(data){
  var jobData = data;
  var size = Object.keys(jobData).length;
  var jobLapNum = [], jobLapNames = [], jobGrips = [], jobWingPositions = [], jobRideHeights_F = [], jobRideHeights_R = [], jobSpringStiffnesses_F = [], jobSpringStiffnesses_R = [], jobARBStiffnesses_F = [], jobARBStiffnesses_R = [];
  for (var i=0; i<size; i++){
    jobLapNum[i] = [i+1];
    jobLapNames[i] = jobData[i+1].FileName;
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
  //window.jobData = jobData;
  window.jobData_parsed = [jobLapNum,jobLapNames, jobGrips,jobWingPositions,jobRideHeights_F,jobRideHeights_R,jobSpringStiffnesses_F,jobSpringStiffnesses_R,jobARBStiffnesses_F,jobARBStiffnesses_R];
}

function unique(list) {
  var result = [];
  $.each(list, function(i, e) {
    if ($.inArray(e, result) == -1) result.push(e);
  });
  return result;
}


function extractVarParams(jobGrips,jobWingPositions, jobRideHeights_F,jobRideHeights_R,jobSpringStiffnesses_F,jobSpringStiffnesses_R,jobARBStiffnesses_F,jobARBStiffnesses_R){
  window.uniqueGrip = unique( jobGrips );
  window.uniqueWingPos = unique( jobWingPositions );
  window.uniqueRF_F = unique( jobRideHeights_F );
  window.uniqueRF_R = unique( jobRideHeights_R );
  window.uniqueSS_F = unique( jobSpringStiffnesses_F );
  window.uniqueSS_R = unique( jobSpringStiffnesses_R );
  window.uniqueARB_F = unique( jobARBStiffnesses_F );
  window.uniqueARB_R = unique( jobARBStiffnesses_R );
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

function getSimSettings(){
  var demTrackGrip = uniqueGrip[$( "#selectTrackGrip").val()];
  var demWingPos = uniqueWingPos[$( "#selectWingPos").val()];
  var demRH_F = uniqueRF_F[$( "#selectRH_Front").val()];
  var demRH_R = uniqueRF_R[$( "#selectRH_Rear").val()];
  var demSS_F = uniqueSS_F[$( "#selectSpringStiff_Front").val()];
  var demSS_R = uniqueSS_R[$( "#selectSpringStiff_Rear").val()];
  var demARBStiff_F = uniqueARB_F[$( "#selectARBStiff_Front").val()];
  var demARBStiff_R = uniqueARB_R[$( "#selectARBStiff_Rear").val()];

  var demandSettings = [demTrackGrip, demWingPos, demRH_F, demRH_R, demSS_F, demSS_R, demARBStiff_F, demARBStiff_R];

  getLapID(demTrackGrip, demWingPos, demRH_F, demRH_R, demSS_F, demSS_R, demARBStiff_F, demARBStiff_R);
}


  var getLapID = function(demTrackGrip, demWingPos, demRH_F, demRH_R, demSS_F, demSS_R, demARBStiff_F, demARBStiff_R){
    lapID = [];
    for(var i=0;i<jobData_parsed[0].length;i++){
      currTrackGrip = jobData_parsed[2][i];
      currWingPos = jobData_parsed[3][i];
      currRH_F = jobData_parsed[4][i];
      currRH_R = jobData_parsed[5][i];
      currSS_F = jobData_parsed[6][i];
      currSS_R = jobData_parsed[7][i];
      currARB_F = jobData_parsed[8][i];
      currARB_R = jobData_parsed[9][i];

      //window.jobData_parsed = [jobLapNum,jobLapNames, jobGrips,jobWingPositions,jobRideHeights_F,jobRideHeights_R,jobSpringStiffnesses_F,jobSpringStiffnesses_R,jobARBStiffnesses_F,jobARBStiffnesses_R];

      if( currTrackGrip == demTrackGrip &&  currWingPos== demWingPos && currRH_F == demRH_F && currRH_R == demRH_R && currSS_F == demSS_F && currSS_R == demSS_R && currARB_F == demARBStiff_F && currARB_R == demARBStiff_R){   
        lapID.push(jobData_parsed[0][i]);
      }
       
    }
    alert(jobData_parsed[1][lapID-1]);
  }


  // var sortData = function(filteredProducts){    
  //   switch(sortAxis){
  //     case 'price':
  //       filteredProducts.sort(function (a, b) {
  //         a = parseFloat(a.variants[0].price),
  //           b = parseFloat(b.variants[0].price);          
  //         return a - b;
  //       });

  //       break;
  //     case 'carat':
  //       filteredProducts.sort(function (a, b) {
  //         a = parseFloat(a.variants[0].grams),
  //           b = parseFloat(b.variants[0].grams);
  //         return a - b;           
  //       });    
  //       break;        
  //     case 'cut':        
  //       filteredProducts.sort(function (a, b) {
  //         a = cutAxis.indexOf(a.variants[0].option1),
  //           b = cutAxis.indexOf(b.variants[0].option1);
  //         return a - b; 
  //       });
  //       break;        
  //     case 'clarity':
  //       filteredProducts.sort(function (a, b) {
  //         a = clarityAxis.indexOf(a.variants[0].option3),
  //           b = clarityAxis.indexOf(b.variants[0].option3);
  //         return a - b; 
  //       });        
  //       break;        
      

  //       break;
  //     default:        
  //       filteredProducts.sort(function (a, b) {
  //         a = parseFloat(a.variants[0].price),
  //           b = parseFloat(b.variants[0].price);
  //         return a - b;
  //       });
  //   }

  //   if(sortDir == -1){
  //     filteredProducts.reverse();
  //   }
    
  //   $("#diamTableContent").html("");
    
  //   addToTable(filteredProducts);
  // }




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

$('#simButton').on('click',  function() {
  getSimSettings();
  // getLapID();
  // loadLapData();  
  // addLapToTable1();

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