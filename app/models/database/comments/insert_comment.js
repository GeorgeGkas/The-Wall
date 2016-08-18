module.exports = {
    insert_comment: function(comment_details, callback) {
        if (typeof(callback) === 'undefined') callback = function() {};

        if (comment_details.post_id.trim() != '' && comment_details.author_name.trim() != '' && 'date' in comment_details && comment_details.content.trim() != '' && comment_details.author_email.trim() != '') {
            this.pool.getConnection(function(err, connection) {
                if (err) callback(err);
                connection.query(
                    'INSERT INTO comments (comment_post_ID, comment_author, comment_date, comment_content, comment_author_email) VALUES(?, ?, ?, ?, ?);', [comment_details.post_id, comment_details.author_name, comment_details.date, comment_details.content, comment_details.author_email],
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
            callback(new Error('All fields are required to post a comment.'));
        }

    }
}
