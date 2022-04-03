import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Profesor } from 'src/app/models/profesor.model';
import { header } from '../models/header.model';

@Injectable({
	providedIn: 'root'
})
export class ProfesorService {

	constructor(private http: HttpClient) {	}

	existe(correo: string, password: string) {
		return this.http.get(`${environment.API_URL}/profesores/existe/${correo}/${password}`, {headers: header});
	}

	guardarProfesor(profesor: Profesor) {
		return this.http.post(`${environment.API_URL}/profesores/create`, profesor, {headers: header});
	}

	list(){
		return this.http.get(`${environment.API_URL}/profesores/`, {headers: header});
	}

	listOne(idProfesor: number) {
		return this.http.get(`${environment.API_URL}/profesores/${idProfesor}`, {headers: header});
	}
	
	actualizarProfesor(idProfesor: number, profesor: Profesor) {
		return this.http.put(`${environment.API_URL}/profesores/update/${idProfesor}`, profesor, {headers: header});
	}
	
	eliminarProfesor(idProfesor: number) {
		return this.http.delete(`${environment.API_URL}/profesores/delete/${idProfesor}`, {headers: header});
	}

	listAutoresByArticulo(idArticulo: number) {
		return this.http.get(`${environment.API_URL}/profesores/profesores-by-articulo/${idArticulo}`, {headers: header});
	}

	listProfesoresByInstituto(idInstituto: number){
		return this.http.get(`${environment.API_URL}/profesores/profesores-by-instituto/${idInstituto}`, {headers: header});
	}

	listProfesoresByCarrera(idCarrera: number){
		return this.http.get(`${environment.API_URL}/profesores/profesores-by-carrera/${idCarrera}`, {headers: header});
	}

	listTipoProfesor(){
		return this.http.get(`${environment.API_URL}/profesores/tipo-profesor/listar`, {headers: header});
	}
}