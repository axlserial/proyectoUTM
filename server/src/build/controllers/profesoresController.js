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
exports.profesoresController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = __importDefault(require("../database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
class ProfesoresController {
    constructor() {
        dotenv_1.default.config();
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM profesores order by idTipoProfesor');
            console.log(respuesta);
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Entro list one:", req.params);
            const { idProfesor } = req.params;
            let consulta = `SELECT * FROM profesores WHERE idProfesor = ${idProfesor}`;
            const respuesta = yield database_1.default.query(consulta);
            console.log(consulta);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Profesor no encontrado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let password = req.body.password;
            let salt = bcryptjs_1.default.genSaltSync(10);
            bcryptjs_1.default.hash(password, salt).then((nuevoPassword) => {
                req.body.password = nuevoPassword;
                const resp = database_1.default.query("INSERT INTO profesores SET ?", [req.body]);
                res.json(resp);
            });
        });
    }
    existe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correo } = req.params;
            let password = req.body.password;
            let token;
            let consulta = `SELECT idProfesor, password, nivel FROM profesores WHERE correoProfesor = '${correo}'`;
            const respuesta = yield database_1.default.query(consulta);
            if (respuesta.length > 0) {
                bcryptjs_1.default.compare(password, respuesta[0].password, (err, resEncriptar) => {
                    if (resEncriptar == true) {
                        token = jsonwebtoken_1.default.sign(correo, process.env.TOKEN_SECRET || 'prueba');
                        console.log(process.env.TOKEN_SECRET);
                        res.json({
                            "token": token,
                            "idProfesor": respuesta[0].idProfesor,
                            "nivel": respuesta[0].nivel
                        });
                    }
                    else {
                        res.json(-1);
                    }
                    return;
                });
            }
            else {
                res.json(-1);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProfesor } = req.params;
            console.log(idProfesor);
            const respuesta = yield database_1.default.query(`DELETE FROM profesores WHERE idProfesor = ${idProfesor}`);
            res.json(respuesta);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProfesor } = req.params;
            console.log(idProfesor);
            const respuesta = yield database_1.default.query("UPDATE profesores SET ? WHERE idProfesor = ?", [req.body, idProfesor]);
            res.json(respuesta);
        });
    }
    listProfesoresByCarrera(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCarrera } = req.params;
            console.log(idCarrera);
            const respuesta = yield database_1.default.query(`SELECT * FROM profesores WHERE idCarrera = ${idCarrera}`);
            res.json(respuesta);
        });
    }
    listProfesoresByInstituto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idInstituto } = req.params;
            console.log("idInstituto:", idInstituto);
            const respuesta = yield database_1.default.query(`SELECT * FROM profesores WHERE idInstituto = ${idInstituto}`);
            res.json(respuesta);
        });
    }
    listProfesoresByArticulo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idArticulo } = req.params;
            console.log(idArticulo);
            const respuesta = yield database_1.default.query(`SELECT *
			 FROM articuloYprofesor, profesores
			 WHERE articuloYprofesor.idArticulo = ${idArticulo}
			   AND articuloYprofesor.idProfesor = profesores.idProfesor`);
            res.json(respuesta);
        });
    }
    listTipoProfesor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Entro tipo");
            const respuesta = yield database_1.default.query("SELECT * FROM `tipoProfesor` ORDER BY idTipoProfesor");
            res.json(respuesta);
        });
    }
    actualizaPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProfesor } = req.params;
            let password = req.body.password;
            let salt = bcryptjs_1.default.genSaltSync(10);
            console.log("idprofesor:", idProfesor, "\tpassword:", password);
            bcryptjs_1.default.hash(password, salt).then((nuevoPassword) => {
                let consulta = `UPDATE profesores SET password = '${nuevoPassword}' WHERE idProfesor = ${idProfesor}`;
                const respuesta = database_1.default.query(consulta);
                res.json(respuesta);
            });
        });
    }
}
exports.profesoresController = new ProfesoresController();
