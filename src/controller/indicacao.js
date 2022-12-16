const db = require("../db/main");
const empresaModel = require("../models/indicacao");

const { getAllIndicacao } = require("../db/indicacaoQueries");

const functions = {
	async returnAll() {
		const results = await db.query(getAllIndicacao);
		if (results.rowCount > 0) {
			return results.rows;
		} else {
			return [];
		}
	},
};

module.exports = functions;
