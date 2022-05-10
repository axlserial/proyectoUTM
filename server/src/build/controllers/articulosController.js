"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.articulosController = void 0;
const database_1 = __importDefault(require("../database"));
class ArticulosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM articulos order by idArticulo');
            console.log(respuesta);
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idArticulo } = req.params;
            let consulta = `SELECT * FROM articulos WHERE idArticulo = ${idArticulo}`;
            const respuesta = yield database_1.default.query(consulta);
            console.log(consulta);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Articulo no encontrado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProfesor } = req.params;
            const respuesta = yield database_1.default.query('INSERT INTO articulos SET ?', [req.body]);
            let dato = {
                "idProfesor": idProfesor,
                "idArticulo": respuesta.insertId,
                "posicion": 1,
                "validado": 1
            };
            const resArticulo = yield database_1.default.query("INSERT INTO articuloYprofesor SET ?", [dato]);
            console.log(resArticulo);
            res.json(resArticulo);
        });
    }
    createMigrar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('INSERT INTO articulos SET ?', [req.body.articulo]);
            let datos = req.body.datosAut;
            let resArticulo;
            for (let i = 0; i < datos.autores.length; i++) {
                let dato = {
                    "idProfesor": datos.autores[i],
                    "idArticulo": respuesta.insertId,
                    "posicion": datos.posicion[i],
                    "validado": datos.validado
                };
                resArticulo = yield database_1.default.query("INSERT INTO articuloYprofesor SET ?", [dato]);
            }
            res.json(resArticulo);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idArticulo } = req.params;
            console.log(idArticulo);
            const respuesta = yield database_1.default.query(`DELETE FROM articulos WHERE idArticulo = ${idArticulo}`);
            res.json(respuesta);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idArticulo } = req.params;
            console.log(idArticulo);
            const respuesta = yield database_1.default.query("UPDATE articulos SET ? WHERE idArticulo = ?", [req.body, idArticulo]);
            res.json(respuesta);
        });
    }
    listArticulosByInstituto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idInstituto } = req.params;
            console.log(idInstituto);
            const respuesta = yield database_1.default.query(`SELECT *
			 FROM articulos A 
				INNER JOIN articuloYprofesor AYP 
					ON A.idArticulo = AYP.idArticulo
			   	INNER JOIN profesores P
				   ON AYP.idProfesor = P.idProfesor
					  AND P.idInstituto = ${idInstituto}`);
            res.json(respuesta);
        });
    }
    listFirstsArticulosByInstituto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idInstituto } = req.params;
            console.log(idInstituto);
            const respuesta = yield database_1.default.query(`SELECT *
			 FROM articulos A INNER JOIN articuloYprofesor AYP 
					ON A.idArticulo = AYP.idArticulo
					  AND AYP.posicion = 1	
			   	INNER JOIN profesores P
				   ON AYP.idProfesor = P.idProfesor
					  AND P.idInstituto = ${idInstituto}`);
            res.json(respuesta);
        });
    }
    listFirstsArtWithAutoresByInstituto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idInstituto } = req.params;
            const respuesta = yield database_1.default.query(`SELECT *
			 FROM articulos A INNER JOIN articuloYprofesor AYP 
					ON A.idArticulo = AYP.idArticulo
					  AND AYP.posicion = 1	
			   	INNER JOIN profesores P
				   ON AYP.idProfesor = P.idProfesor
					  AND P.idInstituto = ${idInstituto}`);
            let datos = [];
            for (let i = 0; i < respuesta.length; i++) {
                const respuesta2 = yield database_1.default.query(`SELECT profesores.*
				 FROM articuloYprofesor, profesores
				 WHERE articuloYprofesor.idArticulo = ${respuesta[i].idArticulo}
				 	AND articuloYprofesor.idProfesor = profesores.idProfesor
					AND profesores.idProfesor <> ${respuesta[i].idProfesor}`);
                datos.push({
                    "articulo": respuesta[i],
                    "autores": respuesta2
                });
            }
            res.json(datos);
        });
    }
    listArticulosByCarrera(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCarrera } = req.params;
            console.log(idCarrera);
            const respuesta = yield database_1.default.query(`SELECT DISTINCT articulos.nombreArticulo
			 FROM profesores, articuloYprofesor, articulos
			 WHERE profesores.idCarrera = ${idCarrera}
			   AND profesores.idProfesor = articuloYprofesor.idProfesor
			   AND articuloYprofesor.idArticulo = articulos.idArticulo`);
            res.json(respuesta);
        });
    }
    listArticulosByProfesor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProfesor } = req.params;
            console.log(idProfesor);
            const respuesta = yield database_1.default.query(`SELECT *
			 FROM articulos A 
			 	INNER JOIN articuloYprofesor AYP 
			 		ON A.idArticulo = AYP.idArticulo 
				   	   AND AYP.idProfesor = ${idProfesor}
				INNER JOIN profesores P
					ON AYP.idProfesor = P.idProfesor`);
            res.json(respuesta);
        });
    }
    listArchivosByArticulo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idArticulo } = req.params;
            console.log(idArticulo);
            const respuesta = yield database_1.default.query(`SELECT *
			 FROM archivoYarticulos A 
			 	INNER JOIN articuloYprofesor AYP 
			 		ON A.idArticulo = AYP.idArticulo 
				   	   AND AYP.idArticulo = ${idArticulo}
				INNER JOIN profesores P
					ON AYP.idProfesor = P.idProfesor`);
            res.json(respuesta);
        });
    }
    listArticulosByPeriodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ini, fin } = req.params;
            console.log(ini, "\n", fin);
            let consulta = `SELECT *
						FROM articulos 
						WHERE fechaedicion >= '${ini}' 
							AND fechaedicion <= '${fin}'`;
            const respuesta = yield database_1.default.query(consulta);
            res.json(respuesta);
        });
    }
}
exports.articulosController = new ArticulosController();
