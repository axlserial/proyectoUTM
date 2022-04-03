"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const periodosController_1 = require("../controllers/periodosController");
class PeriodosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', periodosController_1.periodosController.list);
        this.router.get('/:idPeriodo', periodosController_1.periodosController.listOne);
        this.router.post('/create', periodosController_1.periodosController.create);
        this.router.delete('/delete/:idPeriodo', periodosController_1.periodosController.delete);
        this.router.put('/update/:idPeriodo', periodosController_1.periodosController.update);
    }
}
const periodosRoutes = new PeriodosRoutes();
exports.default = periodosRoutes.router;
