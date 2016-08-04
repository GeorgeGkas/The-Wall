module.exports = {
    select_author: function(query, callback) {
        if (typeof(callback) === 'undefined') callback = function() {};

        if (query == '*') {
            this.pool.getConnection(function(err, connection) {
                connection.query(
                    'SELECT * FROM  authors',
                    function(err, result) {
                        if (err) throw err;
                        else {
                            connection.release();
                            callback(result);
                        }
                    }
                );
            });
        } else if (query != undefined) {
            if (query.split('|')[0] == 'writer') {
                this.pool.getConnection(function(err, connection) {
                    connection.query(
                        'SELECT * FROM authors WHERE author_email = ? AND author_role = \'writer\'', [query.split('|')[1]],
                        function(err, result) {
                            if (err) throw err;
                            else {
                                connection.release();
                                callback(result);
                            }
                        }
                    );
                });
            } else if (query.split('|')[0] == 'admin') {
                this.pool.getConnection(function(err, connection) {
                    connection.query(
                        'SELECT * FROM authors WHERE author_email = ? AND author_role = \'admin\'', [query.split('|')[1]],
                        function(err, result) {
                            if (err) throw err;
                            else {
                                connection.release();
                                callback(result);
                            }
                        }
                    );
                });
            } else if (query.split('|')[0] == 'email') {
                this.pool.getConnection(function(err, connection) {
                    connection.query(
                        'SELECT * FROM authors WHERE author_email = ?', [query.split('|')[1]],
                        function(err, result) {
                            if (err) throw err;
                            else {
                                connection.release();
                                callback(result);
                            }
                        }
                    );
                });
            } else {
                this.pool.getConnection(function(err, connection) {
                    connection.query(
                        query,
                        function(err, result) {
                            if (err) throw err;
                            else {
                                connection.release();
                                callback(result);
                            }
                        }
                    );
                });
            }

        } else {
            throw new Error('No parameter provided to select_author call.');
        }
    }
}
