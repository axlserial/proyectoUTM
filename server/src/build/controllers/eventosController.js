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
exports.eventosController = void 0;
const database_1 = __importDefault(require("../database"));
class EventosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM eventos order by idEvento');
            console.log(respuesta);
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idEvento } = req.params;
            let consulta = `SELECT * FROM eventos WHERE idEvento = ${idEvento}`;
            const respuesta = yield database_1.default.query(consulta);
            console.log(consulta);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Evento no encontrado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('INSERT INTO eventos SET ?', [req.body]);
            res.json(respuesta);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idEvento } = req.params;
            console.log(idEvento);
            const respuesta = yield database_1.default.query(`DELETE FROM eventos WHERE idEvento = ${idEvento}`);
            res.json(respuesta);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idEvento } = req.params;
            console.log(idEvento);
            const respuesta = yield database_1.default.query("UPDATE eventos SET ? WHERE idEvento = ?", [req.body, idEvento]);
            res.json(respuesta);
        });
    }
    listEventosByInstituto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idInstituto } = req.params;
            console.log(idInstituto);
            const respuesta = yield database_1.default.query(`SELECT *
			 FROM eventos E INNER JOIN profesores P
				 ON E.idProfesor = P.idProfesor
					  AND P.idInstituto = ${idInstituto}`);
            res.json(respuesta);
        });
    }
    listEventosByCarrera(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCarrera } = req.params;
            console.log(idCarrera);
            const respuesta = yield database_1.default.query(`SELECT *
			 FROM eventos E INNER JOIN profesores P
			   ON E.idProfesor = P.idProfesor
				  AND P.idCarrera = ${idCarrera}`);
            res.json(respuesta);
        });
    }
    listEventosByProfesor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProfesor } = req.params;
            console.log(idProfesor);
            const respuesta = yield database_1.default.query(`SELECT *
			 FROM eventos E INNER JOIN profesores P
				ON E.idProfesor = P.idProfesor
					AND P.idProfesor = ${idProfesor}`);
            res.json(respuesta);
        });
    }
    listEventosByPeriodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ini, fin } = req.params;
            console.log(ini, "\n", fin);
            let consulta = `SELECT *
						FROM eventos
						WHERE inicio >= '${ini}' 
							AND fin <= '${fin}'`;
            const respuesta = yield database_1.default.query(consulta);
            res.json(respuesta);
        });
    }
}
exports.eventosController = new EventosController();
