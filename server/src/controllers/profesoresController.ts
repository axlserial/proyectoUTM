import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs'
import pool from '../database';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

class ProfesoresController {

	constructor(){
		dotenv.config();
	}

	public async list(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('SELECT * FROM profesores order by idTipoProfesor');
		console.log(respuesta);
		res.json(respuesta);
	}

	public async listOne(req: Request, res: Response): Promise<void> {
		console.log("Entro list one:", req.params);
		const {idProfesor} = req.params;
		let consulta = `SELECT * FROM profesores WHERE idProfesor = ${idProfesor}`;
		const respuesta = await pool.query(consulta);
		console.log(consulta);

		if (respuesta.length > 0){
			res.json(respuesta[0]);
			return;
		}

		res.status(404).json({'mensaje': 'Profesor no encontrado'});
	}

	public async create(req: Request, res: Response): Promise<void> {
		let password = req.body.password as any;
		let salt = bcrypt.genSaltSync(10);
		bcrypt.hash(password, salt).then((nuevoPassword) => {
			req.body.password = nuevoPassword;
			const resp = pool.query("INSERT INTO profesores SET ?", [req.body]);
			res.json(resp);
		});
	}

	public async existe(req: Request, res: Response): Promise<void> {
		const {correo} = req.params;
		let password = req.body.password as any;
		let token: string;
		let consulta =  `SELECT idProfesor, password FROM profesores WHERE correoProfesor = '${correo}'`;
		const respuesta = await pool.query(consulta);
		if (respuesta.length > 0){
			bcrypt.compare(password, respuesta[0].password, (err, resEncriptar) => {
				if (resEncriptar == true){
					token = jwt.sign(correo, process.env.TOKEN_SECRET || 'prueba');
					console.log(process.env.TOKEN_SECRET);
					res.json({"token": token, "idProfesor": respuesta[0].idProfesor});
				} else {
					res.json(-1);
				}
				return;
			});
		} else {
			res.json(-1);
		}
	}

	public async delete(req: Request, res: Response): Promise<void> {
		const {idProfesor} = req.params;
		console.log(idProfesor);
		const respuesta = await pool.query(`DELETE FROM profesores WHERE idProfesor = ${idProfesor}`);
		res.json(respuesta);
	}

	public async update(req: Request, res: Response): Promise<void> {
		const {idProfesor} = req.params;
		console.log(idProfesor);
		const respuesta = await pool.query("UPDATE profesores SET ? WHERE idProfesor = ?", [req.body, idProfesor]);
		res.json(respuesta);
	}

	public async listProfesoresByCarrera(req: Request, res: Response): Promise<void> {
		const {idCarrera} = req.params;
		console.log(idCarrera);
		const respuesta = await pool.query(`SELECT nombres, apellidoPaterno, apellidoMaterno FROM profesores WHERE idCarrera = ${idCarrera}`);
		res.json(respuesta);
	}

	public async listProfesoresByInstituto(req: Request, res: Response): Promise<void> {
		const {idInstituto} = req.params;
		console.log("idInstituto:", idInstituto);
		const respuesta = await pool.query(`SELECT nombres, apellidoPaterno, apellidoMaterno FROM profesores WHERE idInstituto = ${idInstituto}`);
		res.json(respuesta);
	}

	public async listProfesoresByArticulo(req: Request, res: Response): Promise<void> {
		const {idArticulo} = req.params;
		console.log(idArticulo);
		const respuesta = await pool.query(
			`SELECT profesores.nombres, profesores.apellidoPaterno, profesores.apellidoMaterno
			 FROM articuloYprofesor, profesores
			 WHERE articuloYprofesor.idArticulo = ${idArticulo}
			   AND articuloYprofesor.idProfesor = profesores.idProfesor`);
		res.json(respuesta);
	}

	public async listTipoProfesor(req: Request, res: Response): Promise<void> {
		console.log("Entro tipo");
		const respuesta = await pool.query("SELECT * FROM `tipoProfesor` ORDER BY idTipoProfesor");
		res.json(respuesta);
	}

	public async actualizaPassword(req: Request, res: Response): Promise<void> {
		const {idProfesor} = req.params;
		let password = req.body.password as any;
		let salt = bcrypt.genSaltSync(10);
		console.log("idprofesor:", idProfesor, "\tpassword:", password);
		bcrypt.hash(password, salt).then((nuevoPassword) => {
			let consulta = `UPDATE profesores SET password = '${nuevoPassword}' WHERE idProfesor = ${idProfesor}`;
			const respuesta = pool.query(consulta);
			res.json(respuesta);
		});
	}
}

export const profesoresController = new ProfesoresController();