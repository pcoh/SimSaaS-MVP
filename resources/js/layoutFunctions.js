$(function() {
    $( "#selectTrackGrip" ).selectmenu();
    $( "#selectWingPos" ).selectmenu();
    $( "#selectRH_Front" ).selectmenu();
    $( "#selectRH_Rear" ).selectmenu();
    $( "#selectSpringStiff_Front" ).selectmenu();
    $( "#selectSpringStiff_Rear" ).selectmenu();
    $( "#selectARBStiff_Front" ).selectmenu();
    $( "#selectARBStiff_Rear" ).selectmenu();
    $( ".channelSelector" ).selectmenu();
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
	var WSheight = $( window ).height()-$("#divEventBanner").outerHeight(true)-$("#navTrackNavBar").outerHeight(false);
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

function createPlotContainer(plotCount){
	plotContHTML = "<div class=\"col-sm-12 divPlotContainer\" draggable=\"true\"><div class=\"plot\" id=\"plot"+plotCount+"\">"+
	"<div class=\"channelSelectContainer\"><select id=\"selectChannel_"+plotCount+"\" class=\"channelSelector\"><option>Speed</option>" +
	"<option selected=\"selected\">Engine Speed</option><option>Pedal Position</option></select>" +
    "</div><a href=\"#\"><span class=\"removePlot\"></span></a><div class=\"canvasContainer\">"+
    "<canvas class=\"plotCanvas\" id=\"canvas"+plotCount+"\"></canvas></div></div></div>";
	return plotContHTML;

}

function smartScroll(scrollPos){
		scrollThresh = $("#divControlTableRow").outerHeight(false)+11;
   		if(scrollPos >= scrollThresh){
   			$("#divTableAndSpacer").addClass('noSeeThrough');
   			if (tableSpaceScroll === false){
	   			var topTarget = $("#divEventBanner").position().top +$("#divEventBanner").outerHeight(true);
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
  var delay = 1000;
  var timeout = null;
  var targetElement = event.target;      
  $(targetElement).addClass('scrolling');
  clearTimeout(timeout);
  timeout = setTimeout(function(){
    $(targetElement).removeClass('scrolling');
  },delay);
}
