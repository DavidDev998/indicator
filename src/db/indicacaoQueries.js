module.exports = {
	createIndicacao: `INSERT INTO indicacao(empresa,empresaindicadora) VALUES($1,$2);`,
	getAllIndicacao: `SELECT id,empresa,empresaindicadora FROM indicacao;`,
	deleteIndicacoes: `DELETE FROM indicacao WHERE empresaindicadora=$1 OR empresa=$1`,
};
