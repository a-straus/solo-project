const { Pool, Client } = require('pg');

const PG_URI =
  'postgres://xsumydrg:fiu1-2cbyD-COX27ystpe5aItlbwcekf@drona.db.elephantsql.com:5432/xsumydrg';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
