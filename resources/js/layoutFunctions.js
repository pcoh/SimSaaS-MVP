function resizeTrackArea() {
  $("#divTrackContainer").height($( window ).height());
}
function resizeWorkSpace() {
	var WSheight = $( window ).height()-$("#divEventBanner").height()-$("#navTrackNavBar").height();
	$("#divWorkspaceContainer").height(WSheight);
  	$("#divTableAndSpacer").width($("#divControlTableRow").width()); 	
}


function createPlotContainer(plotCount){
	plotContHTML = "<div class=\"col-sm-12 fuchsia divPlotContainer\" draggable=\"true\">PlotContainer" + plotCount + "<a href=\"#\"><span class=\"removePlot grey\">Remove Plot</span></a></div>";
	return plotContHTML;
}

function smartScroll(scrollPos){
		scrollThresh = $("#divControlTableRow").height();
   		if(scrollPos > scrollThresh){
   			if (tableSpaceScroll === false){
	   			var topTarget = $("#divEventBanner").height()+$(".navbar-header").height();
	   			$("#divTableAndSpacer").css({ 'top': topTarget});
	   		  $("#divWorkspaceContainer").scrollTop(scrollPos);
   		   }
   		}else{
 				var topTarget = $("#divControlTableRow").height()+$("#divEventBanner").height()+$(".navbar-header").height()-scrollPos;
 				$("#divTableAndSpacer").css({ 'top': topTarget});
 				$("#divWorkspaceContainer").scrollTop(scrollPos);
 				if ($("#divTableAndSpacer").offset().top > ($("#divEventBanner").height()+ $("#divControlTableRow").height())){
 					$("#divTableAndSpacer").offset({"top": $("#divEventBanner").height()+ $("#divControlTableRow").height()});
 		    }
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
