import { Request, Response } from 'express';
import pool from '../database';

class EventosController {
	public async list(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('SELECT * FROM eventos order by idEvento');
		console.log(respuesta);
		res.json(respuesta);
	}

	public async listOne(req: Request, res: Response): Promise<void> {
		const {idEvento} = req.params;
		let consulta = `SELECT * FROM eventos WHERE idEvento = ${idEvento}`;
		const respuesta = await pool.query(consulta);
		console.log(consulta);

		if (respuesta.length > 0){
			res.json(respuesta[0]);
			return;
		}

		res.status(404).json({'mensaje': 'Evento no encontrado'});
	}

	public async create(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('INSERT INTO eventos SET ?', [req.body]);
		res.json(respuesta);
	}

	public async delete(req: Request, res: Response): Promise<void> {
		const {idEvento} = req.params;
		console.log(idEvento);
		const respuesta = await pool.query(`DELETE FROM eventos WHERE idEvento = ${idEvento}`);
		res.json(respuesta);
	}

	public async update(req: Request, res: Response): Promise<void> {
		const {idEvento} = req.params;
		console.log(idEvento);
		const respuesta = await pool.query("UPDATE eventos SET ? WHERE idEvento = ?", [req.body, idEvento]);
		res.json(respuesta);
	}

	public async listEventosByInstituto(req: Request, res: Response): Promise<void> {
		const {idInstituto} = req.params;
		console.log(idInstituto);
		const respuesta = await pool.query(
			`SELECT *
			 FROM eventos E INNER JOIN profesores P
				 ON E.idProfesor = P.idProfesor
					  AND P.idInstituto = ${idInstituto}`);

		res.json(respuesta);
	}

	public async listEventosByCarrera(req: Request, res: Response): Promise<void> {
		const {idCarrera} = req.params;
		console.log(idCarrera);
		const respuesta = await pool.query(
			`SELECT *
			 FROM eventos E INNER JOIN profesores P
			   ON E.idProfesor = P.idProfesor
				  AND P.idCarrera = ${idCarrera}`);

		res.json(respuesta);
	}

	public async listEventosByProfesor(req: Request, res: Response): Promise<void> {
		const {idProfesor} = req.params;
		console.log(idProfesor);
		const respuesta = await pool.query(
			`SELECT *
			 FROM eventos E INNER JOIN profesores P
				ON E.idProfesor = P.idProfesor
					AND P.idProfesor = ${idProfesor}`);
		
		res.json(respuesta);
	}

	public async listEventosByPeriodo(req: Request, res: Response): Promise<void> {
		const { ini, fin } = req.params;
		console.log(ini, "\n", fin);
		let consulta = `SELECT *
						FROM eventos
						WHERE inicio >= '${ini}' 
							AND fin <= '${fin}'`;
		const respuesta = await pool.query(consulta);

		res.json(respuesta);
	}
}

export const eventosController = new EventosController();