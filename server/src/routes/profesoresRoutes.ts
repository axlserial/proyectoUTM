import { Router } from 'express';
import { profesoresController } from '../controllers/profesoresController';

class ProfesoresRoutes {
	public router: Router = Router();
	constructor() {
		this.config();
	}

	config(): void {
		this.router.get('/', profesoresController.list);
		this.router.get('/:idProfesor', profesoresController.listOne);
		this.router.post('/create', profesoresController.create);
		this.router.delete('/delete/:idProfesor', profesoresController.delete);
		this.router.put('/update/:idProfesor', profesoresController.update);
		this.router.get('/profesores-by-carrera/:idCarrera', profesoresController.listProfesoresByCarrera);
		this.router.get('/profesores-by-articulo/:idArticulo', profesoresController.listProfesoresByArticulo);
		this.router.get('/existe/:correo/:password', profesoresController.existe);
	}
}

const profesoresRoutes = new ProfesoresRoutes();
export default profesoresRoutes.router;