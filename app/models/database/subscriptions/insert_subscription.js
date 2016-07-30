module.exports = {
    insert_subscription: function(sub_details, callback) {
        if (typeof(callback)==='undefined') callback = function() {};

        this.conn.query(
            'INSERT INTO email_subscriptions (subscription_email, subscription_IP, subscription_date) VALUES(?, ?, ?);', 
            [sub_details.email, sub_details.ip, sub_details.date],
            function(err, result) {
                if (err) throw err;
                console.log('User ' + sub_details.email + ' has subscribe to email updates.');
                callback();
            }
        );

    }
}
