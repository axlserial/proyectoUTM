import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfesorService } from 'src/app/services/profesor.service';
import { Profesor } from 'src/app/models/profesor.model';
import Swal from 'sweetalert2';
import { TranslateService } from "@ngx-translate/core";
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';

@Component({
	selector: 'app-generales',
	templateUrl: './generales.component.html',
	styleUrls: ['./generales.component.css']
})
export class GeneralesComponent implements OnInit {

	profesor: Profesor;
	idProfesor: number;
	tipoProf: string;

	constructor(private router: ActivatedRoute,
				private profesorService: ProfesorService,
				private translate: TranslateService,
				private cambioIdiomaService: CambioIdiomaService) {
		
		this.translate.addLangs(["es", "en"]);
		this.translate.setDefaultLang("es");

		this.cambioIdiomaService.currentMsg$
		.subscribe(idioma => {
			this.translate.use(idioma);
		});
		
		this.profesor = new Profesor();
		this.idProfesor = 0;
		this.tipoProf = '';
	}

	ngOnInit(): void {
		this.router.paramMap.subscribe(params => {
			this.idProfesor = Number(params.get('idProfesor'));
			this.profesorService.listOne(this.idProfesor).subscribe({
				next: (resProfesor: any) => {
					this.profesor = resProfesor;
					this.profesorService.listTipoProfesor().subscribe({
						next: (resTipo: any) => {
							this.tipoProf = resTipo.filter(
								(item: any) => item.idTipoProfesor === this.profesor.idTipoProfesor)[0].nombreTipo;
						},
						error: err => console.log(err)
					});
				},
				error: err => console.log(err)
			});
		});
	}

	guardarCambios(){
		console.log("nuevos:", this.profesor);
		this.profesorService.actualizarProfesor(this.profesor.idProfesor, this.profesor)
		.subscribe({
			next: (resEdit: any) => {
				Swal.fire({
					position: "center",
					icon: "success",
					title: `Datos actualizados correctamente`,
				});
			},
			error: err => console.error(err)
		});
	}
}
