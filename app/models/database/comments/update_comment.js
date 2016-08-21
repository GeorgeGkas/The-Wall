module.exports = {
    /** 
     * Update a comment entry state.
     * @method update_comment
     * @memberof MYSQL#
     * @param {!Object} comment_details - The required properties to select a comment or the query to run.
     * @param {string} comment_details.post_id - The post id of the comment.
     * @param {string} comment_details.id - The comment id.
     * @param {('approved'|'pending')} comment_details.state - The state of the comment.
     * @param {?HandleCallback} callback - The callback that handles the response.
     *
     */
    update_comment: function(comment_details, callback) {
        if (typeof(callback) === 'undefined') callback = function() {};

        if (comment_details == undefined || !('state' in comment_details)) {
            callback(new Error('Empty parameter provided. Can not change anything.'));
        } else if (!('id' in comment_details)) {
            callback(new Error("Please provide the comments's id which state will be change."));
        } else {
            this.pool.getConnection(function(err, connection) {
                if (err) {
                    return callback(err);
                }
                if (comment_details.state == 'approved') {
                    connection.query(
                        'UPDATE posts SET `post_comment_count` = `post_comment_count` + 1, `post_feature_dynamic` = `post_feature_dynamic` + 2 WHERE post_ID = ?', [comment_details.post_id],
                        function(err, result) {});
                }

                connection.query(
                    'UPDATE comments SET comment_state = ? WHERE comment_ID = ?', [comment_details.state, comment_details.id],
                    function(err, result) {
                        connection.release();
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, result);
                        }
                    });
            });

        }

    }
}
