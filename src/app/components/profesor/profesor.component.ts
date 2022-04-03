import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { InstitutoService } from 'src/app/services/instituto.service';
import { Instituto } from 'src/app/models/instituto.model';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
	selector: 'app-profesor',
	templateUrl: './profesor.component.html',
	styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {

	@Input() abrirModal!: EventEmitter<boolean>;
	institutoCrear: Instituto = new Instituto();

	constructor(private institutoService: InstitutoService) { }

	ngOnInit(): void {
		$(document).ready(function () {
			$('.modal').modal({
				dismissible: true
			});
		});

		if (this.abrirModal){
			this.abrirModal.subscribe(msg => {
				this.abrirModalProf();
			});
		}
	}

	abrirModalProf(){
		this.institutoCrear = new Instituto();
		$('#agregarInstituto').modal();
		$('#agregarInstituto').modal('open');
	}

	registrarInst(){
		console.log("Creado instituto:", this.institutoCrear);
	}
}