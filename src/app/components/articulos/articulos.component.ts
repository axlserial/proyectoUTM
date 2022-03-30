import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticuloService } from 'src/app/services/articulo.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { CambioInfoService } from 'src/app/services/cambio-info.service';

@Component({
	selector: 'app-articulos',
	templateUrl: './articulos.component.html',
	styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

	idProfesor: number = 0;
	articulos: any;
	datosArticulo: any[] = [];
	profesores: any[] = [];
	ini: string;
	fin: string;

	constructor(private router: ActivatedRoute,
				private cambioInfoService: CambioInfoService, 
				private articuloService: ArticuloService,
				private profesorService: ProfesorService) {

		let hoy = new Date();
		this.ini = `${hoy.getFullYear() - 3}-01-01`;
		this.fin = `${hoy.getFullYear()}-${
					  hoy.getMonth() + 1 < 10 ? '0' + (hoy.getMonth() + 1) : hoy.getMonth() + 1}-${
					  hoy.getDate() < 10 ? '0' + hoy.getDate() : hoy.getDate()}`;

		this.router.paramMap.subscribe(params => {
			this.idProfesor = Number(params.get('idProfesor'));
		});

		this.cambioInfoService.currentMsg$.subscribe(
			(msg) => {
				this.articuloService.listArticulosByProfesor(this.idProfesor).subscribe({
					next: (resArticulos: any) => {
						this.articulos = resArticulos;
						this.articulos.forEach((articulo: any) => {
							this.profesorService.listAutoresByArticulo(articulo.idArticulo).subscribe({
								next: (resAutor: any) => {
									this.datosArticulo.push({
										"articulo": articulo,
										"autores": resAutor
									});
								},
								error: (err) => console.error(err)
							});						
						});
					},
					error: (err) =>  console.error(err)
				});
			}
		);
	}

	ngOnInit(): void { }

	cambioFechaIni(){
		const fechaIni = <HTMLInputElement> document.getElementById('fechaIni');
		this.ini = fechaIni.value;
		console.log("FechaIni: ", this.ini);
	}

	cambioFechaFin(){
		const fechaFin = <HTMLDataElement> document.getElementById('fechaFin');
		this.fin = fechaFin.value;
		console.log("FechaFin: ", this.fin);
	}

	eliminarProf(idArticulo: any, idProfesor: any){
		console.log("idArticulo:", idArticulo, "\tidProfesor:", idProfesor);
	}

	agregarUTM(idArticulo: any){
		console.log("Articulo:", idArticulo);
	}

}
