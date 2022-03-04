import { Router } from 'express';
import { materiasController } from '../controllers/materiasController';

class MateriasRoutes {
	public router: Router = Router();

	constructor(){
		this.config();
	}

	config(): void {
		this.router.get('/', materiasController.list);
		this.router.get('/:idMateria', materiasController.listOne);
		this.router.post('/create', materiasController.create);
		this.router.delete('/delete/:idMateria', materiasController.delete);
		this.router.put('/update/:idMateria', materiasController.update);
		this.router.get('/materias-by-carrera/:idCarrera', materiasController.listMateriasByCarrera);
		this.router.get('/materias-by-carrera-by-plan/:idCarrera/:idPlan', materiasController.listMateriasByCarreraByPlan);
		this.router.get('/materias-by-profesor/:idProfesor', materiasController.listMateriasByProfesor);
	}
}

const materiasRoutes = new MateriasRoutes();
export default materiasRoutes.router;