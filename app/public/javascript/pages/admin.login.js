$(document).ready(function() {
    $('#token-alert').hide();
    $('#adminLoginButton').click(function() {
        $(this).slideToggle(function() {
            $('#token-alert').fadeIn();
        });
    });

    $('#adminLoginForm').submit(function(event) {
        event.preventDefault();
    });
});
