module.exports = {
    /** 
     * Select an author entry.
     * @method select_author
     * @memberof MYSQL#
     * @param {!string} param - The required properties to select a user.
     * @param {?HandleCallback} callback - The callback that handles the response.
     * @example
     * // gets all authors.
     * mysql.select_author('*');
     * @example
     * // gets only users that have writer priviledges.
     * mysql.select_author('writer|some@email.com');
     * @example
     * // gets only users that have admin priviledges.
     * mysql.select_author('admin|some@email.com');
     * @example
     * // gets any user that much the provided email.
     * mysql.select_author('email|some@email.com');
     * @example
     * // run a custom query.
     * mysql.select_author(query);
     *
     */
    select_author: function(param, callback) {
        if (typeof(callback) === 'undefined') callback = function() {};

        if (param == '*') {
            this.pool.getConnection(function(err, connection) {
                if (err) {
                    return callback(err);
                }
                connection.query(
                    'SELECT * FROM  authors',
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
        } else if (param != undefined) {
            if (param.split('|')[0] == 'writer') {
                this.pool.getConnection(function(err, connection) {
                    if (err) {
                        return callback(err);
                    }
                    connection.query(
                        'SELECT * FROM authors WHERE author_email = ? AND author_role = \'writer\'', [param.split('|')[1]],
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
            } else if (param.split('|')[0] == 'admin') {
                this.pool.getConnection(function(err, connection) {
                    if (err) {
                        return callback(err);
                    }
                    connection.query(
                        'SELECT * FROM authors WHERE author_email = ? AND author_role = \'admin\'', [param.split('|')[1]],
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
            } else if (param.split('|')[0] == 'email') {
                this.pool.getConnection(function(err, connection) {
                    if (err) {
                        return callback(err);
                    }
                    connection.query(
                        'SELECT * FROM authors WHERE author_email = ?', [param.split('|')[1]],
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
                this.pool.getConnection(function(err, connection) {
                    if (err) {
                        return callback(err);
                    }
                    connection.query(
                        param,
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

        } else {
            callback(new Error('No parameter provided to select_author call.'));
        }
    }
}