import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { InstitutoService } from 'src/app/services/instituto.service';
import { CarreraService } from 'src/app/services/carrera.service';
import { Carrera } from 'src/app/models/carrera.model';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
	selector: 'app-add-carrera',
	templateUrl: './add-carrera.component.html',
	styleUrls: ['./add-carrera.component.css']
})
export class AddCarreraComponent implements OnInit {

	// Para recibir indicación del padre
	@Input() abrirModal!: EventEmitter<boolean>;

	institutos: any[] = [];
	institutoActual: any;
	carreraCrear: Carrera = new Carrera();

	constructor(private institutoService: InstitutoService,
				private carreraService: CarreraService) { }

	ngOnInit(): void {
		$(document).ready(function () {
			$('.modal').modal({
				dismissible: true
			});
		});

		if (this.abrirModal) {
			this.abrirModal.subscribe(msg => {
				this.abrirModalCarr();
			});
		}

		this.institutoService.listInstitutos().subscribe({
			next: (resInstitutos: any) => {
				this.institutos = resInstitutos;
				this.institutos = this.institutos.filter(item => item.idInstituto !== 9);
				this.institutoActual = this.institutos[0].idInstituto;
			}
		});
	}

	abrirModalCarr() {
		this.carreraCrear = new Carrera();
		this.institutoActual = this.institutos[0].idInstituto;
		$('#agregarCarrera').modal();
		$('#agregarCarrera').modal('open');
	}

	cambioInstituto(op: any){
		this.institutoActual = op.value;
	}

	registrarCarrera(){
		this.carreraCrear.idInstituto = Number(this.institutoActual);
		this.carreraService.crearCarrera(this.carreraCrear)
		.subscribe({
			next: (resRegistro: any) => {
				Swal.fire({
					position: "center",
					icon: "success",
					title: `Carrera registrada correctamente`,
				});
			}
		});
	}
}
