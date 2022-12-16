const db = require("../db/main");
const empresaModel = require("../models/empresa");

const {
	update,
	create,
	deleteEmpresa,
	verifyIfExists,
	setimovelindicador,
	findAll,
	findOne,
} = require("../db/empresaQueries");

const { createIndicacao, deleteIndicacoes } = require("../db/indicacaoQueries");

const functions = {
	async create(req, res) {
		try {
			const newEmpresa = new empresaModel(req.body);

			const exists = await db.query(verifyIfExists, [newEmpresa.nome]);
			if (exists.rowCount === 0) {
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
					await db.query(setimovelindicador, [
						result.rows[0].id,
						req.body.empresaindicadora,
					]);
					res.status(200).json({
						message: "Empresa cadastrada com sucesso",
					});
				} else {
					res.status(200).json({
						message: "Empresa cadastrada com sucesso",
					});
				}
			} else {
				res.status(400).send("Empresa já cadastrada!");
			}
		} catch (err) {
			res.status(400).json({ message: "Erro ao editar empresa" });
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
					message: "Empresa editada com sucesso",
				});
			} else {
				res.status(204).send({});
			}
		} catch (err) {
			res.status(400).json({ message: "Erro ao editar empresa" });
		}
	},

	async getAll(req, res) {
		const results = await db.query(findAll);
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
		const deletedIndicacoes = await db.query(deleteIndicacoes, [
			req.params.id,
		]);

		const result = await db.query(deleteEmpresa, [req.params.id]);
		if (result.rowCount > 0) {
			res.status(200).json({ message: "Empresa removida com sucesso" });
		} else {
			res.status(204).send({});
		}
	},

	async returnAll() {
		const results = await db.query(findAll);
		if (results.rowCount > 0) {
			return results.rows;
		} else {
			return [];
		}
	},
};

module.exports = functions;
