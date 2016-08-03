module.exports = {
    post_like: function(post_id, callback) {
        if (typeof(callback) === 'undefined') callback = function() {};

        if (post_id != null || post_id != undefined) {
            this.conn.query(
                'UPDATE posts SET `post_like_count` = `post_like_count` + 1, `post_feature_dynamic` = `post_feature_dynamic` + 1 WHERE post_ID = ?',
                [post_id],
                function(err, result) {
                    if (err) throw err;
                    callback(result);
                }
            );

        } else {
            throw new Error('No post_id provided to post_like call.');
        }

    }
}
