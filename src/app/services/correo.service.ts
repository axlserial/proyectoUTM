import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class CorreoService {

	constructor(private http: HttpClient) { }

	enviarCorreoRecuperacion(correo: any) {
		return this.http.post(`${environment.API_URI_CORREOS}/enviarCorreoRecuperarContrasenya/`, correo);
	}
}
