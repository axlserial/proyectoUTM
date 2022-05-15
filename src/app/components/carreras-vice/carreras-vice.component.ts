import { Component, OnInit } from '@angular/core';
import { InstitutoService } from 'src/app/services/instituto.service';
import { CarreraService } from 'src/app/services/carrera.service';
import { Carrera } from 'src/app/models/carrera.model';
import { TranslateService } from "@ngx-translate/core";
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
	selector: 'app-carreras-vice',
	templateUrl: './carreras-vice.component.html',
	styleUrls: ['./carreras-vice.component.css']
})
export class CarrerasViceComponent implements OnInit {

	institutos: any[] = [];
	institutoActual: any;
	carreras: any[] = [];
	numCarrerasActual: number = 0;
	carreraActual: Carrera = new Carrera();
	carrBackup: Carrera = new Carrera();

	institutosEdit: any[] = [];
	instActualEdit: any;

	tituloAlerta: string = "¿Eliminar la carrera?";

	constructor(private institutoService: InstitutoService,
				private carreraService: CarreraService,
				private translate: TranslateService,
				private cambioIdiomaService: CambioIdiomaService) {

		this.translate.addLangs(["es", "en"]);
		this.translate.setDefaultLang("es");
			
		this.cambioIdiomaService.currentMsg$
		.subscribe(idioma => {
			this.translate.use(idioma);
		});

		this.translate.get("¿Eliminar la carrera?").subscribe({
			next: (resTrad) => {
				console.log(resTrad);
			}
		});
	}

	ngOnInit(): void {
		$(document).ready(function () {
			$('.modal').modal({
				dismissible: true
			});
			$('select').formSelect();
		});
	
		this.institutoService.listInstitutos().subscribe({
			next: (resInstitutos: any) => {
				this.institutos = resInstitutos;
				this.institutos = this.institutos.filter(item => item.idInstituto !== 9);
				this.institutoActual = this.institutos[0].idInstituto;

				// para listado
				this.institutosEdit = this.institutos.map(item => {return {...item}});
				this.instActualEdit = this.institutoActual;

				this.carreraService.listCarrerasbyInstituto(this.institutoActual)
				.subscribe({
					next: (resCarreras: any) => {
						this.carreras = resCarreras;
						this.numCarrerasActual = this.carreras.length;
					}
				});
			}
		});
	}

	cambioInstituto(op: any){
		this.institutoActual = op.value;
		this.carreraService.listCarrerasbyInstituto(this.institutoActual)
		.subscribe({
			next: (resCarreras: any) => {
				this.carreras = resCarreras;
				this.numCarrerasActual = this.carreras.length;
			},
			error: err => console.log(err)
		});
	}

	cambioInstitutoEdit(op: any){
		this.instActualEdit = op.value;
	}

	modificarCarrera(index: any){
		this.carreraActual = this.carreras[index];
		this.instActualEdit = this.carreraActual.idInstituto;
		console.log("editar:", this.carreraActual);
		$('#editarCarrera').modal();
		$('#editarCarrera').modal('open');
	}

	eliminarCarrera(index: any, idCarrera: any){
		Swal.fire({
			title: '¿Eliminar la carrera?',
			showDenyButton: true,
			confirmButtonText: 'Eliminar',
			denyButtonText: `Cancelar`,
		}).then((result) => {
			if (result.isConfirmed) {
				this.carreraService.eliminarCarrera(idCarrera)
				.subscribe({
					next: (resEliminar: any) => {
						Swal.fire({
							position: "center",
							icon: "success",
							title: `Carrera eliminada`,
						});

						// elimina carrera de array
						this.carreras.splice(index, 1);
						this.numCarrerasActual = this.carreras.length;
					}
				});
			}
		});
	}

	cambiarDatosCarr(){
		this.carreraActual.idInstituto = Number(this.instActualEdit);
		console.log("cambiar:", this.carreraActual);
		this.carreraService.actulizarCarrera(this.carreraActual)
		.subscribe({
			next: (resEdit: any) => {
				console.log(resEdit);
				this.cambioInstituto({"value": this.institutoActual});
			},
			error: err => console.log(err)
		});
	}

}
