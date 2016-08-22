module.exports = {
    /** 
     * Delete a post entry.
     * @method delete_post
     * @memberof MYSQL#
     * @param {!string} post_id - The id of the post we want to delete.
     * @param {?HandleCallback} callback - The callback that handles the response.
     *
     */
    delete_post: function(post_id, callback) {

        if (typeof(callback) === 'undefined') callback = function() {};

        if (post_id != null || post_id != undefined) {
            this.pool.getConnection(function(err, connection) {
                if (err) {
                    return callback(err);
                }
                conenction.query(
                    'DELETE FROM posts WHERE post_ID = ?', [post_id],
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
            callback(new Error('No parameter provided to delete_post call.'));
        }
    }
}
