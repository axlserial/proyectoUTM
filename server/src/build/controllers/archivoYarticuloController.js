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
exports.archivoYArticuloController = void 0;
const database_1 = __importDefault(require("../database"));
class ArchivoYArticuloController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('INSERT INTO archivoYarticulo SET ?', [req.body]);
            console.log(respuesta);
            res.json(respuesta);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idArchivoYArticulo } = req.params;
            console.log(idArchivoYArticulo);
            const respuesta = yield database_1.default.query(`DELETE FROM archivoYarticulo WHERE idArchivoYArticulo = ${idArchivoYArticulo}`);
            res.json(respuesta);
        });
    }
    listArchivosByArticulo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idArticulo } = req.params;
            let consulta = `SELECT * FROM archivoYarticulo WHERE idArticulo = ${idArticulo}`;
            const respuesta = yield database_1.default.query(consulta);
            res.json(respuesta);
        });
    }
}
exports.archivoYArticuloController = new ArchivoYArticuloController();
