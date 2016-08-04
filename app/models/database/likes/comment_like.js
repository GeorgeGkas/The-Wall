module.exports = {
    comment_like: function(comment_id, callback) {
        if (typeof(callback) === 'undefined') callback = function() {};

        if (comment_id != null || comment_id != undefined) {
            this.pool.getConnection(function(err, connection) {
                connection.query(
                    'UPDATE comments SET `comment_like_count` = `comment_like_count` + 1 WHERE comment_ID = ?', 
                    [comment_id],
                    function(err, result) {
                        if (err) throw err;
                        connection.release();
                        callback(result);

                    });
            });

        } else {
            throw new Error('Wrong comment_id provided to comment_like call.');
        }

    }
}
