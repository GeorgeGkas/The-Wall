module.exports = {
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
                if (err) callback(err);
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
