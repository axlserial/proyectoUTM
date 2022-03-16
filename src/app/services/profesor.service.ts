import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Profesor } from 'src/app/models/profesor.model';

@Injectable({
	providedIn: 'root'
})
export class ProfesorService {

	constructor(private http: HttpClient) {

	}

	existe(correo: string, password: string) {
		return this.http.get(`${environment.API_URL}/profesores/existe/${correo}/${password}`);
	}

	guardarProfesor(profesor: Profesor) {
		return this.http.post(`${environment.API_URL}/profesores/create`, profesor);
	}

	list(){
		return this.http.get(`${environment.API_URL}/profesores/`);
	}

	listOne(idProfesor: number) {
		return this.http.get(`${environment.API_URL}/profesores/${idProfesor}`);
	}
	
	actualizarProfesor(idProfesor: number, profesor: Profesor) {
		return this.http.put(`${environment.API_URL}/profesores/update/${idProfesor}`, profesor);
	}
	
	eliminarProfesor(idProfesor: number) {
		return this.http.delete(`${environment.API_URL}/profesor/delete/${idProfesor}`);
	}

	listAutoresByArticulo(idArticulo: number) {
		return this.http.get(`${environment.API_URL}/profesores/profesores-by-articulo/${idArticulo}`);
	}

	listInstitutos(){
		return this.http.get(`${environment.API_URL}/institutos/`);
	}

	listCarrerasbyInstituto(idInstituto: number){
		return this.http.get(`${environment.API_URL}/carreras/carreras-by-instituto/${idInstituto}`);
	}

	listProfesoresByInstituto(idInstituto: number){
		return this.http.get(`${environment.API_URL}/profesores/profesores-by-instituto/${idInstituto}`);
	}

	listProfesoresByCarrera(idCarrera: number){
		return this.http.get(`${environment.API_URL}/profesores/profesores-by-carrera/${idCarrera}`);
	}
}