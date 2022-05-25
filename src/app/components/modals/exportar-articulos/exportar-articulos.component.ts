import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/services/articulo.service';
import { InstitutoService } from 'src/app/services/instituto.service';
import { TranslateService } from "@ngx-translate/core";
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';
import { 	Packer, Document, Paragraph, TextRun, AlignmentType, Table, 
	TableRow, TableCell, VerticalAlign, WidthType, HeightRule, ShadingType	} from 'docx';
import { saveAs } from 'file-saver';

declare var $: any;

@Component({
	selector: 'app-exportar-articulos',
	templateUrl: './exportar-articulos.component.html',
	styleUrls: ['./exportar-articulos.component.css']
})
export class ExportarArticulosComponent implements OnInit {

	// Para recibir indicación del padre
	@Input() abrirModal!: EventEmitter<boolean>;

	indexInstitutoArticulosExportar: number = 0;
	institutos: any[] = [];

	constructor(private institutoService: InstitutoService,
				private articuloService: ArticuloService,
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
			$('select').formSelect();
		});

		if (this.abrirModal) {
			this.abrirModal.subscribe(msg => {
				this.abrirModalRegA();
			});
		}
	
		this.institutoService.listInstitutos()
		.subscribe({
			next: (resInstitutos: any) => {
				this.institutos = resInstitutos;
				this.institutos = this.institutos.filter(instituto => instituto.idInstituto != 9);
			},
			error: err => console.error(err)
		});
	}

	abrirModalRegA() {
		$('#exportarArticulos').modal();
		$('#exportarArticulos').modal('open');
	}

	arregloALista(elementos: any): Paragraph[] { 
		let lista: Paragraph[] = [];
		lista.push(new Paragraph({
			text: `${elementos.nombres} ${elementos.apellidoPaterno} ${elementos.apellidoMaterno}`, 
			bullet: { 
				level: 0 
			}, 
			alignment: AlignmentType.LEFT 
		}));
		// elementos.forEach(elemento => { 
		// 	lista.push(new Paragraph({
		// 		text: `${elemento.nombres} ${elemento.apellidoPaterno} ${elemento.apellidoMaterno}`, 
		// 		bullet: { 
		// 			level: 0 
		// 		}, 
		// 		alignment: AlignmentType.LEFT 
		// 	}));
		//  }); 
		 
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
								text: `${articulo.fechaedicion}`, 
								alignment: AlignmentType.CENTER
							})
						], 
						verticalAlign: VerticalAlign.CENTER 
					}), 
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
						children: [ ...this.arregloALista(articulo) ], 
						verticalAlign: VerticalAlign.CENTER 
					})
				]
			}); 
			
			filas.push(fila); 
		}); 
		
		return filas;
	}

	exportarArticulosWord() { 
		// Obtener Articulos 
		let id = this.institutos[this.indexInstitutoArticulosExportar].idInstituto; 
		let nombre = this.institutos[this.indexInstitutoArticulosExportar].nombreInstituto;
		this.articuloService.listArticulosByInstituto(id).subscribe((articulosRes: any) => {
			
			// Crear documento 
			const documento = new Document({ 
				// Estilos globales 
				styles: { 
					default: { 
						document: { 
							run: { 
								font: 'Arial' 
							} 
						} 
					} 
				}, 
				sections: [{ 
					children: [ 
						// Título 
						new Paragraph({ 
							children: [ 
								new TextRun({ 
									text: `Artículos de: ${nombre}`, 
									size: 36 
								}) 
							], 
							alignment: AlignmentType.CENTER 
						}), 
						// Tabla de Articulos 
						new Table({ 
							rows: [ 
								// Encabezado 
								new TableRow({
									tableHeader: true, 
									height: { 
										 value: 400, 
										 rule: HeightRule.EXACT 
									}, 
									children: [ 
										new TableCell({ 
											shading: rellenoVerdeFuerte, 
											children: [ 
												new Paragraph({ 
													text: 'Fecha', 
													alignment: AlignmentType.CENTER 
												}) 
											],
											verticalAlign: VerticalAlign.CENTER 
										}), 
										new TableCell({ 
											shading: rellenoVerdeFuerte, 
											children: [ 
												new Paragraph({ 
													text: 'Título', 
													alignment: AlignmentType.CENTER 
												}) 
											], 
											verticalAlign: VerticalAlign.CENTER 
										}), 
										new TableCell({ 
											shading: rellenoVerdeFuerte, 
											children: [ 
												new Paragraph({ 
													text: 'Autores', 
													alignment: AlignmentType.CENTER 
												}) 
											], 
											verticalAlign: VerticalAlign.CENTER 
										}) 
									] 
								}), 
								// Articulos 
								...this.arregloAFilas(articulosRes)
							], 
							width: { 
								size: 100, 
								type: WidthType.PERCENTAGE 
							} 
						}) 
					] 
				}] 
			}); 
			// Descargar Word 
			Packer.toBlob(documento)
			.then(blob => { 
				saveAs(blob, 'Articulos.docx');
			}) 
		}, 
		err => console.error(err))
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
	color: 'DDDDDD', 
	fill: 'DDDDDD' 
} 

const rellenoVerdeFuerte = { 
	type: ShadingType.CLEAR, 
	color: '939393', 
	fill: '939393'
}
