import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { InstitutoService } from 'src/app/services/instituto.service';
import { Instituto } from 'src/app/models/instituto.model';
import { TranslateService } from "@ngx-translate/core";
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
	selector: 'app-add-instituto',
	templateUrl: './add-instituto.component.html',
	styleUrls: ['./add-instituto.component.css']
})
export class AddInstitutoComponent implements OnInit {

	// Para recibir indicación del padre
	@Input() abrirModal!: EventEmitter<boolean>;

	// Datos del instituto a crear
	institutoCrear: Instituto = new Instituto();

	constructor(private institutoService: InstitutoService,
				private translate: TranslateService,
				private cambioIdiomaService: CambioIdiomaService) {

		this.translate.addLangs(["es", "en"]);
		this.translate.setDefaultLang("es");
			
		this.cambioIdiomaService.currentMsg$
		.subscribe(idioma => {
			this.translate.use(idioma);
		});
	}

	ngOnInit(): void {
		$(document).ready(function () {
			$('.modal').modal({
				dismissible: true
			});
		});

		if (this.abrirModal) {
			this.abrirModal.subscribe(msg => {
				this.abrirModalInst();
			});
		}
	}

	abrirModalInst() {
		this.institutoCrear = new Instituto();
		$('#agregarInstituto').modal();
		$('#agregarInstituto').modal('open');
	}

	registrarInst() {
		this.institutoService.crearInstituto(this.institutoCrear)
		.subscribe({
			next: (resRegistro: any) => {
				Swal.fire({
					position: "center",
					icon: "success",
					title: `Instituto registrado correctamente`,
				});
			}
		});
	}
}
