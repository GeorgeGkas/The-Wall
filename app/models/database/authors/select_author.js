module.exports = {
    /** 
     * Select an author entry.
     * @method select_author
     * @memberof MYSQL#
     * @param {!(string|Object)} select_details - The required properties to select a user.
     * @param {?HandleCallback} callback - The callback that handles the response.
     * @example
     * // gets all authors.
     * mysql.select_author('*');
     * @example
     * // gets author by email and author role.
     * mysql.select_author({
     *     email: 'some@email.com',
     *     role: 'admin/writer'
     * });
     *
     */
    select_author: function(select_details, callback) {
        if (!(callback instanceof Function)) callback = function() {};

        if (select_details == '*') {
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
        } else if (typeof select_details == 'object') {
           if (select_details == null) {
                return callback(null, null);
            }

            var params = ['email', 'role'];
            var provided = [];
            var db_params = ['author_email', 'author_role']

            for (var i = 0; i < params.length; i++) {
                var p = params[i];
                if (select_details.hasOwnProperty(p)) {
                    provided.push(db_params[i] + '=\'' + select_details[params[i]] + '\'');
                }
            }

            if (provided.length == 0) {
                return callback(null, null);
            }

            var query = 'SELECT * FROM authors WHERE ' + provided.join(' AND ') + ' ';
            this.pool.getConnection(function(err, connection) {
                if (err) {
                    return callback(err);
                }
                connection.query(
                    query,
                    function(err, result) {
                        connection.release();
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, result);
                        }
                    });
            });
        }
    }
}
