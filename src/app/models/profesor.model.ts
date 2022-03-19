export class Profesor {

	idProfesor: number;
	nombres: string;
	apellidoMaterno: string;
	apellidoPaterno: string;
	correoProfesor: string;
	password: string;
	nivel: number;
	idInstituto: number;
	idCarrera: number;
	grado: string;
	idTipoProfesor: number;

	constructor(){
		this.idProfesor = 0;
		this.nombres = 'Axel Isaac';
		this.apellidoMaterno = 'Garcia';
		this.apellidoPaterno = 'Gonzalez';
		this.correoProfesor = 'a@gmail.com';
		this.password = '12345';
		this.nivel = 4;
		this.idInstituto = 0;
		this.idCarrera = 0;
		this.grado = 'Dr';
		this.idTipoProfesor = 0;
	}

}