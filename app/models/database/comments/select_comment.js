module.exports = {
    select_comment: function(select_details, callback) {
        if (typeof(callback) === 'undefined') callback = function() {};

        if (typeof select_details == undefined || select_details == null || select_details.length <= 0) {
            throw new Error('No parameter provided to select_comment call.');
        } else if (typeof select_details === 'string') {
            this.pool.getConnection(function(err, connection) {
                connection.query(
                    select_details,
                    function(err, result) {
                        if (err) throw err;
                        connection.release();
                        callback(result);

                    });
            });

        } else if (typeof select_details !== 'object') {
            throw new Error('Non Object. Wrong parameter provided to select_comment call.');
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
                connection.query(
                    query,
                    function(err, result) {
                        if (err) throw err;
                        connection.release();
                        callback(result);
                    });
            });
        }
    }
}
