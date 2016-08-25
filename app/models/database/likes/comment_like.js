module.exports = {
    /** 
     * Add one like to a specific comment.
     * @method comment_like
     * @memberof MYSQL#
     * @param {!string} comment_id - The id of the comment to place the like.
     * @param {?HandleCallback} callback - The callback that handles the response.
     *
     */
    comment_like: function(comment_id, callback) {
        if (!(callback instanceof Function)) callback = function() {};

        if (comment_id != null || typeof comment_id != 'undefined') {
            this.pool.getConnection(function(err, connection) {
                if (err) {
                    return callback(err);
                }
                connection.query(
                    'UPDATE comments SET `comment_like_count` = `comment_like_count` + 1 WHERE comment_ID = ?', 
                    [comment_id],
                    function(err, result) {
                        connection.release();
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, result);
                        }

                    });
            });

        } else {
            callback(new Error('Wrong comment_id provided to comment_like call.'));
        }

    }
}
