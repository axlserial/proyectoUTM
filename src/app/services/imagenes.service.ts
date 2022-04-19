import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ImagenesService {

	constructor(private http: HttpClient) { }

	guardarArchivo(idArticulo: number, src: any, type: any, index: number){
		return this.http.post(`${environment.API_URI_IMG}/guardar-archivo/`, 
		{
			"src": src,
			"type": type,
			"idArticulo": idArticulo,
			"index": index
		});
	}

	listArchivosByArticulo(idArticulo: number){
		return this.http.get(`${environment.API_URL}/articuloYarchivo/archivos-by-articulo/${idArticulo}`);
	}

}
