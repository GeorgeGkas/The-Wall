module.exports = {
    insert_author: function(author_details) {
        this.conn.query(
            'INSERT INTO authors (author_avatar, author_description, author_name) VALUES(?, ?, ?);', 
            [author_details.avatar, author_details.description, author_details.name],
            function(err, result) {
                if (err) throw err;
                console.log('Created Author ' + author_details.name + ' ... nn');
            }
        );
    },

    select_author: function(query, callback) {
        if (query == 'all') {
            this.conn.query(
                'SELECT * FROM  authors',
                function(err, result) {
                    if (err) throw err;
                    else callback(result);
                }
            );
        } else if (query != null || query != undefined) {
            this.conn.query(
                query,
                function(err, result) {
                    if (err) throw err;
                    else callback(result);
                }
            );
        } else {
            console.log('No parameter provided to select_author call ... nn');
        }
    },

    update_author: function(author_details) {
        if ('newAvatar' in author_details) {
            this.conn.query(
                'UPDATE  authors SET author_avatar = ? WHERE author_name = ?', 
                [author_details.newAvatar, author_details.name],
                function(err, result) {
                    if (err) throw err;
                    console.log("Update author's avatar to " + author_details.newAvatar);
                }
            );
        }

        if ('newDescription' in author_details) {
            this.conn.query(
                'UPDATE  authors SET author_description = ? WHERE author_name = ?', 
                [author_details.newDescription, author_details.name],
                function(err, result) {
                    if (err) throw err;
                    console.log("Update author's description to " + author_details.newDescription);
                }
            );
        }

        if ('newName' in author_details) {
            this.conn.query(
                'UPDATE  authors SET author_name = ? WHERE author_name = ?', 
                [author_details.newName, author_details.name],
                function(err, result) {
                    if (err) throw err;
                    console.log("Update author's name to " + author_details.newName);
                }
            );
        }
    },

    delete_author: function(author_name) {
        if (author_name == 'all') {
            this.conn.query(
                'DELETE FROM authors',
                function(err, result) {
                    if (err) throw err;
                    console.log('All the authors deleted ... nn');
                }
            );
        } else if (author_name != null || author_name != undefined) {
            this.conn.query(
                'DELETE FROM authors WHERE author_name = ?', 
                [author_name],
                function(err, result) {
                    if (err) throw err;
                    console.log('Deleted Author ' + author_name + ' ... nn');
                }
            );
        } else {
            console.log('No parameter provided to delete_author call ... nn');
        }
    }
}
