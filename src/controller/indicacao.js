const db = require("../db/main");
const empresaModel = require("../models/indicacao");

const { getAllIndicacao } = require("../db/indicacaoQueries");

const functions = {
	async create(req, res) {
		try {
			const newEmpresa = new empresaModel(req.body);
			const result = await db.query(create, [
				newEmpresa.nome,
				newEmpresa.latitude,
				newEmpresa.longitude,
			]);
			if (req.body.empresaindicadora && result.rows[0]) {
				await db.query(createIndicacao, [
					result.rows[0].id,
					req.body.empresaindicadora,
				]);
				res.status(200).json({
					message: "Empresa cadastrada com sucesso",
				});
			} else {
				res.status(204).send({});
			}
		} catch (err) {
			res.status(400).send("Erro ao cadastrar empresa");
		}
	},

	async update(req, res) {
		try {
			const updateEmpresa = new empresaModel({
				...req.body,
				id: req.params.id,
			});

			const result = await db.query(update, [
				updateEmpresa.id,
				updateEmpresa.nome,
				updateEmpresa.latitude,
				updateEmpresa.longitude,
			]);
			if (result) {
				res.status(200).json({
					message: "Empresa cadastrada com sucesso",
				});
			} else {
				res.status(204).send({});
			}
		} catch (err) {
			res.status(400).send("Erro ao cadastrar empresa");
		}
	},

	async getAll(req, res) {
		const results = await db.query(getAllIndicacao);
		if (results.rowCount > 0) {
			res.status(200).json(results.rows);
		} else {
			res.status(204).send({});
		}
	},

	async getOne(req, res) {
		const result = await db.query(findOne, [req.params.id]);
		if (result.rowCount > 0) {
			const row = new empresaModel(result.rows[0]);
			res.status(200).json(row);
		} else {
			res.status(204).send({});
		}
	},

	async delete(req, res) {
		const result = await db.query(deleteEmpresa, [req.params.id]);
		if (result.rowCount > 0) {
			const row = new empresaModel(result.rows[0]);
			res.status(200).json({ message: "Empresa removida com sucesso" });
		} else {
			res.status(204).send({});
		}
	},

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
