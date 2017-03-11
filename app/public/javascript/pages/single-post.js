$(document).ready(function() {
    $('html').niceScroll();
    $('#be-nice-alert').hide();
    $('#fav-added').hide();
    $('#post-favorite-button-after').hide();
    $('.comment-favorite-button-after').hide();
    $('#got-email-subscription').hide();
    $('#comment-post-message').hide();

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

    $('#post-favorite-button').click(function(event) {
        $.ajax({
            type: 'POST',
            url: '/post/like',
            dataType: 'json',
            data: {
                id: document.getElementById('post-content').getAttribute('data-post_id')
            },
            success: function() {
                $('#fav-head').slideToggle();
                $('#post-favorite-button').fadeOut(function() {
                    $('#post-favorite-button-after, #fav-added').fadeIn();
                });
            }
        });
    });

    $('.comment-favorite-button').click(function() {
        var $this = $(this);
        $.ajax({
            type: 'POST',
            url: '/post/comment/like',
            dataType: 'json',
            data: {
                id: $(this).closest('li').attr('id')
            },
            success: function() {
                commentID = '#' + $this.closest('li.single-comment').attr('id');
                $this.fadeOut(function() {
                    $(commentID + ' .comment-heart-count').html(parseInt($(commentID + ' .comment-heart-count').html(), 10) + 1);
                    $(commentID + ' .comment-favorite-button-after').fadeIn();
                });
            }

        });
    });

    $('#email-subscription-form').submit(function(event) {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/post/subscribe',
            dataType: 'json',
            data: {
                email: $('#email-subscription-input').val()
            },
            success: function() {
                $('#email-subscription-button,  #email-subscription-input').slideToggle(function() {
                    $('#got-email-subscription').fadeIn();
                });
            }
        });
    });


    $('#comment-submit-section button').click(function(event) {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/post/comment',
            dataType: 'json',
            data: {
                email: $('#comment-post-form #email input').val(),
                name: $('#comment-post-form #user input').val(),
                content: $('#comment-post-form #comment-editor textarea').val().replace(/\r?\n/g, '<br />'),
                post_id: document.getElementById('post-content').getAttribute('data-post_id')
            },
            success: function() {
                $('#comment-post-form').fadeOut(function() {
                    $('#comment-post-message').fadeIn();
                });
            },
            error: function(err) {
                $('#comment-info').text(err.responseJSON.error).fadeIn();
            }
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

$('html').not('#comment-submit-section button').click(function() {
    $('#comment-info').fadeOut().text('');
});
