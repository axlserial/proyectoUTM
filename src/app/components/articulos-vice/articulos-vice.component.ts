import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticuloService } from 'src/app/services/articulo.service';
import { ProfesorService } from 'src/app/services/profesor.service';


//profesores-vice
import { Profesor } from 'src/app/models/profesor.model';
declare var $: any;


@Component({
	selector: 'app-articulos-vice',
	templateUrl: './articulos-vice.component.html',
	styleUrls: ['./articulos-vice.component.css']
})
export class ArticulosViceComponent implements OnInit {

	idProfesor: number = 0;
	articulos: any;
	autores: any[] = [];
	profesores: any[] = [];
	ini: string;
	fin: any;

	// profesores-vice
	editaProf: Profesor = new Profesor();
	institutos: any;
	institutoActual: any;
	numCarrerasActual: any;
	carreras: any[] = [];
	carreraActual: any;
	tipoProf: any[] = [];
	tprofActual: any;

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

		this.router.paramMap.subscribe(params => {
			this.idProfesor = Number(params.get('idProfesor'));
			this.articuloService.listArticulosByProfesor(this.idProfesor).subscribe({
				next: (resArticulos: any) => {
					this.articulos = resArticulos;
					this.articulos.forEach((articulo: any) => {
						this.profesorService.listAutoresByArticulo(articulo.idArticulo).subscribe({
							next: (resAutor: any) => {
								this.autores.push(resAutor);
								this.profesorService.list().subscribe({
									next: (resProfesores: any) => {
										this.profesores = resProfesores;
										// console.log(this.profesores);


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
																console.log("Tipo:", this.tipoProf, " Actual:", this.tprofActual);
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
								});
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


	// profesores-vice
	modificarProfesor(index: any){
		console.log("edit: ", this.profesores[index]);
		this.editaProf = this.profesores[index];
		this.institutoActual = this.editaProf.idInstituto;
		this.profesorService.listCarrerasbyInstituto(this.institutoActual)
		.subscribe({
			next: (resCarreras: any) => {
				this.numCarrerasActual = resCarreras.length;
				if (this.numCarrerasActual == 0){
					this.carreraActual = 0;
				} else {
					this.carreras = resCarreras;
					this.carreraActual = this.editaProf.idCarrera;
				}
				$('#editarProfesor').modal();
				$('#editarProfesor').modal('open');
			},
			error: err => console.log(err)
		});
	}

	cambioInstituto(op: any){
		this.institutoActual = op.value;
		this.profesorService.listCarrerasbyInstituto(this.institutoActual)
		.subscribe({
			next: (resCarreras: any) => {
				// console.log(resCarreras);
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
		console.log("op carrera:", op.value);
		this.carreraActual = op.value;
	}

	cambiarDatosProf(){
		this.editaProf.idInstituto = Number(this.institutoActual);
		this.editaProf.idCarrera = Number(this.carreraActual);
		this.editaProf.idTipoProfesor = Number(this.tprofActual);
		console.log("edit prof:", this.editaProf);
		
		this.profesorService.actualizarProfesor(this.editaProf.idProfesor, this.editaProf)
			.subscribe(resEdita => console.log(resEdita));
	}

	cambioTipoProf(op: any){
		console.log("cambio tprof:", op.value);
		this.tprofActual = op.value;
	}
}
