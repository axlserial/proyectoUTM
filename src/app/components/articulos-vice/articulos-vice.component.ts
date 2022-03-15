import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticuloService } from 'src/app/services/articulo.service';
import { ProfesorService } from 'src/app/services/profesor.service';



@Component({
	selector: 'app-articulos-vice',
	templateUrl: './articulos-vice.component.html',
	styleUrls: ['./articulos-vice.component.css']
})
export class ArticulosViceComponent implements OnInit {

	idProfesor: number = 0;
	articulos: any;
	autores: any[] = [];
	ini: string;
	fin: any;

	constructor(private router: ActivatedRoute, private articuloService: ArticuloService, 
		private profesorService: ProfesorService) {
	
			let hoy = new Date();
			this.ini = `${hoy.getFullYear() - 3}-01-01`;
			this.fin = `${hoy.getFullYear()}-${
						  hoy.getMonth() + 1 < 10 ? '0' + (hoy.getMonth() + 1) : hoy.getMonth() + 1}-${
						  hoy.getDate() < 10 ? '0' + hoy.getDate() : hoy.getDate()}`;
	}

	ngOnInit(): void {

		// $(document).ready(function () {
		// 	$('.modal').modal({
		// 		dismissible: true
		// 	});
		// });

		this.router.paramMap.subscribe(params => {
			this.idProfesor = Number(params.get('idProfesor'));
			this.articuloService.listArticulosByProfesor(this.idProfesor).subscribe({
				next: (resArticulos: any) => {
					this.articulos = resArticulos;
					this.articulos.forEach((articulo: any) => {
						this.profesorService.listAutoresByArticulo(articulo.idArticulo).subscribe({
							next: (resAutor: any) => {
								this.autores.push(resAutor);
							},
							error: (err) => console.error(err)
						});						
					});
					// console.log("Autores: ", this.autores);
				},
				error: (err) =>  console.error(err)
			});
		});
	}

	cambioFechaIni(){
		const fechaIni = <HTMLInputElement> document.getElementById('fechaIni');
		this.ini = fechaIni.value;
		console.log("FechaIni: ", this.ini);
	}

	cambioFechaFin(){
		const fechaFin = <HTMLDataElement> document.getElementById('fechaFin');
		this.ini = fechaFin.value;
		console.log("FechaFin: ", this.ini);
	}

}
