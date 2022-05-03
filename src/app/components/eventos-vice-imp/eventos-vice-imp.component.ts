import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { InstitutoService } from 'src/app/services/instituto.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { EventoService } from 'src/app/services/evento.service';

@Component({
	selector: 'app-eventos-vice-imp',
	templateUrl: './eventos-vice-imp.component.html',
	styleUrls: ['./eventos-vice-imp.component.css']
})
export class EventosViceImpComponent implements OnInit {

	// Para datos de institutos
	institutos: any[] = [];
	instActual: number = 0;

	// Para datos de profesores
	profesores: any[] = [];
	profActual: number = 0;

	// Para datos de eventos
	eventos: any[] = [];

	// Para filtro por fechas
	ini: any;
	fin: any;

	constructor(private institutoService: InstitutoService,
				private profesorService: ProfesorService,
				private eventoService: EventoService,
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

				// obtiene eventos por instituto
				this.eventos = [];
				this.institutos.forEach(instituto => {
					this.eventoService.listEventosByInstituto(instituto.idInstituto)
					.subscribe({
						next: (resEventos: any) => {
							this.eventos.push({
								"instituto": instituto.nombreInstituto,
								"eventos": resEventos
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

		this.eventos = [];
		this.eventoService.listEventosByInstituto(instituto.idInstituto)
		.subscribe({
			next: (resEventos: any) => {

				// Guarda datos
				this.eventos.push({
					"instituto": instituto.nombreInstituto,
					"eventos": resEventos
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

		this.eventos = [];
		this.eventoService.listEventosByProfesor(profesor.idProfesor)
		.subscribe({
			next: (resEventos: any) => {
				this.eventos.push({
					"instituto": instituto.nombreInstituto,
					"eventos": resEventos
				});
			},
			error: err => console.error(err)
		});
	}
}
