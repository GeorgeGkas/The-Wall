module.exports = {
    select_author: function(query, callback) {
        if (typeof(callback) === 'undefined') callback = function() {};

        if (query == '*') {
            this.conn.query(
                'SELECT * FROM  authors',
                function(err, result) {
                    if (err) throw err;
                    else callback(result);
                }
            );
        } else if (query != undefined) {
            if (query.split('|')[0] == 'writer') {
                this.conn.query(
                    'SELECT * FROM authors WHERE author_email = ? AND author_role = \'writer\'', [query.split('|')[1]],
                    function(err, result) {
                        if (err) throw err;
                        else callback(result);
                    }
                );
            } else if (query.split('|')[0] == 'admin') {
                this.conn.query(
                    'SELECT * FROM authors WHERE author_email = ? AND author_role = \'admin\'', [query.split('|')[1]],
                    function(err, result) {
                        if (err) throw err;
                        else callback(result);
                    }
                );
            } else if (query.split('|')[0] == 'email') {
                this.conn.query(
                    'SELECT * FROM authors WHERE author_email = ?', [query.split('|')[1]],
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
            throw new Error('No parameter provided to select_author call.');
        }
    }
}
