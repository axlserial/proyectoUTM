"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventosController_1 = require("../controllers/eventosController");
const auth_1 = require("../middleware/auth");
class EventosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.router.all("*", auth_1.validarToken);
        this.config();
    }
    config() {
        this.router.get('/', eventosController_1.eventosController.list);
        this.router.get('/:idEvento', eventosController_1.eventosController.listOne);
        this.router.post('/create/', eventosController_1.eventosController.create);
        this.router.delete('/delete/:idEvento', eventosController_1.eventosController.delete);
        this.router.put('/update/:idEvento', eventosController_1.eventosController.update);
        this.router.get('/eventos-by-instituto/:idInstituto', eventosController_1.eventosController.listEventosByInstituto);
        this.router.get('/eventos-by-carrera/:idCarrera', eventosController_1.eventosController.listEventosByCarrera);
        this.router.get('/eventos-by-profesor/:idProfesor', eventosController_1.eventosController.listEventosByProfesor);
        this.router.get('/eventos-by-periodo/:ini/:fin', eventosController_1.eventosController.listEventosByPeriodo);
    }
}
const eventosRoutes = new EventosRoutes();
exports.default = eventosRoutes.router;
