'use strict';
var mysql = require('mysql');
class MYSQL {
    constructor(connection_details) {
        this.conn = mysql.createConnection({
            host: connection_details.host,
            user: connection_details.user,
            password: connection_details.password,
            database: connection_details.database
        });
    }

    connect() {
        this.conn.connect();
    }

    end() {
        this.conn.end();
    }

    insert_author() {

    }

    select_author() {

    }

    update_author() {

    }

    delete_author() {
        
    }
}


module.exports = MYSQL;