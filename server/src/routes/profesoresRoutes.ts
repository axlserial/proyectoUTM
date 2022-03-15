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
		this.router.get('/profesores-by-instituto/:idInstituto', profesoresController.listProfesoresByInstituto);
		this.router.post('/existe/:correo', profesoresController.existe);
		this.router.put('/actualiza-password/:idProfesor', profesoresController.actualizaPassword);
	}
}

const profesoresRoutes = new ProfesoresRoutes();
export default profesoresRoutes.router;