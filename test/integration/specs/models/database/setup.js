import MYSQL from '../../../../../app/models/database/MYSQL';
import CONFIG from '../../../../../app/config/config';

const ENV_VARS = CONFIG.testing;

const mysql = new MYSQL({
  host: ENV_VARS.db.host,
  user: ENV_VARS.db.user,
  password: ENV_VARS.db.password,
  database: ENV_VARS.db.database,
});

export default mysql;
