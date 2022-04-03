"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const planesController_1 = require("../controllers/planesController");
class PlanesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', planesController_1.planesController.list);
        this.router.get('/:idPlan', planesController_1.planesController.listOne);
        this.router.post('/create', planesController_1.planesController.create);
        this.router.delete('/delete/:idPlan', planesController_1.planesController.delete);
        this.router.put('/update/:idPlan', planesController_1.planesController.update);
        this.router.get('/planes-by-carrera/:idCarrera', planesController_1.planesController.listPlanesByCarrera);
    }
}
const planesRoutes = new PlanesRoutes();
exports.default = planesRoutes.router;
