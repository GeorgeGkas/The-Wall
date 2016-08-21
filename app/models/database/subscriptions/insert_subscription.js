module.exports = {
    /** 
     * Insert a subscription.
     * @method insert_subscription
     * @memberof MYSQL#
     * @param {!string} sub_email - The email of the subscription.
     * @param {?HandleCallback} callback - The callback that handles the response.
     *
     */
    insert_subscription: function(sub_email, callback) {
        if (typeof(callback) === 'undefined') callback = function() {};

        if (sub_email.trim() != '') {
            this.pool.getConnection(function(err, connection) {
                if (err) {
                    return callback(err);
                }
                connection.query(
                    'INSERT INTO email_subscriptions (subscription_email, subscription_date) VALUES(?, NOW()) ON DUPLICATE KEY UPDATE subscription_active = 1;', [sub_email],
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
            callback(new Error('Please fill out the email input.'));
        }

    }
}
