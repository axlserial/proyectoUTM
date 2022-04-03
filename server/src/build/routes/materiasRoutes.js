"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const materiasController_1 = require("../controllers/materiasController");
class MateriasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', materiasController_1.materiasController.list);
        this.router.get('/:idMateria', materiasController_1.materiasController.listOne);
        this.router.post('/create', materiasController_1.materiasController.create);
        this.router.delete('/delete/:idMateria', materiasController_1.materiasController.delete);
        this.router.put('/update/:idMateria', materiasController_1.materiasController.update);
        this.router.get('/materias-by-carrera/:idCarrera', materiasController_1.materiasController.listMateriasByCarrera);
        this.router.get('/materias-by-carrera-by-plan/:idCarrera/:idPlan', materiasController_1.materiasController.listMateriasByCarreraByPlan);
        this.router.get('/materias-by-profesor/:idProfesor', materiasController_1.materiasController.listMateriasByProfesor);
    }
}
const materiasRoutes = new MateriasRoutes();
exports.default = materiasRoutes.router;
