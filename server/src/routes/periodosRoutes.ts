import { Router } from 'express';
import { periodosController } from '../controllers/periodosController';

class PeriodosRoutes {
	public router: Router = Router();

	constructor(){
		this.config();
	}

	config(): void {
		this.router.get('/', periodosController.list);
		this.router.get('/:idPeriodo', periodosController.listOne);
		this.router.post('/create', periodosController.create);
		this.router.delete('/delete/:idPeriodo', periodosController.delete);
		this.router.put('/update/:idPeriodo', periodosController.update);
	}
}

const periodosRoutes = new PeriodosRoutes();
export default periodosRoutes.router;