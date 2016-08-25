module.exports = {
    /** 
     * Select a post.
     * @method select_post
     * @memberof MYSQL#
     * @param {!(Object|string)} select_details - The properties required to select posts or 'featured' to get the featued article.
     * @param {?('img'|'quote'|'video')} select_details.type - The type of the post.
     * @param {?('draft'|'published'|'deleted')} select_details.status - The public state of the post.
     * @param {?string} select_details.author - Get post by author's email (should be registered).
     * @param {?string} select_details.title - The title of the post.
     * @param {?number} select_details.limit - get a limit number of posts.
     * @param {?HandleCallback} callback - The callback that handles the response.
     * @example
     * // gets featured post.
     * mysql.select_comment('featured');
     * @example
     * // gets post with specific properties.
     * mysql.select_comment({
     *      type: 'img/quote/video',
     *      status: 'draft/published/deleted',
     *      author: 'author@email.com',
     *      title: 'Post title'
     * });
     *
     */
    select_post: function(select_details, callback) {
        if (!(callback instanceof Function)) callback = function() {};

        if (typeof select_details == 'undefined' || select_details == null || select_details.length <= 0) {
            callback(new Error('No parameter provided to select_post call.'));
        } else if (typeof select_details == 'string') {
            if (select_details == 'featured') {
                this.pool.getConnection(function(err, connection) {
                    if (err) {
                        return callback(err);
                    }
                    connection.query(
                        'SELECT * FROM posts WHERE  post_feature_dynamic=(SELECT MAX(post_feature_dynamic) FROM posts) AND post_status=\'published\' ORDER BY post_date DESC LIMIT 1',
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
        } else if (typeof select_details != 'object') {
            callback(new Error('Non Object. Wrong parameter provided to select_post call.'));
        } else {
            var params = ['type', 'status', 'author', 'title'];
            var provided = [];
            var db_params = ['post_type', 'post_status', 'author_email', 'post_title']

            for (var i = 0; i < params.length; i++) {
                var p = params[i];
                if (select_details[p] !== undefined) {
                    provided.push(db_params[i] + '=\'' + select_details[params[i]] + '\'');
                }
            }

            var limit = '';
            if ('limit' in select_details) limit = 'LIMIT ' + select_details.limit;

            var query = 'SELECT * FROM posts WHERE ' + provided.join(' AND ') + ' ORDER BY post_date DESC ' + limit;
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
