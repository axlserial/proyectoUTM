import { Request, Response } from 'express';
import pool from '../database';

class ArticulosController {
	public async list(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('SELECT * FROM articulos order by idArticulo');
		console.log(respuesta);
		res.json(respuesta);
	}

	public async listOne(req: Request, res: Response): Promise<void> {
		const {idArticulo} = req.params;
		let consulta = `SELECT * FROM articulos WHERE idArticulo = ${idArticulo}`;
		const respuesta = await pool.query(consulta);
		console.log(consulta);

		if (respuesta.length > 0){
			res.json(respuesta[0]);
			return;
		}

		res.status(404).json({'mensaje': 'Articulo no encontrado'});
	}

	public async create(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('INSERT INTO articulos SET ?', [req.body]);
		res.json(respuesta);
	}

	public async delete(req: Request, res: Response): Promise<void> {
		const {idArticulo} = req.params;
		console.log(idArticulo);
		const respuesta = await pool.query(`DELETE FROM articulos WHERE idArticulo = ${idArticulo}`);
		res.json(respuesta);
	}

	public async update(req: Request, res: Response): Promise<void> {
		const {idArticulo} = req.params;
		console.log(idArticulo);
		const respuesta = await pool.query("UPDATE articulos SET ? WHERE idArticulo = ?", [req.body, idArticulo]);
		res.json(respuesta);
	}

	public async listArticulosByCarrera(req: Request, res: Response): Promise<void> {
		const {idCarrera} = req.params;
		console.log(idCarrera);
		const respuesta = await pool.query(
			`SELECT DISTINCT articulos.nombreArticulo
			 FROM profesores, articuloYprofesor, articulos
			 WHERE profesores.idCarrera = ${idCarrera}
			   AND profesores.idProfesor = articuloYprofesor.idProfesor
			   AND articuloYprofesor.idArticulo = articulos.idArticulo`);
		res.json(respuesta);
	}

	public async listArticulosByProfesor(req: Request, res: Response): Promise<void> {
		const {idProfesor} = req.params;
		console.log(idProfesor);
		const respuesta = await pool.query(
			`SELECT *
			 FROM articulos A 
			 	INNER JOIN articuloYprofesor AYP 
			 		ON A.idArticulo = AYP.idArticulo 
				   	   AND AYP.idProfesor = ${idProfesor}
				INNER JOIN profesores P
					ON AYP.idProfesor = P.idProfesor`);
		
		res.json(respuesta);
	}

	public async listArticulosByPeriodo(req: Request, res: Response): Promise<void> {
		const { ini, fin } = req.params;
		console.log(ini, "\n", fin);
		let consulta = `SELECT *
						FROM articulos 
						WHERE fechaedicion >= '${ini}' 
							AND fechaedicion <= '${fin}'`;
		const respuesta = await pool.query(consulta);

		res.json(respuesta);
	}
}

export const articulosController = new ArticulosController();