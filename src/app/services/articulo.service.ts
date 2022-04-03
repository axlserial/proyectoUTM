import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Articulo } from '../models/articulo.model';

@Injectable({
	providedIn: 'root'
})
export class ArticuloService {

	constructor(private http: HttpClient) { }

	listArticulosByInstituto(idInstituto: number) {
		return this.http.get(`${environment.API_URL}/articulos/articulos-by-instituto/${idInstituto}`);
	}

	listArticulosByProfesor(idProfesor: number) {
		return this.http.get(`${environment.API_URL}/articulos/articulos-by-profesor/${idProfesor}`);
	}

	listArticulosByPeriodo(ini: string, fin: string){
		return this.http.get(`${environment.API_URL}/articulos/articulos-by-periodo/${ini}/${fin}`);
	}

	crearArticulo(idProfesor:number, articulo: Articulo){
		return this.http.post(`${environment.API_URL}/articulos/create/${idProfesor}`, articulo);
	}
}
