module.exports = {
    select_author: function(query, callback) {
        if (query == 'all') {
            this.conn.query(
                'SELECT * FROM  authors',
                function(err, result) {
                    if (err) throw err;
                    else callback(result);
                }
            );
        } else if (query != null || query != undefined) {
            this.conn.query(
                query,
                function(err, result) {
                    if (err) throw err;
                    else callback(result);
                }
            );
        } else {
            throw new Error('No parameter provided to select_author call.');
        }
    }
}
