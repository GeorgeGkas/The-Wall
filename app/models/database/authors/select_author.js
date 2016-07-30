module.exports = {
    select_author: function(query, callback) {
        if (query == '*') {
            this.conn.query(
                'SELECT * FROM  authors',
                function(err, result) {
                    if (err) throw err;
                    else callback(result);
                }
            );
        } else if (query != undefined) {
            if (query.split('|')[0] == 'name') {
                this.conn.query(
                    'SELECT * FROM authors WHERE author_name = ?', 
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
            throw new Error('No parameter provided to select_author call.');
        }
    }
}
