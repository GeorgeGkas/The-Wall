module.exports = {
     /** 
     * Update an author entry. 
     * @method update_author
     * @memberof MYSQL#
     * @param {!Object} author_details - The object that holds the properties to look for in an entry.
     * @param {string} author_details.email - The author's email.
     * @param {string} author_details.newAvatar - The new URL of an image to use as profile avatar.
     * @param {string} author_details.newDescription - A small description about the author.
     * @param {string} author_details.newName - The author's name.
     * @param {('writer'|'admin')} author_details.newRole [writer] - The new role of the author.
     * @param {?HandleCallback} callback - The callback that handles the response.
     *
     */
    update_author: function(author_details, callback) {
        if (typeof(callback) === 'undefined') callback = function() {};

        if (author_details == undefined || !('newName' in author_details) && !('newDescription' in author_details) && !('newAvatar' in author_details) && !('newRole' in author_details)) {
            callback(new Error('Empty parameter provided. Can not change anything.'));
        } else if (!('email' in author_details)) {
            callback(new Error("Please provide the author's email whose informations will be change."));
        } else {
            var params = ['newAvatar', 'newDescription', 'newName', 'newRole'];
            var provided = [];
            var db_params = ['author_avatar', 'author_description', 'author_name', 'author_role'];

            for (var i = 0; i < params.length; i++) {
                var p = params[i];
                if (author_details[p] !== undefined) {
                    provided.push(db_params[i] + '=\'' + author_details[params[i]] + '\'');
                }
            }

            var query = 'UPDATE authors SET ' + provided.join(' , ') + ' WHERE author_email = \'' + author_details.email + '\'';
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

/* Callback for handling delete_author method.
 * @name HandleCallback
 * @param {null|Error} err - Error instance if error occurs.
 * @param {Object} result - The query response.
 *
 */