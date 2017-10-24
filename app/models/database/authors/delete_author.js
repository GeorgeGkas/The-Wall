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

        if (typeof author_email != 'string' || author_email.trim() === '') {
            return callback(new Error('Parameter provided to delete_author should be string and not empty.'));
        }

        var emailReg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!emailReg.test(author_email.trim())) {
            return callback(new Error('Email format is not valid.'));
        }
       
        this.pool.getConnection(function(err, connection) {
            if (err) {
                return callback(err);
            }
            connection.query(
                'DELETE FROM authors WHERE author_email = ?', [author_email.trim()],
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
    
    }
}


