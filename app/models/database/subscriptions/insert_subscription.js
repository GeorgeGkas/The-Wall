module.exports = {
    insert_subscription: function(sub_details, callback) {
        if (typeof(callback) === 'undefined') callback = function() {};

        if (sub_details.email.trim() != '') {
            this.pool.getConnection(function(err, connection) {
                connection.query(
                    'INSERT INTO email_subscriptions (subscription_email, subscription_date) VALUES(?, ?);', [sub_details.email, sub_details.date],
                    function(err, result) {
                        if (err) throw err;
                        connection.release();
                        callback(result);
                    }
                );
            });
        } else {
            callback({err: true, msg: 'Please fill out the email input.'});
        }

    }
}
