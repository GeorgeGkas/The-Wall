$(document).ready(function() {
    //$('#menu-placeholder').hide();
    //$('#posts-submenu').hide();
    $('.ripple-btn').on('click', rippleAnimation);


    $('html').niceScroll();

    $('#close-menu').click(function() {
        $('#menu-placeholder').animate({
            'margin-left': '-100%'
        }, 1000);
        $('.overlay').fadeOut();
    });

    $('.sub-category-back').click(function() {
        $('.ripple').remove()
        setTimeout(function() {
            $('.sub-category-back').closest("ul").animate({
                'margin-left': '500px'
            }, 400, function() {
                $('#main-menu > li').not('#webmaster').show().animate({
                    'margin-left': '0'
                }, 200).clearQueue();
                $('.cnt').fadeIn();
            });

        }, 200);
    });

    $('#posts-submenu-reveal').click(function() {
        setTimeout(function() {
            $('.cnt').fadeOut();
            $('#main-menu > li').not('#webmaster').animate({
                'margin-left': '-100%'
            }, 200, function() {
                $(this).hide();
                $('#posts-submenu').animate({
                    'margin-left': '0'
                }, 400).clearQueue();
            });

        }, 200);
    });

    $('#subscriptions-submenu-reveal').click(function() {
        setTimeout(function() {
            $('.cnt').fadeOut();
            $('#main-menu > li').not('#webmaster').animate({
                'margin-left': '-100%'
            }, 200, function() {
                $(this).hide();
                $('#subscriptions-submenu').animate({
                    'margin-left': '0'
                }, 400).clearQueue();
            });

        }, 200);
    });

    $('#comments-submenu-reveal').click(function() {
        setTimeout(function() {
            $('.cnt').fadeOut();
            $('#main-menu > li').not('#webmaster').animate({
                'margin-left': '-100%'
            }, 200, function() {
                $(this).hide();
                $('#comments-submenu').animate({
                    'margin-left': '0'
                }, 400).clearQueue();
            });

        }, 200);
    });


    $('#sidebar-reveal').click(function() {
        $('#menu-placeholder').animate({
            'margin-left': '0'
        }, 500);
        $('.overlay').fadeIn();
    });

    /* $('#menu > ul > li ul').each(function(index, e) {
         var count = $(e).find('li').length;
         var content = '<span class=\"cnt\">' + count + '</span>';
         $(e).closest('li').children('a').append(content);
     });*/


    $('.sub-category-options').not('.sub-category-back').click(function() {
        setTimeout(function() {
            $('#menu-placeholder').animate({
                'margin-left': '-100%'
            }, 1000);
            $('.overlay').fadeOut();
        }, 200);
    });

    $('#video-select').keypress(function(e) {
        if (e.which == 13) {
            e.preventDefault();
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var match = $('#video-select').val().match(regExp);
            var youtubeVideoId = '';

            if (match && match[2].length == 11) {
                youtubeVideoId = match[2];
            }
            $('#video-preview').html('<iframe class="embed-responsive-item" src="//www.youtube.com/embed/' + youtubeVideoId + '" frameborder="0" allowfullscreen></iframe>');

        }
    });

});


function previewTitle(input) {
    $('#title-preview').text($(input).val());
}



function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#image-preview img')
                .attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function rippleAnimation(e) {
    $this = $(this);

    //remove ripple if it's already on
    $oldRipple = $('.ripple');
    if ($this.has($oldRipple)) $('.ripple').remove();
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

function textAreaAdjust(o) {
    o.rows = o.value.split('\n').length + 1;
    $('#quote-input').scrollintoview({
        duration: 0
    });
}

$(function() {
    $('#article-content-edit').froalaEditor()
        .on('froalaEditor.contentChanged', function(e, editor) {
            $('#preview').html(editor.html.get());
        })
});
