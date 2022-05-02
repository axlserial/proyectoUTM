import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { InstitutoService } from 'src/app/services/instituto.service';
import { CarreraService } from 'src/app/services/carrera.service';
import { ArticuloService } from 'src/app/services/articulo.service';
import { Profesor } from 'src/app/models/profesor.model';
import { ProfesorService } from 'src/app/services/profesor.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

	// para abrir el modal de registrar instituto
	abrirModalInst: EventEmitter<boolean> = new EventEmitter();

	// para abrir el modal de registrar carrera
	abrirModalCarr: EventEmitter<boolean> = new EventEmitter();

	// Profesor
	registroProfesor: Profesor = new Profesor();
	tipoProf: any[] = [];
	tprofActual: any;

	// datos prof logueado
	idProfesor: number = 0;
	profesorLog: any;
	nivel: number = 0;

	// Institutos
	institutos: any;
	institutoActual: any;

	// carreras
	carreras: any[] = [];
	numCarrerasActual: any;
	carreraActual: any;

	//excel
	archivoExcel: any;
	arrayBuffer: any;
	exceljsondata: any[] = [];

	constructor(private router: Router,
				private carreraService: CarreraService,
				private articuloService: ArticuloService,
				private institutoService: InstitutoService,
				private profesorService: ProfesorService) { }

	ngOnInit(): void {
		this.idProfesor = Number(localStorage.getItem('idProfesor'));
		this.nivel = Number(localStorage.getItem('nivel'));

		console.log("Nivel:", this.nivel);

		$(document).ready(function () {
			$('.sidenav').sidenav();
			$('.modal').modal({ dismissible: true });
			$(".dropdown-trigger").dropdown({ coverTrigger: false });
		});

		this.profesorService.listOne(this.idProfesor).subscribe({
			next: (resProfesor: any) => {
				this.profesorLog = resProfesor;
				this.institutoService.listInstitutos().subscribe({
					next: (resInstitutos: any) => {
						this.institutos = resInstitutos;
						this.institutos = this.institutos.filter((item: any) => item.idInstituto != 9);
						this.institutoActual = this.institutos[0].idInstituto;
						this.carreraService.listCarrerasbyInstituto(this.institutoActual)
						.subscribe({
							next: (resCarreras: any) => {
								this.carreraActual = resCarreras[0].idCarrera;
								this.numCarrerasActual = resCarreras.length;
								this.carreras = resCarreras;
								this.profesorService.listTipoProfesor().subscribe({
									next: (resTipoProf: any) => {
										this.tipoProf = resTipoProf;
										this.tprofActual = this.tipoProf[0].idTipoProfesor;
									},
									error: err => console.log(err)
								});
							},
							error: err => console.log(err)
						});
					},
					error: (err) => console.log(err)
				});
			},
			error: err => console.error(err)
		});
	}

	agregarProfesor(){
		$('#agregarProfesor').modal();
		$('#agregarProfesor').modal('open');
	}

	agregarInstituto(){
		this.abrirModalInst.emit(true);
	}

	agregarCarrera(){
		this.abrirModalCarr.emit(true);
	}

	cambioInstituto(op: any){
		this.institutoActual = op.value;
		this.carreraService.listCarrerasbyInstituto(this.institutoActual)
		.subscribe({
			next: (resCarreras: any) => {
				console.log(resCarreras);
				this.numCarrerasActual = resCarreras.length;
				if (this.numCarrerasActual == 0){
					this.carreraActual = 0;
				} else {
					this.carreras = resCarreras;
					this.carreraActual = resCarreras[0].idCarrera;
				}
			},
			error: err => console.log(err)
		});
	}

	cambioCarrera(op: any){
		this.carreraActual = op.value;
	}

	cambioTipoProf(op: any){
		this.tprofActual = op.value;
	}

	darAltaProfesor(){

		/* 	Verifica quien registra un nuevo profesor,
		*	si un jefe de carrera (nivel 3) o
		*	el vicerrector (nivel 1)
		*/
		if (this.nivel != 3){
			this.registroProfesor.idInstituto = Number(this.institutoActual);
			this.registroProfesor.idCarrera = Number(this.carreraActual);
		} else {
			this.registroProfesor.idInstituto = Number(this.profesorLog.idInstituto);
			this.registroProfesor.idCarrera = Number(this.profesorLog.idCarrera);
		}

		// Asigna el tipo de profesor elegido
		this.registroProfesor.idTipoProfesor = Number(this.tprofActual);
		console.log(this.registroProfesor);

		// Realiza petición al server para guardar al profesor
		this.profesorService.guardarProfesor(this.registroProfesor).subscribe({
			next: (resNuevo) => console.log(resNuevo)
		});
	}


	migrarProfesor(){
		let entrada = document.getElementById("subida-prof") as any;
		entrada.value = "";
		entrada = document.getElementById("subida-prof-n") as any;
		entrada.value = "";

		$('#migrarProfesor').modal();
		$('#migrarProfesor').modal('open');
	}

	cargarExcel(event: any){
		if (event.files.length == 0)
			return;

		this.archivoExcel = event.files[0];
		console.log(event.files[0]);
		let fileReader = new FileReader();
		fileReader.readAsArrayBuffer(this.archivoExcel);
		fileReader.onload = (e) => {
			this.arrayBuffer = fileReader.result;
			var data = new Uint8Array(this.arrayBuffer);
			var arr = new Array();
			for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
			var bstr = arr.join("");
			var workbook = XLSX.read(bstr, { type: "binary" });
			var first_sheet_name = workbook.SheetNames[0];
			var worksheet = workbook.Sheets[first_sheet_name];
			this.exceljsondata = XLSX.utils.sheet_to_json(worksheet, { raw: true });
			console.log(this.exceljsondata);
		}
	}

	migrarProfesor2DB(){
		console.log(this.exceljsondata);
		this.exceljsondata.forEach(profesor => {
			this.profesorService.guardarProfesor(profesor).subscribe({
				error: err => console.log(err)
			});
		});
		
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Profesores migrados',
			confirmButtonAriaLabel: 'Thumbs up, great!'
		});
	}

	migrarInstituto(){
		let entrada = document.getElementById("subida-inst") as any;
		entrada.value = "";
		entrada = document.getElementById("subida-inst-n") as any;
		entrada.value = "";

		$('#migrarInstituto').modal();
		$('#migrarInstituto').modal('open');
	}

	migrarInstituto2DB(){
		console.log(this.exceljsondata);
		this.exceljsondata.forEach(instituto => {
			this.institutoService.crearInstituto(instituto).subscribe({
				error: err => console.log(err)
			});
		});

		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Institutos migrados',
			confirmButtonAriaLabel: 'Thumbs up, great!'
		});
	}

	migrarCarrera(){
		let entrada = document.getElementById("subida-carr") as any;
		entrada.value = "";
		entrada = document.getElementById("subida-carr-n") as any;
		entrada.value = "";

		$('#migrarCarrera').modal();
		$('#migrarCarrera').modal('open');
	}

	migrarCarrera2DB(){
		console.log(this.exceljsondata);
		this.exceljsondata.forEach(carrera => {
			this.carreraService.crearCarrera(carrera).subscribe({
				error: err => console.log(err)
			});
		});

		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Carreras migradas',
			confirmButtonAriaLabel: 'Thumbs up, great!'
		});
	}

	migrarArticulo(){
		let entrada = document.getElementById("subida-art") as any;
		entrada.value = "";
		entrada = document.getElementById("subida-art-n") as any;
		entrada.value = "";
		
		$('#migrarArticulo').modal();
		$('#migrarArticulo').modal('open');
	}

	migrarArticulo2DB(){
		this.exceljsondata.forEach(articulo => {

			// Respaldar info articuloYprofesor
			let profs = articulo.idProfesor.split(",");
			let posicion = articulo.posicion.split(",");
			let validado = articulo.validado;

			// Eliminar de json
			delete articulo.idProfesor;
			delete articulo.posicion;
			delete articulo.validado;

			let datos = {
				"articulo": articulo,
				"datosAut": {
					"autores": profs,
					"posicion": posicion,
					"validado": validado
				}
			}

			this.articuloService.crearArticuloMigrar(datos)
			.subscribe({
				next: (resMigrar: any) => {
					console.log(resMigrar);
				},
				error: err => console.error(err)
			});
		});

		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Articulos migrados',
			confirmButtonAriaLabel: 'Thumbs up, great!'
		});
	}

	migrarActividad(){
		let entrada = document.getElementById("subida-act") as any;
		entrada.value = "";
		entrada = document.getElementById("subida-act-n") as any;
		entrada.value = "";
		
		$('#migrarActividad').modal();
		$('#migrarActividad').modal('open');
	}

	migrarActividad2DB(){
		this.exceljsondata.forEach(actividad => {
			console.log("Subiendo...");
		});

		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Actividades migradas',
			confirmButtonAriaLabel: 'Thumbs up, great!'
		});
	}

	migrarEvento(){
		let entrada = document.getElementById("subida-evn") as any;
		entrada.value = "";
		entrada = document.getElementById("subida-evn-n") as any;
		entrada.value = "";
		
		$('#migrarEvento').modal();
		$('#migrarEvento').modal('open');
	}

	migrarEvento2DB(){
		this.exceljsondata.forEach(evento => {
			console.log("Subiendo...");
		});

		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Eventos migrados',
			confirmButtonAriaLabel: 'Thumbs up, great!'
		});
	}

	logout() {
		console.log("logout");
		localStorage.removeItem("correo");
		localStorage.removeItem("token");
		localStorage.removeItem("idProfesor");
		localStorage.removeItem('nivel');
		this.router.navigateByUrl('/');
	}
}
