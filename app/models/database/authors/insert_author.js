module.exports = {
     /** 
     * Insert a new author entry.
     * @method insert_author
     * @memberof MYSQL#
     * @param {!Object} author_details - The required properties to register a new author.
     * @param {string} author_details.name - The author's name.
     * @param {string} author_details.avatar - The URL of an image to use as profile avatar.
     * @param {string} author_details.description - A small description about the author.
     * @param {string} author_details.email - The author's email.
     * @param {('writer'|'admin')} [author_details.role='writer'] - The role of the new author.
     * @param {?HandleCallback} callback - The callback that handles the response.
     *
     */
    insert_author: function(author_details, callback) {
        if (!(callback instanceof Function)) callback = function() {};

        if (!('role' in author_details)) author_details.role = 'writer';

        if ('name' in author_details && 'avatar' in author_details && 'description' in author_details && 'email' in author_details) {
            this.pool.getConnection(function(err, connection) {
                if (err) {
                    return callback(err);
                }
                connection.query(
                    'INSERT INTO authors (author_avatar, author_description, author_name, author_email, author_role) VALUES(?, ?, ?, ?, ?);', 
                    [author_details.avatar, author_details.description, author_details.name, author_details.email, author_details.role],
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
            callback(new Error('You need to provide all the parameters to insert_author call.'));
        }
    }
}