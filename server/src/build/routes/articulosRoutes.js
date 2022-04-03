"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const articulosController_1 = require("../controllers/articulosController");
class ArticulosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', articulosController_1.articulosController.list);
        this.router.get('/:idArticulo', articulosController_1.articulosController.listOne);
        this.router.post('/create/:idProfesor', articulosController_1.articulosController.create);
        this.router.delete('/delete/:idArticulo', articulosController_1.articulosController.delete);
        this.router.put('/update/:idArticulo', articulosController_1.articulosController.update);
        this.router.get('/articulos-by-instituto/:idInstituto', articulosController_1.articulosController.listArticulosByInstituto);
        this.router.get('/articulos-by-carrera/:idCarrera', articulosController_1.articulosController.listArticulosByCarrera);
        this.router.get('/articulos-by-profesor/:idProfesor', articulosController_1.articulosController.listArticulosByProfesor);
        this.router.get('/articulos-by-periodo/:ini/:fin', articulosController_1.articulosController.listArticulosByPeriodo);
    }
}
const articulosRoutes = new ArticulosRoutes();
exports.default = articulosRoutes.router;
