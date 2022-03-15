import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class UsuarioService {

	constructor(private http: HttpClient) {

	}

	existe(correo: string, password: any) {
		return this.http.post(`${environment.API_URL}/profesores/existe/${correo}`, password);
	}

	actualizaContra(idProfesor: number, password: any) {
		return this.http.put(`${environment.API_URL}/profesores/actualiza-password/${idProfesor}`, password);
	}
}
