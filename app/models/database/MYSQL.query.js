module.exports = {
    /** 
     * Run a custom query.
     * @method query
     * @memberof MYSQL#
     * @param {!string} query - The query to run.
     * @param {?HandleCallback} callback - The callback that handles the response.
     *
     */
    query: function(query, callback) {
        if (typeof(callback) === 'undefined') callback = function() {};

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
