import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Carrera } from '../models/carrera.model';

@Injectable({
	providedIn: 'root'
})
export class CarreraService {

	constructor(private http: HttpClient) { }

	crearCarrera(carrera: Carrera){
		return this.http.post(`${environment.API_URL}/carreras/create`, carrera);
	}

	eliminarCarrera(idCarrera: any){
		return this.http.delete(`${environment.API_URL}/carreras/delete/${idCarrera}`);
	}

	listCarrerasbyInstituto(idInstituto: number){
		return this.http.get(`${environment.API_URL}/carreras/carreras-by-instituto/${idInstituto}`);
	}

	actulizarCarrera(carrera: Carrera){
		return this.http.put(`${environment.API_URL}/carreras/update/${carrera.idCarrera}`, carrera);
	}
}
