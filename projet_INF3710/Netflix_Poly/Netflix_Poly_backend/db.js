const { Pool } = require('pg');

const conString = "postgresql://netflixiuser:netflixi123@localhost:5432/netflixidb";
//const conString = "postgresql://netflixiuser1:netflixi123@localhost:5432/netflixidb";
const pool = new Pool({ connectionString: conString });
module.exports = {
    query: (text, params) => pool.query(text, params)
}