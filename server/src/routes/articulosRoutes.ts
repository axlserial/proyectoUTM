import { Router } from 'express';
import { articulosController } from '../controllers/articulosController';
import { validarToken } from '../middleware/auth';

class ArticulosRoutes {
	public router: Router = Router();

	constructor(){
		this.router.all("*", validarToken);
		this.config();
	}

	config(): void {
		this.router.get('/', articulosController.list);
		this.router.get('/:idArticulo', articulosController.listOne);
		this.router.post('/create/:idProfesor', articulosController.create);
		this.router.post('/create-migrar/', articulosController.createMigrar);
		this.router.delete('/delete/:idArticulo', articulosController.delete);
		this.router.put('/update/:idArticulo', articulosController.update);
		this.router.get('/articulos-by-instituto/:idInstituto', articulosController.listArticulosByInstituto);
		this.router.get('/firsts-articulos-by-instituto/:idInstituto', articulosController.listFirstsArticulosByInstituto);
		this.router.get('/firsts-art-with-autores-by-instituto/:idInstituto', articulosController.listFirstsArtWithAutoresByInstituto);
		this.router.get('/articulos-by-carrera/:idCarrera', articulosController.listArticulosByCarrera);
		this.router.get('/articulos-by-profesor/:idProfesor', articulosController.listArticulosByProfesor);
		this.router.get('/articulos-by-periodo/:ini/:fin', articulosController.listArticulosByPeriodo);
	}
}

const articulosRoutes = new ArticulosRoutes();
export default articulosRoutes.router;