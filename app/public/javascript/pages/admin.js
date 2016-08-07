$(document).ready(function() {
    if ($(window).innerWidth() < 768) {
        $('#menu, .overlay').hide();
    }

    $('.ripple-btn').on('click', rippleAnimation);

    $('html').niceScroll();

    $('#jumbotron').click(function() {
        $('#menu').slideToggle();
    });

    $('#close-menu').click(function() {
        $('#menu-placeholder').animate({
            'margin-left': '-50%'
        });
        $('.overlay').fadeOut();
    });

    /* $('#menu > ul > li ul').each(function(index, e) {
         var count = $(e).find('li').length;
         var content = '<span class=\"cnt\">' + count + '</span>';
         $(e).closest('li').children('a').append(content);
     });*/
    $('#menu > ul > li > a').click(function() {
        $('#menu li').removeClass('active');
        $(this).closest('li').addClass('active');
        var checkElement = $(this).next();
        if ((checkElement.is('ul')) && (checkElement.is(':visible'))) {
            $(this).closest('li').removeClass('active');
            checkElement.slideUp('normal');
        }
        if ((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
            $('#menu ul ul:visible').slideUp('normal');
            checkElement.slideDown('normal');
        }
        if ($(this).closest('li').find('ul').children().length == 0) {
            return true;
        } else {
            return false;
        }
    });
});



$(window).resize(function() {
    if (jQuery(window).innerWidth() < 768) {
        $('#menu, .cnt, .overlay').hide();
        $('#menu-placeholder').css({
            'margin-left': '0'
        });
    } else {
        $('#menu-placeholder').css({
            'margin-left': '-50%'
        });

    }
});


function rippleAnimation(e) {
    $this = $(this);

    //remove ripple if it's already on
    $oldRipple = $('.ripple');
    if ($this.has($oldRipple)) $oldRipple.remove();
    //If your page has more than one button instead of this just do $('.ripple').remove() to remove them all

    //create element
    $ripple = $(document.createElement('div'));
    $ripple.addClass('ripple');

    //Get the click's location
    var eY = e.offsetY;
    var eX = e.offsetX;

    //Get the element's width and height
    var w = $this.width();
    var h = $this.height();

    //get the offset of eX and eY
    var offsetX = Math.abs(w / 2 - eX);
    var offsetY = Math.abs(h / 2 - eY);

    //get the delta of X and Y
    var deltaX = w / 2 + offsetX;
    var deltaY = h / 2 + offsetY;

    //size
    //The squareroot of ( deltaX² + deltaY² - 2 * deltaX * deltaY * cos(90°) (in radian = 1/2 PI) ) * 2
    var size = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2) - 2 * deltaX * deltaY * Math.cos(Math.PI / 2)) * 2;

    //apply everything to $ripple
    $ripple.css({
        'top': eY,
        'left': eX,
        'height': size,
        'width': size
    });

    //and append it
    $this.append($ripple);
}
