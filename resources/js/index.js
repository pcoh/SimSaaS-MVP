$(function() {
    $( "#selectTrackGrip" ).selectmenu();
})

$(function() {
    $( "#selectWingPos" ).selectmenu();
})

$(function() {
    $( "#selectRH_Front" ).selectmenu();
})

$(function() {
    $( "#selectRH_Rear" ).selectmenu();
})

$(function() {
    $( "#selectSpringStiff_Front" ).selectmenu();
})

$(function() {
    $( "#selectSpringStiff_Rear" ).selectmenu();
})

$(function() {
    $( "#selectARBStiff_Front" ).selectmenu();
})

$(function() {
    $( "#selectARBStiff_Rear" ).selectmenu();
})
$(function() {
    $( "button" )
      .button()
      .click(function( event ) {
        event.preventDefault();
      });
  });

function customScrollBarVert($event){
  var delay = 300;
  var timeout = null;
  var targetElement = $event.target;      
  $(targetElement).parent().children().children('.vertEnscrollTrack').children('.vertEnscrollHandle').addClass("myScrollHover");
  clearTimeout(timeout);
  timeout = setTimeout(function(){
    $(targetElement).parent().children().children('.vertEnscrollTrack').children('.vertEnscrollHandle') .removeClass("myScrollHover");
  },delay);
}

function customScrollBarHor($event){
  var delay = 300;
  var timeout = null;
  var targetElement = $event.target;      
  $(targetElement).parent().children().children('.horEnscrollTrack').children('.horEnscrollHandle').addClass("myScrollHover");
  clearTimeout(timeout);
  timeout = setTimeout(function(){
    $(targetElement).parent().children().children('.horEnscrollTrack').children('.horEnscrollHandle') .removeClass("myScrollHover");
  },delay);
}





$( document ).ready(function() {
  resizeTrackArea();
  resizeWorkSpace();
  $("#divControlTableRow").css({ 'margin-bottom': $("#divTableAndSpacer").height()});
  $("#divTableAndSpacer").css({ 'top': $("#divControlTableRow").offset().top + $("#divControlTableRow").outerHeight(false)});


  $('#divTableAndSpacer').on('mousewheel',function(event) {
    wheel = event.originalEvent.wheelDeltaY;
    scrollPos = $("#divWorkspaceContainer").scrollTop()-wheel;
    tableSpaceScroll = true;
      
    $('#divWorkspaceContainer').scroll( );
    tableSpaceScroll = false;
  });

  controlTable2Pos();
  positionBG();

  $('#divTrackContainer').enscroll({
      verticalTrackClass: 'vertEnscrollTrack',
      verticalHandleClass: 'vertEnscrollHandle',
      minScrollbarLength: 28
  });
  $('#table1').enscroll({  
      horizontalScrolling: true,  
      verticalScrolling: false,  
      horizontalTrackClass: 'horEnscrollTrack',
      horizontalHandleClass: 'horEnscrollHandle',
      cornerClass: 'enscrollCorner',
      //minScrollbarLength: 28
  });

  $('#table1ContentScroller').enscroll({
      verticalTrackClass: 'vertEnscrollTrack',
      verticalHandleClass: 'vertEnscrollHandle',
      minScrollbarLength: 28
  });
  $("#divTrackContainer").outerWidth($(window).innerWidth()/12);
});

$( window ).resize(function() {
  resizeTrackArea();
  resizeWorkSpace();
  scrollPos = $("#divWorkspaceContainer").scrollTop();
  smartScroll(scrollPos); 
  positionBG();
  resizeSelectMenus();
});

$( '#divTrackContainer' ).scroll(function($event) {
  customScrollBarVert($event);      
});
$( '#table1').scroll(function($event) {
  customScrollBarHor($event);      
});
$( '#table1ContentScroller').scroll(function($event) {
  customScrollBarVert($event);      
});

$('.addPlot').on('click',  function() {
  plotCount = plotCount +1;
	plotContHTML = createPlotContainer(plotCount);
	$( plotContHTML ).insertBefore( $(this).parent()).slideDown();
	addListenerToPlots();	
});

$('#divWorkspaceContainer').on('click', 'div a .removePlot', function() {
	$(this).parent().parent().slideUp(400, function() {
		$(this).parent().remove();
	});
	addListenerToPlots();
	plotCount = plotCount -1;
});

addListenerToPlots();