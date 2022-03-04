export class Profesor {

	nombres: string;
	apellidoMaterno: string;
	apellidoPaterno: string;
	correoProfesor: string;
	password: string;
	nivel: number;
	idCarrera: number;
	grado: string;
	idTipoProfesor: number;

	constructor(){
		this.nombres = '';
		this.apellidoMaterno = '';
		this.apellidoPaterno = '';
		this.correoProfesor = '';
		this.password = '';
		this.nivel = 0;
		this.idCarrera = 0;
		this.grado = '';
		this.idTipoProfesor = 0;
	}

}