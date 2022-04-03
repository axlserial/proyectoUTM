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
exports.materiasController = void 0;
const database_1 = __importDefault(require("../database"));
class MateriasController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM materias order by idPlan');
            console.log(respuesta);
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idMateria } = req.params;
            let consulta = `SELECT * FROM materias WHERE idMateria = ${idMateria}`;
            const respuesta = yield database_1.default.query(consulta);
            console.log(consulta);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Materia no encontrada' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('INSERT INTO materias SET ?', [req.body]);
            res.json(respuesta);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idMateria } = req.params;
            console.log(idMateria);
            const respuesta = yield database_1.default.query(`DELETE FROM materias WHERE idMateria = ${idMateria}`);
            res.json(respuesta);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idMateria } = req.params;
            console.log(idMateria);
            const respuesta = yield database_1.default.query("UPDATE materias SET ? WHERE idMateria = ?", [req.body, idMateria]);
            res.json(respuesta);
        });
    }
    listMateriasByCarrera(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCarrera } = req.params;
            console.log(idCarrera);
            const respuesta = yield database_1.default.query(`SELECT materias.nombreMateria, planes.nombrePlan
			 FROM materias, planes
			 WHERE planes.idCarrera = ${idCarrera}
			   AND materias.idPlan = planes.idPlan`);
            res.json(respuesta);
        });
    }
    listMateriasByCarreraByPlan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCarrera, idPlan } = req.params;
            console.log(idCarrera, idPlan);
            const respuesta = yield database_1.default.query(`SELECT materias.nombreMateria
			 FROM materias, planes
			 WHERE materias.idPlan = planes.idPlan
			   AND planes.idPlan = ${idPlan}
			   AND planes.idCarrera = ${idCarrera}`);
            res.json(respuesta);
        });
    }
    listMateriasByProfesor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProfesor } = req.params;
            console.log(idProfesor);
            const respuesta = yield database_1.default.query(`SELECT materias.nombreMateria, profesorYmateria.grupo, carreras.nombreCarrera, planes.nombrePlan
			 FROM materias, profesores, profesorYmateria, carreras, planes
			 WHERE profesores.idProfesor = ${idProfesor}
			   AND profesores.idProfesor = profesorYmateria.idProfesor
			   AND materias.idMateria = profesorYmateria.idMateria
			   AND profesores.idCarrera = carreras.idCarrera
			   AND carreras.idCarrera = planes.idCarrera`);
            res.json(respuesta);
        });
    }
}
exports.materiasController = new MateriasController();
