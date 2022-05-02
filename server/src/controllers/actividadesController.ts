import { Request, Response } from 'express';
import pool from '../database';

class ActividadesController {
	public async list(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('SELECT * FROM actividades order by idActividad');
		console.log(respuesta);
		res.json(respuesta);
	}

	public async listOne(req: Request, res: Response): Promise<void> {
		const {idActividad} = req.params;
		let consulta = `SELECT * FROM actividades WHERE idActividad = ${idActividad}`;
		const respuesta = await pool.query(consulta);
		console.log(consulta);

		if (respuesta.length > 0){
			res.json(respuesta[0]);
			return;
		}

		res.status(404).json({'mensaje': 'Actividad no encontrada'});
	}

	public async create(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('INSERT INTO actividades SET ?', [req.body]);
		res.json(respuesta);
	}

	public async delete(req: Request, res: Response): Promise<void> {
		const {idActividad} = req.params;
		console.log(idActividad);
		const respuesta = await pool.query(`DELETE FROM actividades WHERE idActividad = ${idActividad}`);
		res.json(respuesta);
	}

	public async update(req: Request, res: Response): Promise<void> {
		const {idActividad} = req.params;
		console.log(idActividad);
		const respuesta = await pool.query("UPDATE actividades SET ? WHERE idActividad = ?", [req.body, idActividad]);
		res.json(respuesta);
	}

	public async listActividadesByInstituto(req: Request, res: Response): Promise<void> {
		const {idInstituto} = req.params;
		console.log(idInstituto);
		const respuesta = await pool.query(
			`SELECT *
			 FROM actividades A INNER JOIN profesores P
				 ON A.idProfesor = P.idProfesor
					  AND P.idInstituto = ${idInstituto}`);

		res.json(respuesta);
	}

	public async listActividadesByCarrera(req: Request, res: Response): Promise<void> {
		const {idCarrera} = req.params;
		console.log(idCarrera);
		const respuesta = await pool.query(
			`SELECT *
			 FROM actividades A INNER JOIN profesores P
			   ON A.idProfesor = P.idProfesor
				  AND P.idCarrera = ${idCarrera}`);

		res.json(respuesta);
	}

	public async listActividadesByProfesor(req: Request, res: Response): Promise<void> {
		const {idProfesor} = req.params;
		console.log(idProfesor);
		const respuesta = await pool.query(
			`SELECT *
			 FROM actividades A INNER JOIN profesores P
				ON A.idProfesor = P.idProfesor
					AND P.idProfesor = ${idProfesor}`);
		
		res.json(respuesta);
	}

	public async listActividadesByPeriodo(req: Request, res: Response): Promise<void> {
		const { ini, fin } = req.params;
		console.log(ini, "\n", fin);
		let consulta = `SELECT *
						FROM actividades 
						WHERE inicio >= '${ini}' 
							AND fin <= '${fin}'`;
		const respuesta = await pool.query(consulta);

		res.json(respuesta);
	}
}

export const actividadesController = new ActividadesController();