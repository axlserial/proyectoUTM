import { Request, Response } from 'express';
import pool from '../database';

class MateriasController {
	public async list(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('SELECT * FROM materias order by idPlan');
		console.log(respuesta);
		res.json(respuesta);
	}

	public async listOne(req: Request, res: Response): Promise<void> {
		const {idMateria} = req.params;
		let consulta = `SELECT * FROM materias WHERE idMateria = ${idMateria}`;
		const respuesta = await pool.query(consulta);
		console.log(consulta);

		if (respuesta.length > 0){
			res.json(respuesta[0]);
			return;
		}

		res.status(404).json({'mensaje': 'Materia no encontrada'});
	}

	public async create(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('INSERT INTO materias SET ?', [req.body]);
		res.json(respuesta);
	}

	public async delete(req: Request, res: Response): Promise<void> {
		const {idMateria} = req.params;
		console.log(idMateria);
		const respuesta = await pool.query(`DELETE FROM materias WHERE idMateria = ${idMateria}`);
		res.json(respuesta);
	}

	public async update(req: Request, res: Response): Promise<void> {
		const {idMateria} = req.params;
		console.log(idMateria);
		const respuesta = await pool.query("UPDATE materias SET ? WHERE idMateria = ?", [req.body, idMateria]);
		res.json(respuesta);
	}

	public async listMateriasByCarrera(req: Request, res: Response): Promise<void> {
		const {idCarrera} = req.params;
		console.log(idCarrera);
		const respuesta = await pool.query(
			`SELECT materias.nombreMateria, planes.nombrePlan
			 FROM materias, planes
			 WHERE planes.idCarrera = ${idCarrera}
			   AND materias.idPlan = planes.idPlan`);
		res.json(respuesta);
	}

	public async listMateriasByCarreraByPlan(req: Request, res: Response): Promise<void> {
		const {idCarrera, idPlan} = req.params;
		console.log(idCarrera, idPlan);
		const respuesta = await pool.query(
			`SELECT materias.nombreMateria
			 FROM materias, planes
			 WHERE materias.idPlan = planes.idPlan
			   AND planes.idPlan = ${idPlan}
			   AND planes.idCarrera = ${idCarrera}`);
		res.json(respuesta);
	}

	public async listMateriasByProfesor(req: Request, res: Response): Promise<void> {
		const {idProfesor} = req.params;
		console.log(idProfesor);
		const respuesta = await pool.query(
			`SELECT materias.nombreMateria, profesorYmateria.grupo, carreras.nombreCarrera, planes.nombrePlan
			 FROM materias, profesores, profesorYmateria, carreras, planes
			 WHERE profesores.idProfesor = ${idProfesor}
			   AND profesores.idProfesor = profesorYmateria.idProfesor
			   AND materias.idMateria = profesorYmateria.idMateria
			   AND profesores.idCarrera = carreras.idCarrera
			   AND carreras.idCarrera = planes.idCarrera`);
		res.json(respuesta);
	}
}

export const materiasController = new MateriasController();