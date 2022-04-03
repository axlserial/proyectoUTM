"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carrerasController_1 = require("../controllers/carrerasController");
const auth_1 = require("../middleware/auth");
class CarrerasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.router.all("*", auth_1.validarToken);
        this.config();
    }
    config() {
        this.router.get('/', carrerasController_1.carrerasController.list);
        this.router.get('/:idCarrera', carrerasController_1.carrerasController.listOne);
        this.router.post('/create', carrerasController_1.carrerasController.create);
        this.router.delete('/delete/:idCarrera', carrerasController_1.carrerasController.delete);
        this.router.put('/update/:idCarrera', carrerasController_1.carrerasController.update);
        this.router.get('/carreras-by-instituto/:idInstituto', carrerasController_1.carrerasController.listCarrerasbyInstituto);
    }
}
const carrerasRoutes = new CarrerasRoutes();
exports.default = carrerasRoutes.router;
