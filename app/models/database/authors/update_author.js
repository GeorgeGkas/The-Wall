module.exports = {
    update_author: function(author_details, callback) {

        if (typeof(callback)==='undefined') callback = function() {};

        if (author_details == undefined || !('newName' in author_details) && !('newDescription' in author_details) && !('newAvatar' in author_details)) {
            throw new Error('Empty parameter provided. Can not change anything.');
        } else if (!('email' in author_details)) {
            throw new Error("Please provide the author's email whose informations will be change.");
        }

        if ('newAvatar' in author_details) {
            this.conn.query(
                'UPDATE  authors SET author_avatar = ? WHERE author_email = ?', [author_details.newAvatar, author_details.email],
                function(err, result) {
                    if (err) throw err;
                }
            );
        }

        if ('newDescription' in author_details) {
            this.conn.query(
                'UPDATE  authors SET author_description = ? WHERE author_email = ?', [author_details.newDescription, author_details.email],
                function(err, result) {
                    if (err) throw err;
                }
            );
        }

        if ('newName' in author_details) {
            this.conn.query(
                'UPDATE  authors SET author_name = ? WHERE author_email = ?', [author_details.newName, author_details.email],
                function(err, result) {
                    if (err) throw err;
                }
            );
        }

        callback();

    }
}
