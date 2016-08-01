module.exports = {
    select_post: function(select_details, callback) {
        if (typeof(callback) === 'undefined') callback = function() {};

        if (typeof select_details == undefined || select_details == null || select_details.length <= 0) {
            throw new Error('No parameter provided to select_post call.');
        } else if (typeof select_details === 'string') {
            this.conn.query(
                select_details,
                function(err, result) {
                    if (err) throw err;
                    callback(result);
                });
        } else if (typeof select_details !== 'object') {
            throw new Error('Non Object. Wrong parameter provided to select_post call.');
        } else {
            var params = ['type', 'status', 'author'];
            var provided = [];
            var db_params = ['post_type', 'post_status', 'author_email']

            for (var i = 0; i < params.length; i++) {
                var p = params[i];
                if (select_details[p] !== undefined) {
                    provided.push(db_params[i] + '=\'' + select_details[params[i]] + '\'');
                }
            }

            var limit = '';
            if ('limit' in select_details) limit = 'LIMIT ' + select_details.limit;

            var query = 'SELECT * FROM posts WHERE ' + provided.join(' AND ') + ' ORDER BY post_date DESC ' + limit;
            this.conn.query(
                query,
                function(err, result) {
                    if (err) throw err;
                    callback(result);
                });
        }
    }
}