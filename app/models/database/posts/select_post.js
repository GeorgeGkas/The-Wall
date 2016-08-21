module.exports = {
    select_post: function(select_details, callback) {
        if (typeof(callback) === 'undefined') callback = function() {};

        if (typeof select_details == undefined || select_details == null || select_details.length <= 0) {
            callback(new Error('No parameter provided to select_post call.'));
        } else if (typeof select_details === 'string') {
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
            } else {
                this.pool.getConnection(function(err, connection) {
                    if (err) {
                        return callback(err);
                    }
                    connection.query(
                        select_details,
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
        } else if (typeof select_details !== 'object') {
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
