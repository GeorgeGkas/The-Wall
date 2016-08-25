module.exports = {
    /** 
     * Delete a comment entry.
     * @method delete_comment
     * @memberof MYSQL#
     * @param {!string} comment_id - The id of the comment we want to delete.
     * @param {?HandleCallback} callback - The callback that handles the response.
     *
     */
    delete_comment: function(comment_id, callback) {
        if (!(callback instanceof Function)) callback = function() {};

        if (comment_id != null || typeof comment_id != 'undefined') {
            this.pool.getConnection(function(err, connection) {
                if (err) {
                    return callback(err);
                }
                connection.query(
                    'DELETE FROM comments WHERE comment_ID = ?', 
                    [comment_id],
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
            callback(new Error('No parameter provided to delete_comment call.'));
        }
    }
}
