import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Articulo } from '../../models/articulo.model';
import { ArticuloService } from 'src/app/services/articulo.service';

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

	constructor(private router: Router,
				private articuloService: ArticuloService) {
		this.articulito = new Articulo();
		this.idProfesor = Number(localStorage.getItem("idProfesor"));

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
				let rutaArticulo = "/home/articulos/" + this.idProfesor;
				if (this.router.url == rutaArticulo){
					console.log("Recarga");
					this.router.routeReuseStrategy.shouldReuseRoute = () => false;
					this.router.onSameUrlNavigation = 'reload';
					this.router.navigate([this.router.url]);
				}
			}
		});	
	}

	cambioCLR(op: any){
		this.clrActual = op.value;
		console.log("clrActual:", this.clrActual);
	}

}
