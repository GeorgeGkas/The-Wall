module.exports = {
    insert_author: function(author_details, callback) {
        if (typeof(callback)==='undefined') callback = function() {};

        if ('name' in author_details && 'avatar' in author_details && 'description' in author_details) {
            this.conn.query(
                'INSERT INTO authors (author_avatar, author_description, author_name) VALUES(?, ?, ?);', 
                [author_details.avatar, author_details.description, author_details.name],
                function(err, result) {
                    if (err) throw err;
                    console.log('Created Author ' + author_details.name + ' ... nn');
                    callback();
                }
            );
        } else {
            throw new Error('You need to provide all the parameters to insert_author call.');
        }
    }
}
