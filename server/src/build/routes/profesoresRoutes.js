"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profesoresController_1 = require("../controllers/profesoresController");
class ProfesoresRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', profesoresController_1.profesoresController.list);
        this.router.get('/:idProfesor', profesoresController_1.profesoresController.listOne);
        this.router.post('/create', profesoresController_1.profesoresController.create);
        this.router.delete('/delete/:idProfesor', profesoresController_1.profesoresController.delete);
        this.router.put('/update/:idProfesor', profesoresController_1.profesoresController.update);
        this.router.get('/profesores-by-carrera/:idCarrera', profesoresController_1.profesoresController.listProfesoresByCarrera);
        this.router.get('/profesores-by-articulo/:idArticulo', profesoresController_1.profesoresController.listProfesoresByArticulo);
        this.router.get('/profesores-by-instituto/:idInstituto', profesoresController_1.profesoresController.listProfesoresByInstituto);
        this.router.post('/existe/:correo', profesoresController_1.profesoresController.existe);
        this.router.put('/actualiza-password/:idProfesor', profesoresController_1.profesoresController.actualizaPassword);
        this.router.get('/tipo-profesor/listar', profesoresController_1.profesoresController.listTipoProfesor);
    }
}
const profesoresRoutes = new ProfesoresRoutes();
exports.default = profesoresRoutes.router;
