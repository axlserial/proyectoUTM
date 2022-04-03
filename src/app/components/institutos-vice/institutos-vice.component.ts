import { Component, OnInit } from '@angular/core';
import { InstitutoService } from 'src/app/services/instituto.service';
import { Instituto } from 'src/app/models/instituto.model';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
	selector: 'app-institutos-vice',
	templateUrl: './institutos-vice.component.html',
	styleUrls: ['./institutos-vice.component.css']
})
export class InstitutosViceComponent implements OnInit {

	institutos: any[] = [];
	institutoActual: Instituto = new Instituto();

	constructor(private institutoService: InstitutoService) { }

	ngOnInit(): void {
		$(document).ready(function () {
			$('.modal').modal({
				dismissible: true
			});
		});

		this.obtenerInstitutos();
	}

	obtenerInstitutos() {
		this.institutoService.listInstitutos().subscribe({
			next: (resInstitutos: any) => {
				this.institutos = resInstitutos;
				this.institutos = this.institutos.filter(item => item.idInstituto !== 9);
			},
			error: err => console.log(err)
		});
	}

	modificaInstituto(index: any) {
		this.institutoActual = this.institutos[index];
		$('#editarInstituto').modal();
		$('#editarInstituto').modal('open');
	}

	cambiarDatosInst() {
		console.log("Editado:", this.institutoActual);
		this.institutoService.actualizarInstituto(this.institutoActual)
		.subscribe({
			next: (resEdit: any) => this.obtenerInstitutos()
		});
	}

	eliminarInstituto(index: any, idInstituto: any) {
		Swal.fire({
			title: '¿Eliminar el instituto?',
			showDenyButton: true,
			confirmButtonText: 'Eliminar',
			denyButtonText: `Cancelar`,
		}).then((result) => {
			if (result.isConfirmed) {
				this.institutoService.numCarreras(idInstituto)
				.subscribe({
					next: (resNum: any) => {
						if (resNum === 0){
							this.institutoService.eliminaInstituto(idInstituto)
							.subscribe({
								next: (resEliminar: any) => {
									Swal.fire({
										position: "center",
										icon: "success",
										title: `Instituto eliminado`,
									});

									// elimina instituto de array
									this.institutos.splice(index, 1);
								}
							});
						} else {
							Swal.fire({
								position: "center",
								icon: "error",
								title: `Instituto con carreras registradas`,
							});					
						}
					}
				});
			}
		});
	}

}
