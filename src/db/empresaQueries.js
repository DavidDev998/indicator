module.exports = {
	findAll: `SELECT empresa.id,empresa.nome,latitude,longitude,count(indicacao.empresaindicadora) as indicacoes FROM empresa
	LEFT JOIN indicacao on empresa.id=indicacao.empresaindicadora
	GROUP BY indicacao.empresaindicadora,empresa.id
	ORDER BY empresa.nome;`,

	verifyIfExists: "SELECT id FROM empresa WHERE nome=$1;",

	findOne: `SELECT empresa.id,empresa.nome,latitude,longitude,count(indicacao.empresaindicadora) as indicacoes FROM empresa
	LEFT JOIN indicacao on empresa.id=indicacao.empresaindicadora
	WHERE empresa.id=$1
	GROUP BY indicacao.empresaindicadora,empresa.id
	ORDER BY empresa.nome;`,

	create: `INSERT INTO empresa(nome,latitude,longitude) VALUES($1,$2,$3) RETURNING id;`,

	update: `UPDATE empresa
	SET nome=$2,latitude=$3,longitude=$4
	WHERE id=$1`,

	deleteEmpresa: `DELETE FROM empresa WHERE id=$1;`,
};
