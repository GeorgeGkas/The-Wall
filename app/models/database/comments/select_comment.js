module.exports = {
    /** 
     * Select a comment entry.
     * @method select_comment
     * @memberof MYSQL#
     * @param {!Object} comment_details - The required properties to select a comment.
     * @param {number} comment_details.post_id - The id of the post.
     * @param {('pending'|'approved')} comment_details.state - Select comments by their state.
     * @param {?HandleCallback} callback - The callback that handles the response.
     * @example
     * // gets all approved comments for a post.
     * mysql.select_comment({
     *      post_id: 845,
     *      state: 'approved'
     * });
     *
     */
    select_comment: function(select_details, callback) {
        if (!(callback instanceof Function)) callback = function() {};

        if (typeof select_details == 'undefined' || select_details == null || select_details.length <= 0) {
            callback(new Error('No parameter provided to select_comment call.'));
        } else if (typeof select_details != 'object') {
            callback(new Error('Non Object. Wrong parameter provided to select_comment call.'));
        } else {
            var params = ['post_id', 'state'];
            var provided = [];
            var db_params = ['comment_post_ID', 'comment_state']

            for (var i = 0; i < params.length; i++) {
                var p = params[i];
                if (select_details[p] !== undefined) {
                    provided.push(db_params[i] + '=\'' + select_details[params[i]] + '\'');
                }
            }

            var query = 'SELECT * FROM comments WHERE ' + provided.join(' AND ') + ' ORDER BY comment_date DESC';
            this.pool.getConnection(function(err, connection) {
                if (err) {
                    return callback(err);
                }
                connection.query(
                    query,
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
