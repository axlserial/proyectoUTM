import { Component, OnInit } from '@angular/core';
import { ProfesorService } from 'src/app/services/profesor.service';
import { Profesor } from 'src/app/models/profesor.model';

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

	constructor(private profesorService: ProfesorService) { }

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

}
