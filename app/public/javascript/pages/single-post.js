$(document).ready(function() {

    $('html').niceScroll();
    $('#be-nice-alert').hide();
    $('#fav-added').hide();
    $('#post-favorite-button-after').hide();
    $('.comment-favorite-button-after').hide();
    $('#got-email-subscription').hide();

    $('#comment-user-body').click(function(event) {
        event.stopPropagation();

        $('#comment-info').text('Remember to be nice!').fadeIn();
    });

    $('#comment-user-email').click(function(event) {
        event.stopPropagation();
        $('#comment-info').text("We won't spam you.").fadeIn();
    });

    $('#comment-user-name').click(function(event) {
        event.stopPropagation();
        var cs = $(this).val().length;
        $('#comment-info').text(cs + ' / 25 characters.').fadeIn();
    });


    $('#comment-user-name').keyup(updateCount);
    $('#comment-user-name').keydown(updateCount);

    $('#post-favorite-button').click(function() {
        $('#post-favorite-button').fadeOut(function() {
            $('#fav-head').slideToggle();
            $('#post-favorite-button-after, #fav-added').fadeIn();
        });
    });

    $('.comment-favorite-button').click(function() {
        commentID = '#' + $(this).closest('li.single-comment').attr('id');
        $(this).fadeOut(function() {
            $(commentID + ' .comment-heart-count').html(parseInt($(commentID + ' .comment-heart-count').html(), 10) + 1);
            $(commentID + ' .comment-favorite-button-after').fadeIn();
        });
    });

    $('#email-subscription-form').submit(function(event) {
        event.preventDefault();
    });

    $('#email-subscription-button').click(function() {
        $('#email-subscription-button,  #email-subscription-input').slideToggle(function() {
            $('#got-email-subscription').fadeIn();
        });


    });


});

function updateCount() {
    var cs = $(this).val().length;
    $('#comment-info').text(cs + ' / 25 characters.');
}


function textAreaAdjust(o) {
    o.rows = o.value.split('\n').length + 1;
    $('#comment-submit-section').scrollintoview({
        duration: 0
    });
}

$(window).click(function() {
    $('#comment-info').fadeOut();
});
