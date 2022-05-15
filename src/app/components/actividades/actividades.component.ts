import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { InstitutoService } from 'src/app/services/instituto.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { ActividadService } from 'src/app/services/actividad.service';
import { TranslateService } from "@ngx-translate/core";
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';

@Component({
	selector: 'app-actividades',
	templateUrl: './actividades.component.html',
	styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

	// datos prof
	nivel = 0;
	idProfesor = 0;

	// Para datos de institutos
	institutos: any[] = [];
	instActual: number = 0;

	// Para datos de profesores
	profesores: any[] = [];
	profActual: number = 0;

	// Para datos de actividades
	actividades: any[] = [];

	// Para filtro por fechas
	ini: any;
	fin: any;

	constructor(private institutoService: InstitutoService,
				private profesorService: ProfesorService,
				private actividadService: ActividadService,
				private translate: TranslateService,
				private cambioIdiomaService: CambioIdiomaService,
				private datePipe: DatePipe) {

		let hoy = new Date();

		// Obtiene fecha de hoy
		this.fin = this.datePipe.transform(hoy, "yyyy-MM-dd");
					
		// Obtiene fecha de un mes atrás
		hoy.setMonth(hoy.getMonth() - 1);
		this.ini = this.datePipe.transform(hoy, "yyyy-MM-dd");

		this.nivel = Number(localStorage.getItem("nivel"));
		this.idProfesor = Number(localStorage.getItem("idProfesor"));

		this.translate.addLangs(["es", "en"]);
		this.translate.setDefaultLang("es");

		this.cambioIdiomaService.currentMsg$
		.subscribe(idioma => {
			this.translate.use(idioma);
		});
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
				this.actividades = [];

				// Verifica si es el vice
				if (this.nivel == 1){
					this.institutos.forEach(instituto => {
						this.actividadService.listActividadesByInstituto(instituto.idInstituto)
						.subscribe({
							next: (resActividades: any) => {
								this.actividades.push({
									"instituto": instituto.nombreInstituto,
									"actividades": resActividades
								});
							},
							error: err => console.error(err)
						});
					});
				}
				
				// director de instituto
				else {
					this.profesorService.listOne(this.idProfesor)
					.subscribe({
						next: (resProfesor: any) => {
							inst = this.institutos.findIndex(instituto => instituto.idInstituto === resProfesor.idInstituto);
							this.listarUniqueInstituto(inst);
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

		this.actividades = [];
		this.actividadService.listActividadesByInstituto(instituto.idInstituto).
		subscribe({
			next: (resActividades: any) => {

				// Guarda datos
				this.actividades.push({
					"instituto": instituto.nombreInstituto,
					"actividades": resActividades
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

		this.actividades = [];
		this.actividadService.listActividadesByProfesor(profesor.idProfesor)
		.subscribe({
			next: (resActividades: any) => {
				this.actividades.push({
					"instituto": instituto.nombreInstituto,
					"actividades": resActividades
				});
			},
			error: err => console.error(err)
		});
	}


}
