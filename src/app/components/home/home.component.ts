import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Articulo } from '../../models/articulo.model';
import { ArticuloService } from 'src/app/services/articulo.service';
import { CambioInfoService } from '../../services/cambio-info.service';

import { 	Packer, Document, Paragraph, TextRun, AlignmentType, Table, 
			TableRow, TableCell, VerticalAlign, WidthType, HeightRule, ShadingType	} from 'docx';

import { saveAs } from 'file-saver';

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

	indexInstitutoArticulosExportar: number = 0;
	institutos: any[] = [];

	constructor(private router: Router,
				private cambioInfoService: CambioInfoService,
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

	// ---------

	arregloALista(elementos: any[]): Paragraph[] { 
		let lista: Paragraph[] = []; 
		elementos.forEach(elemento => { 
			lista.push(new Paragraph({
				text: `${elemento.nombres} ${elemento.apellidoPaterno} ${elemento.apellidoMaterno}`, 
				bullet: { 
					level: 0 
				}, 
				alignment: AlignmentType.LEFT 
			}));
		 }); 
		 
		 return lista;
		
	}

	arregloAFilas(articulos: any[]): TableRow[] { 
		let filas: TableRow[] = []; 
		articulos.forEach((articulo, i) => {
			const relleno = (i % 2 == 0 ? rellenoVerdeClaro : rellenoVerdeFuerte);
			let fila = new TableRow({
				children: [ 
					new TableCell({
						shading: relleno, 
						margins: margenes, 
						children: [ 
							new Paragraph({ 
								text: `${articulo.fechaEdicion}`, 
								alignment: AlignmentType.CENTER
							})
						], 
						verticalAlign: VerticalAlign.CENTER }), 
						new TableCell({ 
							shading: relleno, 
							margins: margenes, 
							children: [ 
								new Paragraph({ 
									text: `${articulo.titulo}`, 
									alignment: AlignmentType.CENTER 
								}) 
							], 
							verticalAlign: VerticalAlign.CENTER 
						}), 
						new TableCell({ 
							shading: relleno, 
							margins: margenes, 
							children: [ ...this.arregloALista(articulo.profesores) ], 
							verticalAlign: VerticalAlign.CENTER 
						})
				]
			}); 
			
			filas.push(fila); 
		}); 
		
		return filas;
	}


}


/**
 * Estilos para el word
 */

const margenes = { 
	top: 100, 
	bottom: 100, 
	left: 100, 
	right: 100 
} 

const rellenoVerdeClaro = {
	type: ShadingType.CLEAR, 
	color: 'e8f5e9', 
	fill: 'e8f5e9' 
} 

const rellenoVerdeFuerte = { 
	type: ShadingType.CLEAR, 
	color: 'a5d6a7', 
	fill: 'a5d6a7'
}
