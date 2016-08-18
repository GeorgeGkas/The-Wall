module.exports = {
    delete_author: function(author_email, callback) {
        if (typeof(callback) === 'undefined') callback = function() {};

        if (author_email != null || author_email != undefined) {
            this.pool.getConnection(function(err, connection) {
                if (err) callback(err);
                connection.query(
                    'DELETE FROM authors WHERE author_email = ?', [author_email],
                    function(err, result) {
                        connection.release();
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, result);
                        }
                    }
                );
            });
        } else {
           callback(new Error('No parameter provided to delete_author call.'));
        }
    }
}
