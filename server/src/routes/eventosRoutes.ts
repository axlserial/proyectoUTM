import { Router } from 'express';
import { eventosController } from '../controllers/eventosController';
import { validarToken } from '../middleware/auth';

class EventosRoutes {
	public router: Router = Router();

	constructor(){
		this.router.all("*", validarToken);
		this.config();
	}

	config(): void {
		this.router.get('/', eventosController.list);
		this.router.get('/:idEvento', eventosController.listOne);
		this.router.post('/create/', eventosController.create);
		this.router.delete('/delete/:idEvento', eventosController.delete);
		this.router.put('/update/:idEvento', eventosController.update);
		this.router.get('/eventos-by-instituto/:idInstituto', eventosController.listEventosByInstituto);
		this.router.get('/eventos-by-carrera/:idCarrera', eventosController.listEventosByCarrera);
		this.router.get('/eventos-by-profesor/:idProfesor', eventosController.listEventosByProfesor);
		this.router.get('/eventos-by-periodo/:ini/:fin', eventosController.listEventosByPeriodo);
	}
}

const eventosRoutes = new EventosRoutes();
export default eventosRoutes.router;