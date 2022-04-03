import {Router} from 'express';
import { institutosController } from '../controllers/institutosController';
import { validarToken } from '../middleware/auth';

class InstitutosRoutes {
	public router: Router = Router();

	constructor(){
		this.router.all("*", validarToken);
		this.config();
	}

	config(): void {
		this.router.get('/', institutosController.list);
		this.router.get('/:idInstituto', institutosController.listOne);
		this.router.post('/create', institutosController.create);
		this.router.delete('/delete/:idInstituto', institutosController.delete);
		this.router.put('/update/:idInstituto', institutosController.update);
		this.router.get('/num-carreras/:idInstituto', institutosController.numCarreras);
	}
}

const institutosRoutes = new InstitutosRoutes();
export default institutosRoutes.router;