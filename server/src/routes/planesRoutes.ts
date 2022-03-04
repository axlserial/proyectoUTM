import { Router } from 'express';
import { planesController } from '../controllers/planesController';

class PlanesRoutes {
	public router: Router = Router();

	constructor(){
		this.config();
	}

	config(): void {
		this.router.get('/', planesController.list);
		this.router.get('/:idPlan', planesController.listOne);
		this.router.post('/create', planesController.create);
		this.router.delete('/delete/:idPlan', planesController.delete);
		this.router.put('/update/:idPlan', planesController.update);
		this.router.get('/planes-by-carrera/:idCarrera', planesController.listPlanesByCarrera);
	}
}

const planesRoutes = new PlanesRoutes();
export default planesRoutes.router;