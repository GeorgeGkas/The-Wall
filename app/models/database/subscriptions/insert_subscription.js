module.exports = {
    insert_subscription: function(sub_details, callback) {
        if (typeof(callback) === 'undefined') callback = function() {};

        if (sub_details.email.trim() != '') {
            this.pool.getConnection(function(err, connection) {
                if (err) callback(err);
                connection.query(
                    'INSERT INTO email_subscriptions (subscription_email, subscription_date) VALUES(?, ?) ON DUPLICATE KEY UPDATE subscription_active = 1;', [sub_details.email, sub_details.date],
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
