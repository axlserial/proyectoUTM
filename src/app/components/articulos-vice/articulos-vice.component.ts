import { Component, OnInit } from '@angular/core';
import { InstitutoService } from 'src/app/services/instituto.service';
import { ArticuloService } from 'src/app/services/articulo.service';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
	selector: 'app-articulos-vice',
	templateUrl: './articulos-vice.component.html',
	styleUrls: ['./articulos-vice.component.css']
})
export class ArticulosViceComponent implements OnInit {

	// Vista web normal
	institutos: any[] = [];
	institutoActual: any;
	datosArticulos: any[] = [];
	
	// para PDF impresión
	articulosInst: any[] = [];

	// Paginación
	pageSize = 3;
	p = 1;

	constructor(private institutoService: InstitutoService,
				private articuloService: ArticuloService,
				private profesorService: ProfesorService) { }

	ngOnInit(): void {
		this.institutoService.listInstitutos()
		.subscribe({
			next: (resInstitutos: any) => {
				this.institutos = resInstitutos;
				this.institutos = this.institutos.filter(item => item.idInstituto !== 9);
				this.institutoActual = this.institutos[0].idInstituto;
				this.obtenerDatosArticulos();

				// obtiene articulos para impresión
				this.institutos.forEach(instituto => {
					this.articuloService.listFirstsArticulosByInstituto(instituto.idInstituto)
					.subscribe({
						next: (resArticulos: any) => {
							this.articulosInst.push({
								"instituto": instituto.nombreInstituto,
								"articulos": resArticulos
							});
						},
						error: err => console.error(err)
					});
				});
			}
		});
	}

	obtenerDatosArticulos(){
		this.articuloService.listArticulosByInstituto(this.institutoActual)
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

	cambioInstituto(op: any){
		this.institutoActual = op.value;
		this.datosArticulos = [];
		this.obtenerDatosArticulos();
	}
}
