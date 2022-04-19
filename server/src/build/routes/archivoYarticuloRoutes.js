"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const archivoYarticuloController_1 = require("../controllers/archivoYarticuloController");
const auth_1 = require("../middleware/auth");
class ArticulosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.router.all("*", auth_1.validarToken);
        this.config();
    }
    config() {
        this.router.get('/archivos-by-articulo/:idArticulo', archivoYarticuloController_1.archivoYArticuloController.listArchivosByArticulo);
    }
}
const articulosRoutes = new ArticulosRoutes();
exports.default = articulosRoutes.router;
