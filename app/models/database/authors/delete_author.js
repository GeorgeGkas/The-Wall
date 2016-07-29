module.exports = {
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
                'DELETE FROM authors WHERE author_name = ?', [author_name],
                function(err, result) {
                    if (err) throw err;
                    console.log('Deleted Author ' + author_name + ' ... nn');
                }
            );
        } else {
            throw new Error('No parameter provided to delete_author call.');
        }
    }
}
