import { Component, OnInit } from '@angular/core';
import { InstitutoService } from 'src/app/services/instituto.service';
import { CarreraService } from 'src/app/services/carrera.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { Profesor } from 'src/app/models/profesor.model';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
	selector: 'app-profesores-vice',
	templateUrl: './profesores-vice.component.html',
	styleUrls: ['./profesores-vice.component.css']
})
export class ProfesoresViceComponent implements OnInit {

	profesores: any[] = [];
	editaProf: Profesor = new Profesor();

	institutos: any[] = [];
	institutoActual: any;

	carreras: any[] = [];
	numCarrerasActual: any;
	carreraActual: any;

	institutosEdit: any[] = [];
	instActualEdit: any; 
	carrerasEdit: any[] = [];
	numCarrActualEdit: any;
	carrActualEdit: any;

	tipoProf: any[] = [];
	tprofActual: any;

	constructor(private institutoService: InstitutoService,
				private carreraService: CarreraService,
				private profesorService: ProfesorService) { }

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

		this.profesorService.listTipoProfesor().subscribe({
			next: (resTipoProf: any) => {
				this.tipoProf = resTipoProf;
				this.tprofActual = this.tipoProf[0].idTipoProfesor;
				this.institutoService.listInstitutos().subscribe({
					next: (resInstitutos: any) => {

						// Para listado
						this.institutos = resInstitutos;
						this.institutos = this.institutos.filter((item: any) => item.idInstituto != 9);
						this.institutoActual = this.institutos[0].idInstituto;

						// Para modal
						this.institutosEdit = this.institutos.map(item => {return {...item}});
						this.instActualEdit = this.institutoActual;

						this.carreraService.listCarrerasbyInstituto(this.institutoActual)
						.subscribe({
							next: (resCarreras: any) => {
								
								// Para listado
								this.carreras = resCarreras;
								this.carreraActual = this.carreras[0].idCarrera;
								this.numCarrerasActual = this.carreras.length;

								// Para modal
								this.carrerasEdit = this.carreras.map(item => {return {...item}});
								this.carrActualEdit = this.carreraActual;
								this.numCarrActualEdit = this.numCarrerasActual;

								this.profesorService.listProfesoresByCarrera(this.carreraActual)
								.subscribe({
									next: (resProfesores: any) => {
										this.profesores = resProfesores;
										console.log("carreras:", this.carreras);
										console.log("Listo:", this.profesores);
									},
									error: err => console.log(err)
								});
							},
							error: err => console.log(err)
						});
					},
					error: (err) => console.log(err)
				});
			},
			error: err => console.log(err)
		});

	}


	modificarProfesor(index: any){
		this.editaProf = this.profesores[index];
		this.instActualEdit = this.editaProf.idInstituto;
		this.tprofActual = this.editaProf.idTipoProfesor;
		this.carreraService.listCarrerasbyInstituto(this.instActualEdit)
		.subscribe({
			next: (resCarreras: any) => {
				this.numCarrActualEdit = resCarreras.length;
				if (this.numCarrActualEdit == 0){
					this.carrActualEdit = 0;
				} else {
					this.carrerasEdit = resCarreras;
					this.carrActualEdit = this.editaProf.idCarrera;
				}
				$('#editarProfesor').modal();
				$('#editarProfesor').modal('open');
			},
			error: err => console.log(err)
		});
	}

	cambioInstituto(op: any){
		this.institutoActual = op.value;
		this.carreraService.listCarrerasbyInstituto(this.institutoActual)
		.subscribe({
			next: (resCarreras: any) => {
				this.numCarrerasActual = resCarreras.length;
				if (this.numCarrerasActual == 0){
					this.carreraActual = 0;
					this.profesorService.listProfesoresByInstituto(this.institutoActual).
					subscribe((resProfi: any) =>{
						this.profesores = resProfi;
					});
				} else {
					this.carreras = resCarreras;
					this.cambioCarrera({"value": this.carreras[0].idCarrera});
				}
			},
			error: err => console.log(err)
		});
	}

	cambioCarrera(op: any){
		this.carreraActual = op.value;
		this.profesorService.listProfesoresByCarrera(this.carreraActual)
		.subscribe({
			next: (resProfesores: any) => {
				this.profesores = resProfesores;
			},
			error: err => console.log(err)
		});
	}

	cambioInstitutoEdit(op: any){
		this.instActualEdit = op.value;
		this.carreraService.listCarrerasbyInstituto(this.instActualEdit)
		.subscribe({
			next: (resCarreras: any) => {
				this.numCarrActualEdit = resCarreras.length;
				if (this.numCarrActualEdit == 0){
					this.carrActualEdit = 0;
				} else {
					this.carrerasEdit = resCarreras;
					this.carrActualEdit = this.carrerasEdit[0].idCarrera;
				}
			},
			error: err => console.log(err)
		});
	}

	cambioCarreraEdit(op: any){
		this.carrActualEdit = op.value;
	}

	cambiarDatosProf(){
		this.editaProf.idInstituto = Number(this.instActualEdit);
		this.editaProf.idCarrera = Number(this.carrActualEdit);
		this.editaProf.idTipoProfesor = Number(this.tprofActual);
		console.log("edit prof:", this.editaProf);
		
		this.profesorService.actualizarProfesor(this.editaProf.idProfesor, this.editaProf)
			.subscribe(resEdita => {
				console.log(resEdita);
				
				if (this.numCarrerasActual == 0){
					this.cambioInstituto({"value": this.institutoActual});
				} else {
					this.cambioCarrera({"value": this.carreraActual});
				}
			});
	}

	eliminarProfesor(index: any, idProfesor: any){
		Swal.fire({
			title: '¿Eliminar al profesor?',
			showDenyButton: true,
			confirmButtonText: 'Eliminar',
			denyButtonText: `Cancelar`,
		}).then((result) => {
			if (result.isConfirmed) {
				this.profesorService.eliminarProfesor(idProfesor)
				.subscribe({
					next: (resEliminar: any) => {
						console.log(resEliminar);
						Swal.fire({
							position: "center",
							icon: "success",
							title: `Profesor eliminado`,
						});

						// elimina profesor de array
						this.profesores.splice(index, 1);
					}
				});
			}
		});
	}

	cambioTipoProf(op: any){
		this.tprofActual = op.value;
	}

}
