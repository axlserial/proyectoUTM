import { Request, Response } from 'express';
import pool from '../database';

class ArchivoYArticuloController {
	public async create(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('INSERT INTO archivoYarticulo SET ?', [req.body]);
		console.log(respuesta);
		res.json(respuesta);
	}

	public async delete(req: Request, res: Response): Promise<void> {
		const {idArchivoYArticulo} = req.params;
		console.log(idArchivoYArticulo);
		const respuesta = await pool.query(`DELETE FROM archivoYarticulo WHERE idArchivoYArticulo = ${idArchivoYArticulo}`);
		res.json(respuesta);
	}

	public async listArchivosByArticulo(req: Request, res: Response): Promise<void> {
		const { idArticulo } = req.params;
		let consulta = `SELECT * FROM archivoYarticulo WHERE idArticulo = ${idArticulo}`;
		const respuesta = await pool.query(consulta);
		res.json(respuesta);
	}
}

export const archivoYArticuloController = new ArchivoYArticuloController();