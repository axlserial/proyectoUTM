import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfesorService } from 'src/app/services/profesor.service';
import { Profesor } from 'src/app/models/profesor.model';

@Component({
	selector: 'app-generales',
	templateUrl: './generales.component.html',
	styleUrls: ['./generales.component.css']
})
export class GeneralesComponent implements OnInit {

	profesor: Profesor;
	idProfesor: number;
	tipoProf: string;

	constructor(private router: ActivatedRoute, private profesorService: ProfesorService) {
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

}
