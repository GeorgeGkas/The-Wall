module.exports = {
    /** 
     * Select a subscription.
     * @method select_subscription
     * @memberof MYSQL#
     * @param {!string} query - Select subscription.
     * @param {?HandleCallback} callback - The callback that handles the response.
     * @example
     * // gets all subscriptions.
     * mysql.select_subscription('*');
     * @example
     * // gets subscription by email.
     * mysql.select_subscription('email|some@email.com');
     *
     */
    select_subscription: function(query, callback) {
        if (typeof(callback) === 'undefined') callback = function() {};

        if (query == '*') {
            this.pool.getConnection(function(err, connection) {
                if (err) {
                    return callback(err);
                }
                connection.query(
                    'SELECT * FROM  email_subscriptions',
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
        } else if (query != undefined) {
            if (query.split('|')[0] == 'email') {
                this.pool.getConnection(function(err, connection) {
                    if (err) {
                        return callback(err);
                    }
                    connection.query(
                        'SELECT * FROM email_subscriptions WHERE subscription_email = ?', [query.split('|')[1]],
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
            }
        } else {
            callback(new Error('No parameter provided to select_subscription call.'));
        }
    }
}
