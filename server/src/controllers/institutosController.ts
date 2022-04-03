import {Request, Response} from 'express';
import pool from '../database';

class InstitutosController {
	public async list(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('SELECT * FROM institutos order by idInstituto');
		// console.log(respuesta);
		res.json(respuesta);
	}

	public async listOne(req: Request, res: Response): Promise<void> {
		const {idInstituto} = req.params;
		let consulta = `SELECT * FROM institutos WHERE idInstituto = ${idInstituto}`;
		const respuesta = await pool.query(consulta);
		console.log(consulta);

		if (respuesta.length > 0){
			res.json(respuesta[0]);
			return;
		}

		res.status(404).json({'mensaje': 'Instituto no encontrado'});
	}

	public async create(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('INSERT INTO institutos SET ?', [req.body]);
		res.json(respuesta);
	}

	public async delete(req: Request, res: Response): Promise<void> {
		const {idInstituto} = req.params;
		console.log(idInstituto);
		const respuesta = await pool.query(`DELETE FROM institutos WHERE idInstituto = ${idInstituto}`);
		res.json(respuesta);
	}

	public async update(req: Request, res: Response): Promise<void> {
		const {idInstituto} = req.params;
		console.log(idInstituto);
		const respuesta = await pool.query("UPDATE institutos SET ? WHERE idInstituto = ?", [req.body, idInstituto]);
		res.json(respuesta);
	}

	public async numCarreras(req: Request, res: Response): Promise<void> {
		const {idInstituto} = req.params;
		console.log(idInstituto);
		const respuesta = await pool.query(`SELECT * FROM carreras WHERE idInstituto = ${idInstituto}`);
		res.json(respuesta.length);
	}
}

export const institutosController = new InstitutosController();