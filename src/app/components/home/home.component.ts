import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../models/articulo.model';
import { Profesor } from 'src/app/models/profesor.model';

import { ProfesorService } from 'src/app/services/profesor.service';
import { ArticuloService } from 'src/app/services/articulo.service';

declare var $: any;

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	idProfesor: number;

	articulito: Articulo;
	tipoCLR: string[] = ['Revista', 'Congreso', 'Libro'];
	institutos: any;
	institutoActual: any;
	numCarrerasActual: any;
	carreras: any[] = [];
	carreraActual: any;
	profesores: any[] = [];

	// Para modal profesor
	registroProfesor: Profesor;
	tipoProf: any[] = [];
	tprofActual: any;

	constructor(private profesorService: ProfesorService,
				private articuloService: ArticuloService) {
		this.articulito = new Articulo();
		this.registroProfesor = new Profesor();
		this.idProfesor = Number(localStorage.getItem("idProfesor"));

		console.log("idprofesor:", this.idProfesor);
	}

	ngOnInit(): void {
		$(document).ready(function () {
			$('.fixed-action-btn').floatingActionButton({
				direction: 'left',
				hoverEnabled: false
			});
			$('.modal').modal({
				dismissible: true
			});
			$('select').formSelect();
		});

		this.profesorService.listInstitutos().subscribe({
			next: (resInstitutos: any) => {
				this.institutos = resInstitutos;
				console.log("Institutos:", this.institutos);
				this.institutos = this.institutos.filter((item: any) => item.idInstituto != 9);
				this.institutoActual = this.institutos[0].idInstituto;
				this.profesorService.listCarrerasbyInstituto(this.institutoActual)
				.subscribe({
					next: (resCarreras: any) => {
						this.carreraActual = resCarreras[0].idCarrera;
						this.numCarrerasActual = resCarreras.length;
						this.carreras = resCarreras;
						this.profesorService.listProfesoresByCarrera(this.carreraActual)
						.subscribe({
							next: (resProfesores: any) => {
								this.profesores = resProfesores;
								this.profesorService.listTipoProfesor().subscribe({
									next: (resTipoProf: any) => {
										this.tipoProf = resTipoProf;
										this.tprofActual = this.tipoProf[0].idTipoProfesor;
										console.log("Tipo:", this.tipoProf, " Actual:", this.tprofActual);
									},
									error: err => console.log(err)
								});
							},
							error: err => console.log(err)
						});
					},
					error: err => console.log(err)
				});
			},
			error: (err) => console.log(err)
		});
	}

	agregarArticulo(){
		console.log("agregar articulo");
		$('#agregarArticulo').modal();
		$('#agregarArticulo').modal('open');
	}

	darAltaArticulo(){
		console.log(this.articulito);
		this.articuloService.crearArticulo(this.idProfesor, this.articulito)
			.subscribe({
				next: (resArticulo: any) => console.log(resArticulo)
			});	
	}

	agregarProfesor(){
		console.log("agregar profesor");
		$('#agregarProfesor').modal();
		$('#agregarProfesor').modal('open');
	}

	darAltaProfesor(){
		// this.registroProfesor.idInstituto = this.institutoActual;
		this.registroProfesor.idInstituto = Number(this.institutoActual);
		this.registroProfesor.idCarrera = Number(this.carreraActual);
		this.registroProfesor.idTipoProfesor = Number(this.tprofActual);
		console.log(this.registroProfesor);

		this.profesorService.guardarProfesor(this.registroProfesor).subscribe({
			next: (resNuevo) => console.log(resNuevo)
		});
	}

	cambioInstituto(op: any){
		this.institutoActual = op.value;
		this.profesorService.listCarrerasbyInstituto(this.institutoActual)
		.subscribe({
			next: (resCarreras: any) => {
				console.log(resCarreras);
				this.numCarrerasActual = resCarreras.length;
				if (this.numCarrerasActual == 0){
					this.carreraActual = 0;
				} else {
					this.carreras = resCarreras;
					this.carreraActual = resCarreras[0].idCarrera;
					this.profesorService.listProfesoresByInstituto(this.carreraActual)
					.subscribe({
						next: (resProfesores: any) => {
							this.profesores = resProfesores;
						},
						error: err => console.log(err)
					});
				}
			},
			error: err => console.log(err)
		});
	}

	cambioCarrera(op: any){
		console.log("op carrera:", op.value);
		this.carreraActual = op.value;
	}

	cambioTipoProf(op: any){
		console.log("cambio tprof:", op.value);
		this.tprofActual = op.value;
	}
	
}
