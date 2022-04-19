import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from "./database";
import fs from "fs";
const correoAcceso = require('./correoAcceso');

class Server {
	public app: Application;

	constructor() {
		dotenv.config();
		this.app = express();
		this.config();
		this.routes();
	}
	
	config(): void {
		this.app.use(express.urlencoded({
			limit: '50mb', parameterLimit: 100000, extended:
				false
		}));
		this.app.use(express.json({ limit: '50mb' }));
		this.app.set('port', process.env.PORT || 3001);
		this.app.use(morgan('dev'));
		this.app.use(cors());
		this.app.use(express.urlencoded({ extended: false }));
	}
	
	routes(): void {

		this.app.post('/enviarCorreoRecuperarContrasenya', (req, res) => {
			console.log(req.body);
			correoAcceso(req.body);
		});

		this.app.post('/decodificarMail', async (req, res) => {
			let decodificado;
			console.log("body:", req.body);
			try {
				decodificado = jwt.verify(req.body.token, process.env.TOKEN_SECRET || 'prueba');
				console.log("decodificado:", decodificado);
				const result1 = await this.queryProfesor(decodificado) as any;
				if (result1.length == 0)
					res.json(0);
				else
					res.json(result1[0]);
			}
			catch (err) { res.json(0); }
		});
		
        this.app.post('/guardar-archivo', async (req, res) => {
			console.log("/guardar-archivo");
			let type: string = req.body.type.split("/")[1];

			let icono = "";
			switch(type){
				case "pdf":
					icono = "PDF"; 
					break;
				case "docx":
					icono = "WORD";
					break;
				case "jpg":
					icono = "IMG";
					break;
			}

			let dato = {
				"idArticulo": req.body.idArticulo,
				"icono": icono,
				"extension": type
			};

			// agregar lo que falta para poder obtener ID de la consulta para el archivo

			// await pool.query("INSERT INTO archivoYarticulo SET ?", [dato]);
			const letras = ['a', 'b', 'c', 'd', 'e', 'f'];
			const file = req.body.src;
			const name = req.body.idArticulo;
			const index = req.body.index;
			const binaryData = Buffer.from(file.replace(/^data:.*,/, ""), 'base64');

			fs.writeFile(`${__dirname}/img/pdf/${name}_${letras[index]}.pdf`, binaryData, "base64", (err) => {
				console.log(err);
			});

			res.json({ fileName: name + '.pdf' });
        });
	}
	
	queryProfesor = (decodificado: any) => {
		return new Promise((resolve, reject) => {
			let consulta = 'SELECT * FROM profesores WHERE 	correoProfesor="' + decodificado + '"';
			pool.query(consulta, (error: any, results: any) => {
				if (error)
					return reject(error);
				return resolve(results);
			});
		});
	};
	
	start() {
		this.app.listen(this.app.get('port'), () => {
			console.log(`Listening on port ${this.app.get('port')}`);
		});
	}
}

const server = new Server();
server.start();