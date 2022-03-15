import { Request, Response } from 'express';
import pool from '../database';

class CarrerasController {
	public async list(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('SELECT * FROM carreras order by codigoCarrera');
		console.log(respuesta);
		res.json(respuesta);
	}

	public async listOne(req: Request, res: Response): Promise<void> {
		const {idCarrera} = req.params;
		let consulta = `SELECT * FROM carreras WHERE idCarrera = ${idCarrera}`;
		const respuesta = await pool.query(consulta);
		console.log(consulta);

		if (respuesta.length > 0){
			res.json(respuesta[0]);
			return;
		}

		res.status(404).json({'mensaje': 'Carrera no encontrada'});
	}

	public async create(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('INSERT INTO carreras SET ?', [req.body]);
		res.json(respuesta);
	}

	public async delete(req: Request, res: Response): Promise<void> {
		const {idCarrera} = req.params;
		console.log(idCarrera);
		const respuesta = await pool.query(`DELETE FROM carreras WHERE idCarrera = ${idCarrera}`);
		res.json(respuesta);
	}

	public async update(req: Request, res: Response): Promise<void> {
		const {idCarrera} = req.params;
		console.log(idCarrera);
		const respuesta = await pool.query("UPDATE carreras SET ? WHERE idCarrera = ?", [req.body, idCarrera]);
		res.json(respuesta);
	}

	public async listCarrerasbyInstituto(req: Request, res: Response): Promise<void> {
		const {idInstituto} = req.params;
		console.log("Carreras entro:", idInstituto);
		const respuesta = await pool.query(`SELECT nombreCarrera FROM carreras WHERE idInstituto = ${idInstituto}`);
		res.json(respuesta);
	}

}

export const carrerasController = new CarrerasController();