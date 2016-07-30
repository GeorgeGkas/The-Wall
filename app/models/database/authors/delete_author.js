module.exports = {
    delete_author: function(author_name, callback) {

        if (typeof(callback)==='undefined') callback = function() {};

        if (author_name == 'all') {
            this.conn.query(
                'DELETE FROM authors',
                function(err, result) {
                    if (err) throw err;
                    callback(result);
                }
            );
        } else if (author_name != null || author_name != undefined) {
            this.conn.query(
                'DELETE FROM authors WHERE author_name = ?', [author_name],
                function(err, result) {
                    if (err) throw err;
                    callback(result);
                }
            );
        } else {
            throw new Error('No parameter provided to delete_author call.');
        }
    }
}
