$(document).ready(function() {
    $('html').niceScroll();
    $('#no-more-posts').hide();

    $('.post-title').each(function() {
        var text = $(this).html().split(' ').join('-');
        $(this).html(text);
    });

    $('#load-more').click(function() {
        $.ajax({
            type: 'POST',
            url: '/get_more_posts',
            dataType: 'json',
            success: function(res) {
                if (res.posts.length > 0) {
                    var $posts = $(res.posts);
                    $('#post-content').append($posts).masonry('appended', $posts);
                } else {
                    $('#load-more').fadeOut(function() {
                        $('#no-more-posts').fadeIn();
                    });
                }
            },
            error: function(err) {
                console.log(err.responseJSON.error);
            }
        });
    });
});

$(window).on('load', function() {
    $('#post-content').masonry({
        itemSelector: 'article',
        transitionDuration: '0.2s'
    });
});

$(window).resize(function() {
    if (jQuery(window).innerWidth() < 768) {
        jQuery('#post-content').masonry('destroy');
    } else {
        jQuery('#post-content').masonry({
            itemSelector: 'article',
            transitionDuration: '0.2s'
        });
    }
});