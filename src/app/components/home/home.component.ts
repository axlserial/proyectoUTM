import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../models/articulo.model';

import {ProfesorService} from 'src/app/services/profesor.service';

declare var $: any;

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	articulito: Articulo;
	tipoCLR: string[] = ['Revista', 'Congreso', 'Libro'];
	institutos: any;
	institutoActual: any;
	numCarrerasActual: any;
	carreras: any[] = [];
	profesores: any[] = [];

	constructor(private profesorService: ProfesorService) {
		this.articulito = new Articulo();
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
				this.institutoActual = this.institutos[0].idInstituto;
				this.profesorService.listCarrerasbyInstituto(this.institutoActual)
				.subscribe({
					next: (resCarreras: any) => {
						this.numCarrerasActual = resCarreras.length;
						this.carreras = resCarreras;
						this.profesorService.listProfesoresByInstituto(this.institutoActual)
						.subscribe({
							next: (resProfesores: any) => {
								this.profesores = resProfesores;
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
	}

	cambioInstituto(op: any){
		this.institutoActual = op.value;
		this.profesorService.listCarrerasbyInstituto(this.institutoActual)
		.subscribe({
			next: (resCarreras: any) => {
				this.numCarrerasActual = resCarreras.length;
				this.carreras = resCarreras;
				this.profesorService.listProfesoresByInstituto(this.institutoActual)
				.subscribe({
					next: (resProfesores: any) => {
						this.profesores = resProfesores;
					},
					error: err => console.log(err)
				});
			},
			error: err => console.log(err)
		});
	}
}
