import { Component, OnInit } from '@angular/core';
import { Profesor } from 'src/app/models/profesor.model';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
	selector: 'app-profesor',
	templateUrl: './profesor.component.html',
	styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {

	profesor: Profesor;

	constructor(private profesorService: ProfesorService) {
		this.profesor = new Profesor();
	}

	ngOnInit(): void {

	}

	existe(): void {
		this.profesorService.existe(this.profesor.correoProfesor, this.profesor.password).subscribe(resProfesor => {
			console.log(resProfesor);
			if (resProfesor) {
				localStorage.setItem('correo', this.profesor.correoProfesor);
			}
		});
	}

	guardarProfesor(){
		this.profesorService.guardarProfesor(this.profesor).subscribe(err => console.error(err));
	}
	
	obtenerProfesores(){
		this.profesorService.list().subscribe(err => console.error(err));
	}
	
	eliminarProfesor(id: number){
		this.profesorService.eliminarProfesor(id).subscribe(err => console.error(err));
	}
	
	actualizarProfesor(id: number, profesor: Profesor){
		this.profesorService.actualizarProfesor(id, profesor).subscribe(err => console.error(err));
	}

}