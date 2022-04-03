import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { header } from '../models/header.model';

@Injectable({
	providedIn: 'root'
})
export class UsuarioService {

	constructor(private http: HttpClient) {

	}

	existe(correo: string, password: any) {
		return this.http.post(`${environment.API_URL}/profesores/existe/${correo}`, password, {headers: header});
	}

	actualizaContra(idProfesor: number, password: any) {
		return this.http.put(`${environment.API_URL}/profesores/actualiza-password/${idProfesor}`, password, {headers: header});
	}
}
