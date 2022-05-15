import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Articulo } from '../../models/articulo.model';
import { ArticuloService } from 'src/app/services/articulo.service';
import { CambioInfoService } from '../../services/cambio-info.service';
import { TranslateService } from "@ngx-translate/core";
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';

declare var $: any;

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	idProfesor: number;

	articulito: Articulo;
	tipoCLR: string[] = ['Revista', 'Congreso', 'Libro'];
	clrActual: string = '';

	constructor(private cambioInfoService: CambioInfoService,
				private articuloService: ArticuloService,
				private translate: TranslateService,
				private cambioIdiomaService: CambioIdiomaService) {

		this.articulito = new Articulo();
		this.idProfesor = Number(localStorage.getItem("idProfesor"));

		this.translate.addLangs(["es", "en"]);
		this.translate.setDefaultLang("es");

		this.cambioIdiomaService.currentMsg$
		.subscribe(idioma => {
			this.translate.use(idioma);
		});

		console.log("idprofesor:", this.idProfesor);
	}

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
	}

	agregarArticulo(){
		this.clrActual = this.tipoCLR[0];
		$('#agregarArticulo').modal();
		$('#agregarArticulo').modal('open');
	}

	darAltaArticulo(){
		const fecha = <HTMLInputElement> document.getElementById('fecha');
		this.articulito.fechaedicion = fecha.value;
		this.articulito.tipoCRL = this.clrActual;
		console.log(this.articulito);
		
		this.articuloService.crearArticulo(this.idProfesor, this.articulito)
		.subscribe({
			next: (resArticulo: any) => {
				console.log(resArticulo);
				
				Swal.fire({
					position: "center",
					icon: "success",
					title: `Artículo creado exitosamente`,
					showConfirmButton: true,
				});

				this.enviarMensajeArticulo();
			}
		});	
	}

	enviarMensajeArticulo() {
		this.cambioInfoService.enviar();
	}

	cambioCLR(op: any){
		this.clrActual = op.value;
		console.log("clrActual:", this.clrActual);
	}

}