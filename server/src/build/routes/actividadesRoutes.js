"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const actividadesController_1 = require("../controllers/actividadesController");
const auth_1 = require("../middleware/auth");
class ActividadesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.router.all("*", auth_1.validarToken);
        this.config();
    }
    config() {
        this.router.get('/', actividadesController_1.actividadesController.list);
        this.router.get('/:idActividad', actividadesController_1.actividadesController.listOne);
        this.router.post('/create/', actividadesController_1.actividadesController.create);
        this.router.delete('/delete/:idActividad', actividadesController_1.actividadesController.delete);
        this.router.put('/update/:idActividad', actividadesController_1.actividadesController.update);
        this.router.get('/actividades-by-instituto/:idInstituto', actividadesController_1.actividadesController.listActividadesByInstituto);
        this.router.get('/actividades-by-carrera/:idCarrera', actividadesController_1.actividadesController.listActividadesByCarrera);
        this.router.get('/actividades-by-profesor/:idProfesor', actividadesController_1.actividadesController.listActividadesByProfesor);
        this.router.get('/actividades-by-periodo/:ini/:fin', actividadesController_1.actividadesController.listActividadesByPeriodo);
    }
}
const actividadesRoutes = new ActividadesRoutes();
exports.default = actividadesRoutes.router;
