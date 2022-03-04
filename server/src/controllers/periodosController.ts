import { Request, Response } from 'express';
import pool from '../database';

class PeriodosController {
	public async list(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('SELECT * FROM periodos order by inicio');
		console.log(respuesta);
		res.json(respuesta);
	}

	public async listOne(req: Request, res: Response): Promise<void> {
		const {idPeriodo} = req.params;
		let consulta = `SELECT * FROM periodos WHERE idPeriodo = ${idPeriodo}`;
		const respuesta = await pool.query(consulta);
		console.log(consulta);

		if (respuesta.length > 0){
			res.json(respuesta[0]);
			return;
		}

		res.status(404).json({'mensaje': 'Periodo no encontrado'});
	}

	public async create(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('INSERT INTO periodos SET ?', [req.body]);
		res.json(respuesta);
	}

	public async delete(req: Request, res: Response): Promise<void> {
		const {idPeriodo} = req.params;
		console.log(idPeriodo);
		const respuesta = await pool.query(`DELETE FROM periodos WHERE idPeriodo = ${idPeriodo}`);
		res.json(respuesta);
	}

	public async update(req: Request, res: Response): Promise<void> {
		const {idPeriodo} = req.params;
		console.log(idPeriodo);
		const respuesta = await pool.query("UPDATE periodos SET ? WHERE idPeriodo = ?", [req.body, idPeriodo]);
		res.json(respuesta);
	}
}

export const periodosController = new PeriodosController();