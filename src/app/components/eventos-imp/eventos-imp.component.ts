import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { InstitutoService } from 'src/app/services/instituto.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { EventoService } from 'src/app/services/evento.service';

@Component({
	selector: 'app-eventos-imp',
	templateUrl: './eventos-imp.component.html',
	styleUrls: ['./eventos-imp.component.css']
})
export class EventosImpComponent implements OnInit {

	// datos prof
	nivel = 0;
	idProfesor = 0;

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

		this.nivel = Number(localStorage.getItem("nivel"));
		this.idProfesor = Number(localStorage.getItem("idProfesor"));
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
		let inst: number;

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

				// limpia arreglo
				this.eventos = [];

				// Verifica si es el vice
				if (this.nivel == 1){
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
				
				// director de instituto o jefe de carrera
				else if (this.nivel == 2 || this.nivel == 3) {
					this.profesorService.listOne(this.idProfesor)
					.subscribe({
						next: (resProfesor: any) => {
							inst = this.institutos.findIndex(instituto => instituto.idInstituto === resProfesor.idInstituto);
							this.listarUniqueInstituto(inst);
						},
						error: err => console.error(err)
					});
				}

				// profesor normal
				else {
					this.profesorService.listOne(this.idProfesor)
					.subscribe({
						next: (resProfesor: any) => {
							this.eventoService.listEventosByProfesor(resProfesor.idProfesor)
							.subscribe({
								next: (resEventos: any) => {
									this.eventos.push({
										"instituto": `${resProfesor.nombres} ${resProfesor.apellidoPaterno} ${resProfesor.apellidoMaterno}`,
										"eventos": resEventos
									});
								},
								error: err => console.error(err)
							});
						},
						error: err => console.error(err)
					});
				}

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
