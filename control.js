/**
 * Created by baidu on 15-3-19.
 */
var parts=$('.slide_img');
var screenHeight=$(window).height();
var screenWidth=$(window).width();
var setMargin=$('.slide_img:eq(0)');
$(function(){
    for (var i=0;i<parts.length;i++) {
        parts[i].setAttribute('rank',i);
    }
    $('.slide_img').css('height',screenHeight);
    $('.slide_img').css('width',screenWidth);
    $('.slide_img').css('background-size','100% 100%');
    $('.slide_img').css('background-repeat','no-repeat');
});
$("body").on("touchstart", function(e) {
    e.preventDefault();
    startX = e.originalEvent.changedTouches[0].pageX;
    startY = e.originalEvent.changedTouches[0].pageY;
    Current=parseInt(e.originalEvent.targetTouches[0].target.getAttribute('rank'));
    hide=$('.slide_img').eq(Current);
});
$("body").on("touchend", function(e) {
    e.preventDefault();
    moveEndX = e.originalEvent.changedTouches[0].pageX;
    moveEndY = e.originalEvent.changedTouches[0].pageY;
    X = moveEndX - startX;
    Y = moveEndY - startY;
    if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
        if (scollDownRank>-1) {
            var Margin = 0-scollDownRank*screenHeight;
            setMargin.animate({
                "margin-top":Margin
            }, 500);
            hide.animate({
                height: "0",
                width:"0"
            }, 500, function() {
                $(this).css('height',screenHeight);
                $(this).css('width',screenWidth);
            });
        }
        if (scollDownRank==-1&&parseInt(hide.css('height'))!=screenHeight) {
            hide.animate({
                height: screenHeight,
                width:screenWidth
            }, 200);
        }
    }
    else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
        if (scollUpRank<parts.length) {
            var Margin = 0-scollUpRank*screenHeight;
            hide.animate({
                height: "0",
                width:"0"
            }, 500, function() {
                setMargin.css('margin-top',Margin);
                $(this).css('height',screenHeight);
                $(this).css('width',screenWidth);
            });
        }
        if (scollUpRank==parts.length&&parseInt(hide.css('height'))!=screenHeight) {
            var Margin = 0-Current*screenHeight;
            setMargin.animate({
                "margin-top":Margin
            }, 200);
            hide.animate({
                height: screenHeight,
                width:screenWidth
            }, 200);
        }
    }
});
$("body").on("touchmove", function(e) {
    e.preventDefault();
    moveEndX = e.originalEvent.changedTouches[0].pageX;
    moveEndY = e.originalEvent.changedTouches[0].pageY;
    X = moveEndX - startX;
    Y = moveEndY - startY;
    scollDownRank=Current-1;
    scollUpRank=Current+1;
    var moveHeight=screenHeight-Math.abs(Y);
    var moveWidth=screenWidth*moveHeight/screenHeight;
    if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
        if (scollDownRank>-1) {
            var moveTop=Math.abs(Y)-Current*screenHeight;
            setMargin.css('margin-top',moveTop);
            hide.css('height',moveHeight);
            hide.css('width',moveWidth);
        }
    }
    else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
        if (scollUpRank<parts.length) {
            hide.css('height',moveHeight);
            hide.css('width',moveWidth);
        }
    }
});


