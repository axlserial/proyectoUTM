import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/services/articulo.service';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
	selector: 'app-articulos-direc',
	templateUrl: './articulos-direc.component.html',
	styleUrls: ['./articulos-direc.component.css']
})
export class ArticulosDirecComponent implements OnInit {

	// Profesor
	idProfesor = 0;
	profesor: any;

	// Datos
	datosArticulos: any[] = [];
	
	// Paginación
	pageSize = 3;
	p = 1;

	constructor(private articuloService: ArticuloService,
				private profesorService: ProfesorService) { }

	ngOnInit(): void {
		this.idProfesor = Number(localStorage.getItem('idProfesor'));

		this.profesorService.listOne(this.idProfesor).subscribe({
			next: (resProfesor: any) => {
				this.profesor = resProfesor;
				this.obtenerDatosArticulos();
			},
			error: err => console.error(err)
		});
	}

	obtenerDatosArticulos(){
		this.articuloService.listArticulosByInstituto(this.profesor.idInstituto)
		.subscribe({
			next: (resArticulos: any) => {
				resArticulos.forEach((articulo: any) => {
					this.profesorService.listAutoresByArticulo(articulo.idArticulo)
					.subscribe({
						next: (resAutor: any) => {
							this.datosArticulos.push({
								"articulo": articulo,
								"autores": resAutor
							});
						}
					});
				});
			}
		});
	}
}
