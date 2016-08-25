module.exports = {
    /** 
     * Delete an author entry.
     * @method delete_author
     * @memberof MYSQL#
     * @param {!string} author_email - The email of the specific author we want to delete.
     * @param {?HandleCallback} callback - The callback that handles the response.
     *
     */
    delete_author: function(author_email, callback) {
        if (!(callback instanceof Function)) callback = function() {};

        if (author_email != null || typeof author_email != 'undefined') {
            this.pool.getConnection(function(err, connection) {
                if (err) {
                    return callback(err);
                }
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


