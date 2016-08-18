module.exports = {
    insert_author: function(author_details, callback) {
        if (typeof(callback) === 'undefined') callback = function() {};

        if ('name' in author_details && 'avatar' in author_details && 'description' in author_details && 'email' in author_details) {
            this.pool.getConnection(function(err, connection) {
                if (err) callback(err);
                connection.query(
                    'INSERT INTO authors (author_avatar, author_description, author_name, author_email) VALUES(?, ?, ?, ?);', 
                    [author_details.avatar, author_details.description, author_details.name, author_details.email],
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
