function resizeTrackArea() {
  $("#divTrackContainer").height($( window ).height());
}
function resizeWorkSpace() {
	var WSheight = $( window ).height()-$("#divEventBanner").height()-$("#navTrackNavBar").height();
	$("#divWorkspaceContainer").height(WSheight);
  	$("#divTableAndSpacer").width($("#divControlTableRow").width()); 	
}
function positionBG(){
	$('#divWorkspaceContainer').css({'background-position-y': $("#divTableAndSpacer").height()+10});
}
function resizeSelectMenus(){

    $.each($('select'), function () {
        $(this).selectmenu({ width : $(this).attr("width")})
    })
}


function createPlotContainer(plotCount){
	plotContHTML = "<div class=\"col-sm-12 divPlotContainer\" draggable=\"true\"><div class=\"plot\">PlotContainer" + plotCount + "<a href=\"#\"><span class=\"removePlot\"></span></a></div></div>";
	return plotContHTML;
}

function smartScroll(scrollPos){
		scrollThresh = $("#divControlTableRow").height();
   		if(scrollPos >= scrollThresh){
   			$("#divTableAndSpacer").addClass('noSeeThrough');
   			if (tableSpaceScroll === false){
	   			var topTarget = $("#divEventBanner").height()+$(".navbar-header").height()-2;
	   			$("#divTableAndSpacer").css({ 'top': topTarget});
	   		  	$("#divWorkspaceContainer").scrollTop(scrollPos);
   		   }
   		}else{
		   	$("#divTableAndSpacer").removeClass('noSeeThrough');
			//var topTarget = $("#divControlTableRow").height()+$("#divEventBanner").height()+$(".navbar-header").height()-scrollPos;
			var topTarget = $("#divControlTableRow").offset().top + $("#divControlTableRow").outerHeight(false);
			$("#divTableAndSpacer").css({ 'top': topTarget});
			$("#divWorkspaceContainer").scrollTop(scrollPos);
			// if ($("#divTableAndSpacer").offset().top > ($("#divEventBanner").height()+ $("#divControlTableRow").height())){
			// 	$("#divTableAndSpacer").offset({"top": $("#divEventBanner").height()+ $("#divControlTableRow").height()});
 		//     }
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
