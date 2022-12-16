module.exports = {
	createIndicacao: `INSERT INTO indicacao(empresa,empresaindicadora) VALUES($1,$2);`,
	getAllIndicacao: `SELECT id,empresa,empresaindicadora FROM indicacao;`,
};
