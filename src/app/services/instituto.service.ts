import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Instituto } from '../models/instituto.model';
import { header } from '../models/header.model';

@Injectable({
	providedIn: 'root'
})
export class InstitutoService {

	constructor(private http: HttpClient) { }

	listInstitutos() {
		return this.http.get(`${environment.API_URL}/institutos/`, {headers: header});
	}

	crearInstituto(instituto: Instituto){
		return this.http.post(`${environment.API_URL}/institutos/create`, instituto, {headers: header});
	}

	actualizarInstituto(instituto: Instituto){
		return this.http.put(`${environment.API_URL}/institutos/update/${instituto.idInstituto}`, instituto, {headers: header});
	}

	numCarreras(idInstituto: number){
		return this.http.get(`${environment.API_URL}/institutos/num-carreras/${idInstituto}`, {headers: header});
	}

	eliminaInstituto(idInstituto: number){
		return this.http.delete(`${environment.API_URL}/institutos/delete/${idInstituto}`, {headers: header});
	}
}
