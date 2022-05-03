import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { header } from '../models/header.model';

@Injectable({
	providedIn: 'root'
})
export class ActividadService {

	constructor(private http: HttpClient) { }

	crearActividad(actividad: any){
		return this.http.post(`${environment.API_URL}/actividades/create/`, actividad, {headers: header});
	}

	listActividadesByInstituto(idInstituto: number) {
		return this.http.get(`${environment.API_URL}/actividades/actividades-by-instituto/${idInstituto}`, {headers: header});
	}

	listActividadesByCarrera(idCarrera: number) {
		return this.http.get(`${environment.API_URL}/actividades/actividades-by-carrera/${idCarrera}`, {headers: header});
	}

	listActividadesByProfesor(idProfesor: number) {
		return this.http.get(`${environment.API_URL}/actividades/actividades-by-profesor/${idProfesor}`, {headers: header});
	}

	listActividadesByPeriodo(ini: string, fin: string) {
		return this.http.get(`${environment.API_URL}/actividades/actividades-by-periodo/${ini}/${fin}`, {headers: header});
	}

}
