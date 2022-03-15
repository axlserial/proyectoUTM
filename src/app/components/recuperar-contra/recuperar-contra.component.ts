import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CorreoService } from 'src/app/services/correo.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-recuperar-contra',
	templateUrl: './recuperar-contra.component.html',
	styleUrls: ['./recuperar-contra.component.css']
})
export class RecuperarContraComponent implements OnInit {

	datosProf: any;
	token: string | null = '';
	contraNueva: string = '';
	contraRepe: string = '';

	constructor(private router: Router,
				private actRouter: ActivatedRoute,
				private usuarioService: UsuarioService,
				private correoService: CorreoService) { }

	ngOnInit(): void {
		this.actRouter.paramMap.subscribe(params => {
			this.token = params.get('token');
			if(this.token){
				this.correoService.decodificaEmail({"token": this.token})
				.subscribe((profesor: any) => {
					if (profesor === 0){
						Swal.fire({
							position: "center",
							icon: "warning",
							title: "Correo invalido"
						});
						this.router.navigateByUrl("/");
					} else {
						this.datosProf = profesor;
					}
				});
			}
		});
	}

	cambioContra(){
		if (!(this.contraNueva === '') && !(this.contraRepe === '')){
			if (this.contraNueva === this.contraRepe){
				let password = {"password": this.contraNueva};
				this.usuarioService.actualizaContra(this.datosProf.idProfesor, password)
				.subscribe((res) => {
					Swal.fire({
						position: "center",
						icon: "success",
						title: "Contraseña actualizada"
					});
					this.router.navigateByUrl("/");
				});
			} else {
				Swal.fire({
					position: "center",
					icon: "error",
					title: "Las contraseñas no son iguales"
				});
			}
		} else {
			Swal.fire({
				position: "center",
				icon: "error",
				title: "Completa ambos campos"
			});
		}
	}
}
