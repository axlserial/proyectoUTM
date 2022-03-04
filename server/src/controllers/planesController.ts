import { Request, Response } from 'express';
import pool from '../database';

class PlanesController {
	public async list(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('SELECT * FROM planes order by idPlan');
		console.log(respuesta);
		res.json(respuesta);
	}

	public async listOne(req: Request, res: Response): Promise<void> {
		const {idPlan} = req.params;
		let consulta = `SELECT * FROM planes WHERE idPlan = ${idPlan}`;
		const respuesta = await pool.query(consulta);
		console.log(consulta);

		if (respuesta.length > 0){
			res.json(respuesta[0]);
			return;
		}

		res.status(404).json({'mensaje': 'Plan no encontrado'});
	}

	public async create(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('INSERT INTO planes SET ?', [req.body]);
		res.json(respuesta);
	}

	public async delete(req: Request, res: Response): Promise<void> {
		const {idPlan} = req.params;
		console.log(idPlan);
		const respuesta = await pool.query(`DELETE FROM planes WHERE idPlan = ${idPlan}`);
		res.json(respuesta);
	}

	public async update(req: Request, res: Response): Promise<void> {
		const {idPlan} = req.params;
		console.log(idPlan);
		const respuesta = await pool.query("UPDATE planes SET ? WHERE idPlan = ?", [req.body, idPlan]);
		res.json(respuesta);
	}

	public async listPlanesByCarrera(req: Request, res: Response): Promise<void> {
		const {idCarrera} = req.params;
		console.log(idCarrera);
		const respuesta = await pool.query(`SELECT nombrePlan FROM planes WHERE idCarrera = ${idCarrera}`);
		res.json(respuesta);
	}
}

export const planesController = new PlanesController();