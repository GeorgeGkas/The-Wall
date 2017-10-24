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
        if (!(callback instanceof Function)) callback = function() {};

        if (!author_details.hasOwnProperty('email')) {
            return callback(new Error("Please provide the author's email whose informations will be change."));
        }

        var emailReg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!emailReg.test(author_details.email)) {
            return callback(new Error('Email format is not valid.'));
        }

        if (!author_details.hasOwnProperty('newName') &&
            !author_details.hasOwnProperty('newDescription') &&
            !author_details.hasOwnProperty('newAvatar') &&
            !author_details.hasOwnProperty('newRole')) {
            return callback(new Error('Empty parameter provided. Can not change anything.'));
        }

        if (author_details.hasOwnProperty('newRole') && author_details.newRole != 'admin' && author_details.newRole != 'writer') {
            return callback(new Error('Author\'s new role must be set to either `admin` or `writer`.'));
        }

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
