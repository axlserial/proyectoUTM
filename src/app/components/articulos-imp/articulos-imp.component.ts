import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { InstitutoService } from 'src/app/services/instituto.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { ArticuloService } from 'src/app/services/articulo.service';

@Component({
	selector: 'app-articulos-imp',
	templateUrl: './articulos-imp.component.html',
	styleUrls: ['./articulos-imp.component.css']
})
export class ArticulosImpComponent implements OnInit {

	// Para datos de institutos
	institutos: any[] = [];
	instActual: number = 0;

	// Para datos de profesores
	profesores: any[] = [];
	profActual: number = 0;

	// Para datos de articulos
	articulos: any[] = [];

	// Para filtro por fechas
	ini: any;
	fin: any;

	constructor(private institutoService: InstitutoService,
				private profesorService: ProfesorService,
				private articuloService: ArticuloService,
				private datePipe: DatePipe) {

		let hoy = new Date();

		// Obtiene fecha de hoy
		this.fin = this.datePipe.transform(hoy, "yyyy-MM-dd");
		
		// Obtiene fecha de un mes atrás
		hoy.setMonth(hoy.getMonth() - 1);
		this.ini = this.datePipe.transform(hoy, "yyyy-MM-dd");

	}

	ngOnInit(): void {
		this.listarTodoInstitutos();
	}

	cambioFechaIni(){
		const fechaIni = <HTMLInputElement> document.getElementById('fechaIni');
		this.ini = fechaIni.value;
	}

	cambioFechaFin(){
		const fechaFin = <HTMLDataElement> document.getElementById('fechaFin');
		this.fin = fechaFin.value;
	}

	cambioInstituto(op: any){
		let valor = Number(op.value);

		// Sí se seleccionó "Todos"
		if (valor === -1){
			this.listarTodoInstitutos();
		} else {
			this.listarUniqueInstituto(valor);
		}
	}

	listarTodoInstitutos(){
		this.institutoService.listInstitutos()
		.subscribe({
			next: (resInstitutos: any) => {

				// Establece datos de institutos
				this.institutos = resInstitutos;
				this.institutos = this.institutos.filter(item => item.idInstituto !== 9);
				this.instActual = 0;

				// Limpia profesores
				this.profesores = [];
				this.profActual = 0;

				// obtiene articulos por instituto
				this.articulos = [];
				this.institutos.forEach(instituto => {
					this.articuloService.listFirstsArticulosByInstituto(instituto.idInstituto)
					.subscribe({
						next: (resArticulos: any) => {
							this.articulos.push({
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

	listarUniqueInstituto(index: number){
		this.instActual = index;
		let instituto = this.institutos[this.instActual];

		this.articulos = [];
		this.articuloService.listFirstsArticulosByInstituto(instituto.idInstituto)
		.subscribe({
			next: (resArticulos: any) => {

				// Guarda datos
				this.articulos.push({
					"instituto": instituto.nombreInstituto,
					"articulos": resArticulos
				});

				// Lista sus profesores
				this.profesorService.listProfesoresByInstituto(instituto.idInstituto)
				.subscribe({
					next: (resProfesores: any) => {
						this.profesores = resProfesores;
						this.profActual = 0;
					},
					error: err => console.error(err)
				});
			},
			error: err => console.error(err)
		});
	}

	cambioProfesor(op: any){
		let valor = Number(op.value);

		// Sí se seleccionó "Todos"
		if (valor === -1){
			this.listarUniqueInstituto(this.instActual);
		} else {
			this.listarUniqueProfesor(valor);
		}
	}

	listarUniqueProfesor(index: number){
		this.profActual = index;
		let profesor = this.profesores[this.profActual];
		let instituto = this.institutos[this.instActual];

		this.articulos = [];
		this.articuloService.listArticulosByProfesor(profesor.idProfesor)
		.subscribe({
			next: (resArticulos: any) => {

				// Guarda datos
				this.articulos.push({
					"instituto": instituto.nombreInstituto,
					"articulos": resArticulos
				});

				console.log(this.articulos);

			},
			error: err => console.log(err)
		});
	}

}
