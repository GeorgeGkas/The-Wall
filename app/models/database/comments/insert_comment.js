module.exports = {
    /**
     * Insert a new comment entry.
     * @method insert_comment
     * @memberof MYSQL#
     * @param {!Object} comment_details - The required properties to register a new comment.
     * @param {string} comment_details.post_id - The id of the post to place the comment.
     * @param {string} comment_details.author_name - The name of the user who add the comment.
     * @param {string} comment_details.content - The body of the comment.
     * @param {string} comment_details.author_email - The email of the user who post the comment.
     * @param {('pending'|'approved')} comment_details.state - State of commnet.
     * @param {?HandleCallback} callback - The callback that handles the response.
     *
     */
    insert_comment: function(comment_details, callback) {
        if (!(callback instanceof Function)) callback = function() {};

        if (!comment_details.hasOwnProperty('post_id') ||
            !comment_details.hasOwnProperty('author_name') ||
            !comment_details.hasOwnProperty('content') ||
            !comment_details.hasOwnProperty('author_email') ||
            !comment_details.hasOwnProperty('state')) {
            return callback(new Error('You need to provide all the parameters to insert_comment call.'));
        }

        if (comment_details.post_id.trim() == '' ||
            comment_details.author_name.trim() == '' ||
            comment_details.content.trim() == '' ||
            comment_details.author_email.trim() == '' ||
            comment_details.state.trim() == '') {
            return callback(new Error('No empty property is allowed.'));
        }

        var emailReg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!emailReg.test(comment_details.author_email)) {
            return callback(new Error('Email format is not valid.'));
        }

        if (comment_details.state != 'approved' && comment_details.state != 'pending') {
          return callback(new Error('State should be either `approved` or `pending`.'));
        }

        this.pool.getConnection(function(err, connection) {
            if (err) {
                return callback(err);
            }
            connection.query(
                'INSERT INTO comments (comment_post_ID, comment_author, comment_date, comment_content, comment_author_email) VALUES(?, ?, NOW(), ?, ?);',
                [comment_details.post_id, comment_details.author_name, comment_details.content, comment_details.author_email],
                function(err, result) {
                    connection.release();
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, result);
                    }
                }
            );
        });
    }
}
