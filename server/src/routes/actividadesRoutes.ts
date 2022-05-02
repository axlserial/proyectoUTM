import { Router } from 'express';
import { actividadesController } from '../controllers/actividadesController';
import { validarToken } from '../middleware/auth';

class ActividadesRoutes {
	public router: Router = Router();

	constructor(){
		this.router.all("*", validarToken);
		this.config();
	}

	config(): void {
		this.router.get('/', actividadesController.list);
		this.router.get('/:idActividad', actividadesController.listOne);
		this.router.post('/create/', actividadesController.create);
		this.router.delete('/delete/:idActividad', actividadesController.delete);
		this.router.put('/update/:idActividad', actividadesController.update);
		this.router.get('/actividades-by-instituto/:idInstituto', actividadesController.listActividadesByInstituto);
		this.router.get('/actividades-by-carrera/:idCarrera', actividadesController.listActividadesByCarrera);
		this.router.get('/actividades-by-profesor/:idProfesor', actividadesController.listActividadesByProfesor);
		this.router.get('/actividades-by-periodo/:ini/:fin', actividadesController.listActividadesByPeriodo);
	}
}

const actividadesRoutes = new ActividadesRoutes();
export default actividadesRoutes.router;