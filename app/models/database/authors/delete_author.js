module.exports = {
    delete_author: function(author_email, callback) {

        if (typeof(callback) === 'undefined') callback = function() {};

        if (author_email == 'all') {
            this.pool.getConnection(function(err, connection) {
                connection.query(
                    'DELETE FROM authors',
                    function(err, result) {
                        if (err) throw err;
                        connection.release();
                        callback(result);
                    }
                );
            });
        } else if (author_email != null || author_email != undefined) {
            this.pool.getConnection(function(err, connection) {
                connection.query(
                    'DELETE FROM authors WHERE author_email = ?', [author_email],
                    function(err, result) {
                        if (err) throw err;
                        connection.release();
                        callback(result);
                    }
                );
            });
        } else {
            throw new Error('No parameter provided to delete_author call.');
        }
    }
}
