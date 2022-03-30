import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Profesor } from 'src/app/models/profesor.model';
import { ProfesorService } from 'src/app/services/profesor.service';

declare var $: any;

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

	// Profesor
	registroProfesor: Profesor = new Profesor();
	tipoProf: any[] = [];
	tprofActual: any;
	idProfesor: number = 0;
	nivel: any;

	// Institutos
	institutos: any;
	institutoActual: any;

	// carreras
	carreras: any[] = [];
	numCarrerasActual: any;
	carreraActual: any;

	constructor(private router: Router,
				private profesorService: ProfesorService) { }

	ngOnInit(): void {
		this.idProfesor = Number(localStorage.getItem('idProfesor'));
		this.nivel = Number(localStorage.getItem('nivel'));

		$(document).ready(function () {
			$('.sidenav').sidenav();
			$('.modal').modal({ dismissible: true });
			$(".dropdown-trigger").dropdown({ coverTrigger: false });
		});

		this.profesorService.listInstitutos().subscribe({
			next: (resInstitutos: any) => {
				this.institutos = resInstitutos;
				this.institutos = this.institutos.filter((item: any) => item.idInstituto != 9);
				this.institutoActual = this.institutos[0].idInstituto;
				this.profesorService.listCarrerasbyInstituto(this.institutoActual)
				.subscribe({
					next: (resCarreras: any) => {
						this.carreraActual = resCarreras[0].idCarrera;
						this.numCarrerasActual = resCarreras.length;
						this.carreras = resCarreras;
						this.profesorService.listTipoProfesor().subscribe({
							next: (resTipoProf: any) => {
								this.tipoProf = resTipoProf;
								this.tprofActual = this.tipoProf[0].idTipoProfesor;
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

	agregarProfesor(){
		$('#agregarProfesor').modal();
		$('#agregarProfesor').modal('open');
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
				}
			},
			error: err => console.log(err)
		});
	}

	cambioCarrera(op: any){
		this.carreraActual = op.value;
	}

	cambioTipoProf(op: any){
		this.tprofActual = op.value;
	}

	darAltaProfesor(){
		this.registroProfesor.idInstituto = Number(this.institutoActual);
		this.registroProfesor.idCarrera = Number(this.carreraActual);
		this.registroProfesor.idTipoProfesor = Number(this.tprofActual);
		console.log(this.registroProfesor);

		this.profesorService.guardarProfesor(this.registroProfesor).subscribe({
			next: (resNuevo) => console.log(resNuevo)
		});
	}

	logout() {
		console.log("logout");
		localStorage.removeItem("correo");
		localStorage.removeItem("token");
		localStorage.removeItem("idProfesor");
		localStorage.removeItem('nivel');
		this.router.navigateByUrl('/');
	}
}
