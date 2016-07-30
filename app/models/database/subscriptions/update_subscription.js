module.exports = {
    update_subscription: function(sub_details, callback) {
        if (typeof(callback)==='undefined') callback = function() {};

        this.conn.query(
            'UPDATE email_subscriptions SET subscription_IP = ?, subscription_date = ?, subscription_active = ?  WHERE subscription_email = ?;', 
            [sub_details.ip, sub_details.date, sub_details.active, sub_details.email],
            function(err, result) {
                if (err) throw err;

               /* if (sub_details.active === 0) {
                    console.log('User ' + sub_details.email + ' unsubscribed to email updates.');
                } else {
                    console.log('User ' + sub_details.email + ' has resubscribe to email updates.');
                }*/
                callback();
                
            }
        );

    }
}
