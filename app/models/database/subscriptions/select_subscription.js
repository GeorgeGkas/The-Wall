module.exports = {
    select_subscription: function(query, callback) {
        if (query == '*') {
            this.conn.query(
                'SELECT * FROM  email_subscriptions',
                function(err, result) {
                    if (err) throw err;
                    else callback(result);
                }
            );
        } else if (query != undefined) {
            if (query.split('|')[0] == 'email') {
                this.conn.query(
                    'SELECT * FROM email_subscriptions WHERE subscription_email = ?', 
                    [query.split('|')[1]],
                    function(err, result) {
                        if (err) throw err;
                        else callback(result);
                    }
                );
            } else {
                this.conn.query(
                    query,
                    function(err, result) {
                        if (err) throw err;
                        else callback(result);
                    }
                );
            }

        } else {
            throw new Error('No parameter provided to select_subscription call.');
        }
    }
}
