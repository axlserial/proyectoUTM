import { Component, OnInit } from '@angular/core';
import { InstitutoService } from 'src/app/services/instituto.service';
import { CarreraService } from 'src/app/services/carrera.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { Profesor } from 'src/app/models/profesor.model';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
	selector: 'app-profesores-jefe',
	templateUrl: './profesores-jefe.component.html',
	styleUrls: ['./profesores-jefe.component.css']
})
export class ProfesoresJefeComponent implements OnInit {

	idProfesor: number = 0;
	datosProf: any;

	profesores: any[] = [];
	editaProf: Profesor = new Profesor();

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

		this.idProfesor = Number(localStorage.getItem('idProfesor'));

		this.profesorService.listOne(this.idProfesor).subscribe({
			next: (resProfesor: any) => {
				this.datosProf = resProfesor;
				this.profesorService.listTipoProfesor().subscribe({
					next: (resTipoProf: any) => {
						this.tipoProf = resTipoProf;
						this.tprofActual = this.tipoProf[0].idTipoProfesor;
						this.profesorService.listProfesoresByInstituto(this.datosProf.idInstituto).subscribe({
							next: (resProfesores: any) => {
								this.profesores = resProfesores;
								console.log("Listo:", this.profesores);
							},
							error: err => console.error(err)
						});
					},
					error: err => console.error(err)
				});
			},
			error: err => console.error(err)
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
				
				// if (this.numCarrerasActual == 0){
				// 	this.cambioInstituto({"value": this.institutoActual});
				// } else {
				// 	this.cambioCarrera({"value": this.carreraActual});
				// }
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
