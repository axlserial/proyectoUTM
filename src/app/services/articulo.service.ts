import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Articulo } from '../models/articulo.model';
import { header } from '../models/header.model';

@Injectable({
	providedIn: 'root'
})
export class ArticuloService {

	constructor(private http: HttpClient) { }

	listArticulosByInstituto(idInstituto: number) {
		return this.http.get(`${environment.API_URL}/articulos/articulos-by-instituto/${idInstituto}`, {headers: header});
	}

	listFirstsArticulosByInstituto(idInstituto: number) {
		return this.http.get(`${environment.API_URL}/articulos/firsts-articulos-by-instituto/${idInstituto}`, {headers: header});
	}

	listArticulosByProfesor(idProfesor: number) {
		return this.http.get(`${environment.API_URL}/articulos/articulos-by-profesor/${idProfesor}`, {headers: header});
	}

	listArticulosByPeriodo(ini: string, fin: string){
		return this.http.get(`${environment.API_URL}/articulos/articulos-by-periodo/${ini}/${fin}`, {headers: header});
	}

	crearArticulo(idProfesor:number, articulo: Articulo){
		return this.http.post(`${environment.API_URL}/articulos/create/${idProfesor}`, articulo, {headers: header});
	}

	crearArticuloMigrar(datos: any){
		return this.http.post(`${environment.API_URL}/articulos/create-migrar/`, datos, {headers: header});
	}
}
