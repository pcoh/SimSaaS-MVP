$(function() {
    $( "#selectTrackGrip" ).selectmenu();
    $( "#selectWingPos" ).selectmenu();
    $( "#selectRH_Front" ).selectmenu();
    $( "#selectRH_Rear" ).selectmenu();
    $( "#selectSpringStiff_Front" ).selectmenu();
    $( "#selectSpringStiff_Rear" ).selectmenu();
    $( "#selectARBStiff_Front" ).selectmenu();
    $( "#selectARBStiff_Rear" ).selectmenu();
    $( ".channelSelector" ).selectmenu(
      {height: 255});
    $( "button" )
      .button()
      .click(function( event ) {
        event.preventDefault();
      });
})

function resizeTrackArea() {
  $("#divTrackContainer").height($( window ).height());
}

function resizeWorkSpace() {
	var WSheight = $( window ).height()-$("#divEventBanner").outerHeight(true)*$("#divEventBanner").is(':visible')-$("#navTrackNavBar").outerHeight(false);
	$("#divWorkspaceContainer").outerHeight(WSheight);
  	$("#divTableAndSpacer").width($("#divControlTableRow").width()); 	
}

function positionBG(){
	$('#divWorkspaceContainer').css({'background-position-y': $("#divTableAndSpacer").outerHeight(true)});
}

function resizeSelectMenus(){

    $.each($('select'), function () {
        $(this).selectmenu({ width : $(this).attr("width")})
    })
}

function setDDOptions(uniqueGrip,uniqueWingPos,uniqueRH_F,uniqueRH_R,uniqueSS_F,uniqueSS_R,uniqueARB_F,uniqueARB_R){
  var controlNames = ["selectTrackGrip", "selectWingPos", "selectRH_Front", "selectRH_Rear", "selectSpringStiff_Front","selectSpringStiff_Rear", "selectARBStiff_Front","selectARBStiff_Rear"];
  var controlUnits = ["%", "deg","mm","mm", "N/mm", "N/mm", "N/mm", "N/mm"];
  for(var j = 0; j<arguments.length; j++){
    var optionsAsString = "";
    uniqueValues = arguments[j];
    for(var i = 0; i < uniqueValues.length; i++) {
      optionsAsString += "<option value='" + i + "'>" + uniqueValues[i] + controlUnits[j]+"</option>";
    }
    $( "#"+controlNames[j]).html( optionsAsString );
    $("#"+controlNames[j]).val(0);
    $("#"+controlNames[j]).selectmenu("refresh");
  }
}


function cleanAndSortChannelNames(){
  var channelOptions = channelNamesInFiles.slice(0); //slice is necessary to create a copy and not just a new referene to the same array;
  var index = channelOptions.indexOf("Time");
  channelOptions.splice(index, 1);
  
  var index = channelOptions.indexOf("TRK_Distance");
  channelOptions.splice(index, 1);
  
  channelOptions = channelOptions.sort();
  return channelOptions
}

function assemblePlotSelectOptions(plotCount){
  var openingTags = "<select id=\"selectChannel_"+plotCount+"\" class=\"channelSelector\">";
  var closingTags = "</select>";
  var optionTags = ""
  var channelOptions = cleanAndSortChannelNames();
  for (var i = 1; i< channelOptions.length; i++){
    optionTags = optionTags + "<option>" + channelOptions[i] +"</option>";
  }
  //<option>Speed</option><option selected=\"selected\">Engine Speed</option><option>Pedal Position</option>"

  var plotSelectOptions = openingTags+optionTags+closingTags;

  return plotSelectOptions;

}

function createPlotContainer(plotCount){
  plotSelectOptions = assemblePlotSelectOptions(plotCount);  

	plotContHTML = "<div class=\"col-sm-12 divPlotContainer\" draggable=\"true\"><div class=\"plot\" id=\"plot"+plotCount+"\">"+
	"<div class=\"channelSelectContainer\">"+plotSelectOptions +
    "</div><a href=\"#\"><span class=\"removePlot\"></span></a><div class=\"canvasContainer\">"+
    "<canvas class=\"plotCanvas\" id=\"canvas"+plotCount+"\"></canvas>"+
    "<canvas class=\"cursorCanvas\" id=\"cursorCanvas"+plotCount+"\"></canvas></div></div></div>";

	return plotContHTML;

}

function populatePlot1DD(){
  plotSelectOptions = assemblePlotSelectOptions(plotCount);  
  $("#channelSelectContainer1").html(plotSelectOptions);
  //$(function() {
    $( ".channelSelector" ).selectmenu();
  //})
  //$(".channelSelector").change( onChannelSelectorChange );
  $(".channelSelector").on('selectmenuchange',  onChannelSelectorChange);
}

function onChannelSelectorChange(){
  plotData();
}
function smartScroll(scrollPos){
  if ($( window ).innerWidth() >= 1200){
		scrollThresh = $("#divControlTableRow").outerHeight(false)+10;
  }else{
    scrollThresh = $("#divControlTableRow").outerHeight(false)+17;
  }
   		if(scrollPos >= scrollThresh){
   			$("#divTableAndSpacer").addClass('noSeeThrough');
   			if (tableSpaceScroll === false){
	   			var topTarget = $("#divEventBanner").position().top +$("#divEventBanner").outerHeight(true)*$("#divEventBanner").is(':visible')+$(".navbar-header").outerHeight(true)*$(".navbar-header").is(':visible');
	   			$("#divTableAndSpacer").css({ 'top': topTarget});
	   		  	$("#divWorkspaceContainer").scrollTop(scrollPos);
   		   }
   		}else{
		   	$("#divTableAndSpacer").removeClass('noSeeThrough');
			var topTarget = $("#divControlTableRow").offset().top + $("#divControlTableRow").outerHeight(false);
			$("#divTableAndSpacer").css({ 'top': topTarget});
			$("#divWorkspaceContainer").scrollTop(scrollPos);
   		}  		
}

function controlTable2Pos() {	
	$("#divWorkspaceContainer").bind('scroll', function() {
		if (tableSpaceScroll === false){
			scrollPos = $("#divWorkspaceContainer").scrollTop();
		}
		smartScroll(scrollPos);	
	}); 
}

function customScrollBar($event){
  $( ".channelSelector" ).selectmenu( "close" );
  var delay = 1000;
  var timeout = null;
  var targetElement = event.target;      
  $(targetElement).addClass('scrolling');
  clearTimeout(timeout);
  timeout = setTimeout(function(){
    $(targetElement).removeClass('scrolling');
  },delay);
}
