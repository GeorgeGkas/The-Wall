module.exports = {
    /** 
     * Update a subscription.
     * @method update_subscription
     * @memberof MYSQL#
     * @param {!Object} sub_details - The required details.
     * @param {number} sub_details.active - 0 or 1.
     * @param {string} sub_details.email - The subscription email.
     * @param {?HandleCallback} callback - The callback that handles the response.
     *
     */
    update_subscription: function(sub_details, callback) {
        if (!(callback instanceof Function)) callback = function() {};
        
        this.pool.getConnection(function(err, connection) {
            if (err) {
                return callback(err);
            }
            connection.query(
                'UPDATE email_subscriptions SET subscription_date = NOW(), subscription_active = ?  WHERE subscription_email = ?;', [sub_details.active, sub_details.email],
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
}
