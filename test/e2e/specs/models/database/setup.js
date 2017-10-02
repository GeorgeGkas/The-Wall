import MYSQL_db from '../../../../../app/models/database/MYSQL';
import CONFIG from '../../../../../app/config/config';

process.env.NODE_ENV = 'testing';
const ENV = process.env.NODE_ENV || 'development';
const ENV_VARS = CONFIG[ENV];

const mysql = new MYSQL_db({
  host: ENV_VARS.db.host,
  user: ENV_VARS.db.user,
  password: ENV_VARS.db.password,
  database: ENV_VARS.db.database,
});

export default mysql;
