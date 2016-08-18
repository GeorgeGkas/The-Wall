module.exports = {
    delete_comment: function(comment_id, callback) {
        if (typeof(callback) === 'undefined') callback = function() {};

        if (comment_id != null || comment_id != undefined) {
            this.pool.getConnection(function(err, connection) {
                if (err) callback(err);
                connection.query(
                    'DELETE FROM comments WHERE comment_ID = ?', 
                    [comment_id],
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
            callback(new Error('No parameter provided to delete_comment call.'));
        }
    }
}
