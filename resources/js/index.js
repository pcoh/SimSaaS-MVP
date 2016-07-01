



plotCount = 1;
stdPlotOpcacity = $(".divPlotContainer").css("opacity");
dragPlotOpacity = '0.4';
tableSpaceScroll = false;

$("#divControlTableRow").css({ 'margin-bottom': $("#divTableAndSpacer").height()});
$("#divTableAndSpacer").css({ 'top': $("#divControlTableRow").height()+$("#divEventBanner").height()});


function createPlotContainer(plotCount){
	plotContHTML = "<div class=\"col-sm-12 fuchsia divPlotContainer\" draggable=\"true\">PlotContainer" + plotCount + "<a href=\"#\"><span class=\"removePlot grey\">Remove Plot</span></a></div>";
	return plotContHTML;
}
function resizeTrackArea() {
  $("#divTrackContainer").height($( window ).height());
}
function resizeWorkSpace() {
	var WSheight = $( window ).height()-$("#divEventBanner").height()-$("#navTrackNavBar").height();
	$("#divWorkspaceContainer").height(WSheight);
  $("#divTableAndSpacer").width($("#divControlTableRow").width()); 	
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

$( document ).ready(function() {
    resizeTrackArea();
    resizeWorkSpace();

    $('#divTableAndSpacer').on('mousewheel',function(event) {
        
        wheel = event.originalEvent.wheelDeltaY;
        scrollPos = $("#divWorkspaceContainer").scrollTop()-wheel;
        tableSpaceScroll = true;
        
        $('#divWorkspaceContainer').scroll( );
        tableSpaceScroll = false;
    });

    controlTable2Pos();
});
$( window ).resize(function() {
	resizeTrackArea();
	resizeWorkSpace();
  scrollPos = $("#divWorkspaceContainer").scrollTop();
  smartScroll(scrollPos); 
})

$('.addPlot').on('click',  function() {
     
	plotCount = plotCount +1;
	plotContHTML = createPlotContainer(plotCount);
	$( plotContHTML ).insertBefore( $(this).parent()).slideDown();
	addListenerToPlots();
	
});

$('#divWorkspaceContainer').on('click', 'div a .removePlot', function() {
	$(this).parent().parent().slideUp(400, function() {
		$(this).remove();
	});
	addListenerToPlots();
	plotCount = plotCount -1;
});

function handleDragStart(e) {
	this.style.opacity = dragPlotOpacity; 
	dragSrcEl = this;

  	e.dataTransfer.effectAllowed = 'move';
  	e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
	if (dragSrcEl != this) {
	  	//this.classList.add('over');
		dropZone = "<div class=\"col-sm-12 dropZone\">Drop here</div>";
		$newDropZone = $( dropZone ).insertBefore( $(this));
		return $newDropZone;
	}
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); 
  }
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDragLeave(e) {
  //this.classList.remove('over');  // this / e.target is previous target element.
  if (dragSrcEl != this) {
  	$newDropZone.remove();
  }
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation(); // stops the browser from redirecting.
  }
  // Don't do anything if dropping the same plot we're dragging.
  if (dragSrcEl != this) {
    $cutPlot = $(dragSrcEl).detach();

    $cutPlot.insertBefore($(this)).fadeTo(1,0,function() {
    	$cutPlot.hide(1,function(){
    		$cutPlot.slideDown(500,function() {
    			$cutPlot.fadeTo(100,stdPlotOpcacity);
    		})
    	});    	
  	})
  }
  return false;
}

function handleDragEnd(e) {
  // this/e.target is the source node.
	$newDropZone.remove();
  [].forEach.call(plotContains, function (plCont) {
    //plCont.classList.remove('over');
    plCont.style.opacity = stdPlotOpcacity; 
    //plCont.classList.remove('over'); 
  });
}

function addListenerToPlots(){
	plotContains = document.querySelectorAll('.row .divPlotContainer');
	[].forEach.call(plotContains, function(plCont) {
		plCont.addEventListener('dragstart', handleDragStart, false);	  	
	  	plCont.addEventListener('dragenter', handleDragEnter, false);
	  	plCont.addEventListener('dragover', handleDragOver, false);
		plCont.addEventListener('dragleave', handleDragLeave, false);
		plCont.addEventListener('drop', handleDrop, false);
		plCont.addEventListener('dragend', handleDragEnd, false);
	});
	//return plotContains;
}
addListenerToPlots();