$(document).ready(function() {

    $('html').niceScroll();

    $('.post-title').each(function() {
        var text = $(this).html().split(/[\s!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/).join('-');
        $(this).html(text);
    });
});


$(window).on('load', function() {
    $('section').masonry({
        itemSelector: 'article',
        transitionDuration: '0.2s'
    });
});



$(window).resize(function() {
    if (jQuery(window).innerWidth() < 768) {
        jQuery('section').masonry('destroy');
    } else {
        jQuery('section').masonry({
            itemSelector: 'article',
            transitionDuration: '0.2s'
        });
    }
});
