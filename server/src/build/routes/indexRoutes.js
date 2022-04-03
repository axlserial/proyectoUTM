"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => res.send("Probando ruta"));
        this.router.get('/instituto/', (req, res) => res.send('probando instituto'));
        this.router.get('/carrera/', (req, res) => res.send('probando carrera'));
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
