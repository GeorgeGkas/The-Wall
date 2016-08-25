module.exports = {
    /** 
     * Insert a new post entry.
     * @method insert_post
     * @memberof MYSQL#
     * @param {!Object} post_details - The required properties to insert a new post.
     * @param {('draft'|'published'|'deleted')} [post_details.status=draft] - The public state of the generated post.
     * @param {number} [post_details.has_article=0] - Post comes with article?
     * @param {string} [post_details.article_content=(empty)] - Article's content of the post.
     * @param {string} post_details.author - The author's email (should be registered).
     * @param {string} post_details.post_content - Post content.
     * @param {('img'|'quote'|'video')} post_details.type - The type of the new post.
     * @param {string} post_details.title - The title of the post. (Used as alt in images)
     * @param {?HandleCallback} callback - The callback that handles the response.
     *
     */
    insert_post: function(post_details, callback) {
        if (!(callback instanceof Function)) callback = function() {};

        if (!('status' in post_details)) post_details.status = 'draft';
        if (!('has_article' in post_details)) post_details.has_article = 0;
        if (!('article_content' in post_details)) post_details.article_content = '';

        if ('author' in post_details && 'post_content' in post_details && 'type' in post_details && 'title' in post_details) {
            this.pool.getConnection(function(err, connection) {
                if (err) {
                    return callback(err);
                }
                connection.query(
                    'INSERT INTO posts (author_email, post_date, post_content, post_type, post_title, post_status, post_has_article, article_content) VALUES(?, NOW(), ?, ?, ?, ?, ?, ?);', 
                    [post_details.author, post_details.post_content, post_details.type, post_details.title, post_details.status, post_details.has_article, post_details.article_content],
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
            callback(new Error('You need to provide all the parameters to insert_post call.'));
        }

    }
}
