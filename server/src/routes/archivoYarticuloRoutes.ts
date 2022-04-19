import { Router } from 'express';
import { archivoYArticuloController } from '../controllers/archivoYarticuloController';
import { validarToken } from '../middleware/auth';

class ArticulosRoutes {
	public router: Router = Router();

	constructor(){
		this.router.all("*", validarToken);
		this.config();
	}

	config(): void {
		this.router.get('/archivos-by-articulo/:idArticulo', archivoYArticuloController.listArchivosByArticulo);
	}
}

const articulosRoutes = new ArticulosRoutes();
export default articulosRoutes.router;