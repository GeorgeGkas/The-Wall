module.exports = {
    /** 
     * Insert a new comment entry.
     * @method insert_comment
     * @memberof MYSQL#
     * @param {!Object} comment_details - The required properties to register an new comment.
     * @param {string} comment_details.post_id - The id of the post to place the comment.
     * @param {string} comment_details.author_name - The name of the user who add the comment.
     * @param {string} comment_details.content - The body of the comment.
     * @param {string} comment_details.author_email - The email of the user who post the comment.
     * @param {?HandleCallback} callback - The callback that handles the response.
     *
     */
    insert_comment: function(comment_details, callback) {
        if (typeof(callback) === 'undefined') callback = function() {};

        if (comment_details.post_id.trim() != '' && comment_details.author_name.trim() != '' && comment_details.content.trim() != '' && comment_details.author_email.trim() != '') {
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
        } else {
            callback(new Error('All fields are required to post a comment.'));
        }

    }
}
