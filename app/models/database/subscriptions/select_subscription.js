module.exports = {
    select_subscription: function(query, callback) {
        if (typeof(callback) === 'undefined') callback = function() {};

        if (query == '*') {
            this.pool.getConnection(function(err, connection) {
                connection.query(
                    'SELECT * FROM  email_subscriptions',
                    function(err, result) {
                        if (err) throw err;
                        else {
                            connection.release();
                            callback(result);
                        }
                    }
                );
            });
        } else if (query != undefined) {
            if (query.split('|')[0] == 'email') {
                this.pool.getConnection(function(err, connection) {
                    connection.query(
                        'SELECT * FROM email_subscriptions WHERE subscription_email = ?', [query.split('|')[1]],
                        function(err, result) {
                            if (err) throw err;
                            else {
                                connection.release();
                                callback(result);
                            }
                        }
                    );
                });
            } else {
                this.pool.getConnection(function(err, connection) {
                    connection.query(
                        query,
                        function(err, result) {
                            if (err) throw err;
                            else {
                                connection.release();
                                callback(result);
                            }
                        }
                    );
                });
            }

        } else {
            throw new Error('No parameter provided to select_subscription call.');
        }
    }
}
