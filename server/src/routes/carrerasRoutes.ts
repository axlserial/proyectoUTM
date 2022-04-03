import { Router } from 'express';
import { carrerasController } from '../controllers/carrerasController';
import { validarToken } from '../middleware/auth';

class CarrerasRoutes {
	public router: Router = Router();

	constructor(){
		this.router.all("*", validarToken);
		this.config();
	}

	config(): void {
		this.router.get('/', carrerasController.list);
		this.router.get('/:idCarrera', carrerasController.listOne);
		this.router.post('/create', carrerasController.create);
		this.router.delete('/delete/:idCarrera', carrerasController.delete);
		this.router.put('/update/:idCarrera', carrerasController.update);
		this.router.get('/carreras-by-instituto/:idInstituto', carrerasController.listCarrerasbyInstituto);
	}
}

const carrerasRoutes = new CarrerasRoutes();
export default carrerasRoutes.router;