//Utils:
function unique(list) {
  var result = [];
  $.each(list, function(i, e) {
    if ($.inArray(e, result) == -1) result.push(e);
  });
  return result;
}
function secondsTimeSpanToHMSH(s) {
    var h = Math.floor(s/3600); //Get whole hours
    s -= h*3600;
    var m = Math.floor(s/60); //Get remaining minutes
    s -= m*60;
    var H = Math.floor(s%1 *100);
    s = Math.floor(s);
    if (h==0){
      return m +":"+(s < 10 ? '0'+s : s)+"."+(H < 10 ? '0'+H : H);
    }else{
      return h+":" +(m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s)+"."+(H < 10 ? '0'+H : H);
    }
}
//----------------------------------------------------------

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
  window.jobData_parsed = [jobLapNum,jobLapNames, jobGrips,jobWingPositions,jobRideHeights_F,jobRideHeights_R,jobSpringStiffnesses_F,jobSpringStiffnesses_R,jobARBStiffnesses_F,jobARBStiffnesses_R];
}

function extractVarParams(jobGrips,jobWingPositions, jobRideHeights_F,jobRideHeights_R,jobSpringStiffnesses_F,jobSpringStiffnesses_R,jobARBStiffnesses_F,jobARBStiffnesses_R){
  window.uniqueGrip = unique( jobGrips );
  window.uniqueWingPos = unique( jobWingPositions );
  window.uniqueRH_F = unique( jobRideHeights_F );
  window.uniqueRH_R = unique( jobRideHeights_R );
  window.uniqueSS_F = unique( jobSpringStiffnesses_F );
  window.uniqueSS_R = unique( jobSpringStiffnesses_R );
  window.uniqueARB_F = unique( jobARBStiffnesses_F );
  window.uniqueARB_R = unique( jobARBStiffnesses_R );
  setDDOptions(uniqueGrip,uniqueWingPos,uniqueRH_F,uniqueRH_R,uniqueSS_F,uniqueSS_R,uniqueARB_F,uniqueARB_R);
};

function getSimSettings(){
  var demTrackGrip = uniqueGrip[$( "#selectTrackGrip").val()];
  var demWingPos = uniqueWingPos[$( "#selectWingPos").val()];
  var demRH_F = uniqueRH_F[$( "#selectRH_Front").val()];
  var demRH_R = uniqueRH_R[$( "#selectRH_Rear").val()];
  var demSS_F = uniqueSS_F[$( "#selectSpringStiff_Front").val()];
  var demSS_R = uniqueSS_R[$( "#selectSpringStiff_Rear").val()];
  var demARBStiff_F = uniqueARB_F[$( "#selectARBStiff_Front").val()];
  var demARBStiff_R = uniqueARB_R[$( "#selectARBStiff_Rear").val()];

  var demandSettings = [demTrackGrip, demWingPos, demRH_F, demRH_R, demSS_F, demSS_R, demARBStiff_F, demARBStiff_R];

  getLapID(demTrackGrip, demWingPos, demRH_F, demRH_R, demSS_F, demSS_R, demARBStiff_F, demARBStiff_R);
}

getLapID = function(demTrackGrip, demWingPos, demRH_F, demRH_R, demSS_F, demSS_R, demARBStiff_F, demARBStiff_R){
  //lapID = [];
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

    if( currTrackGrip == demTrackGrip &&  currWingPos == demWingPos && currRH_F == demRH_F && currRH_R == demRH_R && currSS_F == demSS_F && currSS_R == demSS_R && currARB_F == demARBStiff_F && currARB_R == demARBStiff_R){   
      //lapID.push(jobData_parsed[0][i]);
      lapID = jobData_parsed[0][i][0];
    }
     
  }
  addLapToTable1(lapID,demTrackGrip, demWingPos, demRH_F, demRH_R, demSS_F, demSS_R, demARBStiff_F, demARBStiff_R);
  loadLapData(lapID);
}

addLapToTable1 = function(lapID,demTrackGrip, demWingPos, demRH_F, demRH_R, demSS_F, demSS_R, demARBStiff_F, demARBStiff_R){
  if ($("#lapRow"+lapID).length ==0){
    var numRowsT1 = countRowsT1();
    if (numRowsT1 %2 !=0){
      var rowType = "evenRow";
    }else{
      var rowType = "oddRow"
    }
    var lapHTML = "<div id=\"lapRow"+lapID+ "\" class=\"lapRow " +rowType + "\"><span class=\"cell setCell\"></span><span id=\"plotCell"+lapID+ "\" class=\"cell plotCell loading\"></span><span class=\"cell lapTimeCell\"><div class=\"progressBG\"><div class=\"progressVal\" id=\"progress"+lapID+"\"></div></div></span>"+
                  "<span class=\"cell trackGripCell\">"+demTrackGrip+"%</span><span class=\"cell wingPosCell\">"+demWingPos+"</span><span class=\"cell RHF_Cell\">"+demRH_F+"mm</span><span class=\"cell RHR_Cell\">"+demRH_R+"mm</span>" +
                  "<span class=\"cell SSF_Cell\">"+demSS_F+"N/mm</span><span class=\"cell SSR_Cell\">"+demSS_R+"N/mm</span><span class=\"cell ARBF_Cell\">"+demARBStiff_F+"N/mm</span><span class=\"cell ARBR_Cell\">"+demARBStiff_R+"N/mm</span>" +
                  "<span class=\"cell downloadCell\"></span><span class=\"cell deleteCell loading rightMost\"></span></div>";
    $("#rowContainer").append(lapHTML);
    
    calcProgress(lapID);  
    $("#lapRow"+lapID)
      .children(".setCell")
      .on('click',  clickSetButton);
  }else{
    alert("A lap with these settings has already been simulated");    
  }
}

calcProgress = function(lapID){
  var simDur = 1000;
  var endTime = $.now()+simDur; 
  updateProgress(endTime,simDur,lapID);
}
function updateProgress(endTime,simDur,lapID) {
  remainTime = endTime - $.now();
  var progress = Math.min(100,(simDur - remainTime)/simDur *100);
  $("#progress"+lapID).width(progress +"%");
  if (remainTime >0){      
    setTimeout(function () {
      //recall the parent function to create a recursive loop.
      updateProgress(endTime,simDur,lapID);
  }, 3000);
  }else{
    $("#lapRow"+lapID)
      .children(".plotCell")
      .removeClass("loading")
      .on('click',  clickPlotButton);
      var currLT = lapData[lapID-1].FIELD1[lapData[lapID-1].FIELD1.length-1];
      var LT_HMSH = secondsTimeSpanToHMSH(currLT);

    $("#lapRow"+lapID)
      .children(".deleteCell")
      .removeClass("loading")
      .on('click',  clickDeleteButton);
    $("#lapRow"+lapID).children(".lapTimeCell").html(LT_HMSH);
    return;
  }
} 

function clickSetButton(){
  var activeTrackGrip = $(this).parent().children(".trackGripCell").html().match(/\d+/);  
  var activeWingPos = $(this).parent().children(".wingPosCell").html().match(/\d+/);
  var activeRH_F = $(this).parent().children(".RHF_Cell").html().match(/\d+/);
  var activeRH_R = $(this).parent().children(".RHR_Cell").html().match(/\d+/);
  var activeSS_F = $(this).parent().children(".SSF_Cell").html().match(/\d+/);
  var activeSS_R = $(this).parent().children(".SSR_Cell").html().match(/\d+/);
  var activeARB_F = $(this).parent().children(".ARBF_Cell").html().match(/\d+/);
  var activeARB_R = $(this).parent().children(".ARBR_Cell").html().match(/\d+/);

  var highLightDuration = 500;

  var optionIndex = uniqueGrip.indexOf(parseInt(activeTrackGrip));
  $('#selectTrackGrip').val(optionIndex).selectmenu("refresh");
  $("#selectTrackGrip-button"). addClass("autoChange").delay(highLightDuration).queue(function(next){
    $(this).removeClass("autoChange");
    next();
  });

  var optionIndex = uniqueWingPos.indexOf(parseInt(activeWingPos));
  $('#selectWingPos').val(optionIndex).selectmenu("refresh");
  $("#selectWingPos-button"). addClass("autoChange").delay(highLightDuration).queue(function(next){
    $(this).removeClass("autoChange");
    next();
  });

  var optionIndex = uniqueRH_F.indexOf(parseInt(activeRH_F));
  $('#selectRH_Front').val(optionIndex).selectmenu("refresh");
  $("#selectRH_Front-button"). addClass("autoChange").delay(highLightDuration).queue(function(next){
    $(this).removeClass("autoChange");
    next();
  });

  var optionIndex = uniqueRH_R.indexOf(parseInt(activeRH_R));
  $('#selectRH_Rear').val(optionIndex).selectmenu("refresh");
  $("#selectRH_Rear-button"). addClass("autoChange").delay(highLightDuration).queue(function(next){
    $(this).removeClass("autoChange");
    next();
  });

  var optionIndex = uniqueSS_F.indexOf(parseInt(activeSS_F));
  $('#selectSpringStiff_Front').val(optionIndex).selectmenu("refresh");
  $("#selectSpringStiff_Front-button"). addClass("autoChange").delay(highLightDuration).queue(function(next){
    $(this).removeClass("autoChange");
    next();
  });

  var optionIndex = uniqueSS_R.indexOf(parseInt(activeSS_R));
  $('#selectSpringStiff_Rear').val(optionIndex).selectmenu("refresh");
  $("#selectSpringStiff_Rear-button"). addClass("autoChange").delay(highLightDuration).queue(function(next){
    $(this).removeClass("autoChange");
    next();
  });

  var optionIndex = uniqueARB_F.indexOf(parseInt(activeARB_F));
  $('#selectARBStiff_Front').val(optionIndex).selectmenu("refresh");
  $("#selectARBStiff_Front-button"). addClass("autoChange").delay(highLightDuration).queue(function(next){
    $(this).removeClass("autoChange");
    next();
  });

  var optionIndex = uniqueARB_R.indexOf(parseInt(activeARB_R));
  $('#selectARBStiff_Rear').val(optionIndex).selectmenu("refresh");
  $("#selectARBStiff_Rear-button"). addClass("autoChange").delay(highLightDuration).queue(function(next){
    $(this).removeClass("autoChange");
    next();
  });


    // activeRH_R = ,
    // activeSS_F = ,
    // activeSS_R = ,
    // activeARB_F = ,
    // activeARB_R = ,
    a = 1;
}

function clickDeleteButton(){  
  // delete lapID from toBePlotted
  var lapID = parseInt($(this).parent().attr("id").replace("lapRow",""));
  if ($.inArray(lapID, toBePlotted) != -1){
    var index = toBePlotted.indexOf(lapID);
    toBePlotted.splice(index,1);
  }
  
  $(this).parent().remove();
  plotData();

  // delete data from lapData Object
  delete lapData[lapID -1];
  reStyleRows();
}


function countRowsT1(){
  numRowsT1  = $('#rowContainer').children('.lapRow').length;
  return numRowsT1;
}

function reStyleRows(){
  var numRowsT1 = countRowsT1();
  for (var i=0;i<numRowsT1; i++){
    var currRow = $('#rowContainer').children('.lapRow')[i];
    $(currRow).removeClass("evenRow");
    $(currRow).removeClass("oddRow");
    if (i%2 == 0){
      $(currRow).addClass("oddRow");
    }else{
      $(currRow).addClass("evenRow");
    }
  }
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
