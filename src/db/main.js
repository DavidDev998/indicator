const Pool = require("pg").Pool;
const pool = new Pool({
	user: "david.junior",
	host: "localhost",
	database: "indicator",
	password: "",
	port: 5432,
});
module.exports = pool;
