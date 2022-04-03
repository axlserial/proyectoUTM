"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const institutosController_1 = require("../controllers/institutosController");
class InstitutosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // this.router.get('/', validarToken, institutosController.list);
        this.router.get('/', institutosController_1.institutosController.list);
        this.router.get('/:idInstituto', institutosController_1.institutosController.listOne);
        this.router.post('/create', institutosController_1.institutosController.create);
        this.router.delete('/delete/:idInstituto', institutosController_1.institutosController.delete);
        this.router.put('/update/:idInstituto', institutosController_1.institutosController.update);
        this.router.get('/num-carreras/:idInstituto', institutosController_1.institutosController.numCarreras);
    }
}
const institutosRoutes = new InstitutosRoutes();
exports.default = institutosRoutes.router;
