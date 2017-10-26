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
     * @param {('writer'|'admin')} - The role of the new author.
     * @param {?HandleCallback} callback - The callback that handles the response.
     *
     */
    insert_author: function(author_details, callback) {
        if (!(callback instanceof Function)) callback = function() {};

        if (!author_details.hasOwnProperty('name') ||
            !author_details.hasOwnProperty('email') ||
            !author_details.hasOwnProperty('avatar') ||
            !author_details.hasOwnProperty('description') ||
            !author_details.hasOwnProperty('role')) {
            return callback(new Error('You need to provide all the parameters to insert_author call.'));
        }

        var emailReg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!emailReg.test(author_details.email)) {
            return callback(new Error('Email format is not valid.'));
        }

        if (author_details.role != 'writer' && author_details.role != 'admin') {
            return callback(new Error('Role property should be either `writer` or `admin`.'));
        }

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

    }
}
