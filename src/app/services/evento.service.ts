import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { header } from '../models/header.model';

@Injectable({
	providedIn: 'root'
})
export class EventoService {

	constructor(private http: HttpClient) { }

	crearEvento(evento: any){
		return this.http.post(`${environment.API_URL}/eventos/create/`, evento, {headers: header});
	}

	listEventosByInstituto(idInstituto: number) {
		return this.http.get(`${environment.API_URL}/eventos/eventos-by-instituto/${idInstituto}`, {headers: header});
	}

	listEventosByCarrera(idCarrera: number) {
		return this.http.get(`${environment.API_URL}/eventos/eventos-by-carrera/${idCarrera}`, {headers: header});
	}

	listEventosByProfesor(idProfesor: number) {
		return this.http.get(`${environment.API_URL}/eventos/eventos-by-profesor/${idProfesor}`, {headers: header});
	}

	listEventosByPeriodo(ini: string, fin: string) {
		return this.http.get(`${environment.API_URL}/eventos/eventos-by-periodo/${ini}/${fin}`, {headers: header});
	}
}
