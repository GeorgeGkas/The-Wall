module.exports = {
    update_post: function(update_details, callback) {
        if (typeof(callback) === 'undefined') callback = function() {};

        if (typeof update_details == undefined || update_details == null || update_details.length <= 0) {
            throw new Error('No parameter provided to update_post call.');
        } else if (typeof update_details === 'string') {
            this.conn.query(
                update_details,
                function(err, result) {
                    if (err) throw err;
                    callback(result);
                });
        } else if (typeof update_details !== 'object') {
            throw new Error('Non Object. Wrong parameter provided to update_post call.');
        } else {
            if(!('id' in update_details)) {
                throw new Error('Please provide the post id to update.');
            }

            var params = ['date', 'status', 'title', 'has_article', 'article_content', 'post_content'];
            var provided = [];
            var db_params = ['post_date', 'post_status', 'post_title', 'post_has_article', 'article_content', 'post_content']

            for (var i = 0; i < params.length; i++) {
                var p = params[i];
                if (update_details[p] !== undefined) {
                    provided.push(db_params[i] + '=\'' + update_details[params[i]] + '\'');
                }
            }

            var query = 'UPDATE posts SET ' + provided.join(' , ') + ' WHERE post_ID = ' + update_details.id;
            this.conn.query(
                query,
                function(err, result) {
                    if (err) throw err;
                    callback(result);
                });
        }
    }
}