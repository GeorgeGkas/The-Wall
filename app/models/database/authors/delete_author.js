module.exports = {
    delete_author: function(author_email, callback) {

        if (typeof(callback)==='undefined') callback = function() {};

        if (author_email == 'all') {
            this.conn.query(
                'DELETE FROM authors',
                function(err, result) {
                    if (err) throw err;
                    callback(result);
                }
            );
        } else if (author_email != null || author_email != undefined) {
            this.conn.query(
                'DELETE FROM authors WHERE author_email = ?', [author_email],
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
