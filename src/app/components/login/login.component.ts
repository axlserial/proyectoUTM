import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CorreoService } from 'src/app/services/correo.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	usuario: Usuario;
	idProfesor: number;

	constructor(private usuarioService: UsuarioService, 
				private correoService: CorreoService, 
				private router: Router) {
		this.usuario = new Usuario();
		this.idProfesor = 0;
	}

	ngOnInit(): void {
		$(document).ready(function () {
			$('.modal').modal({
				dismissible: true
			});
		});
	}

	logueo(): void {
		if (!(this.usuario.correo === '') && !(this.usuario.password === '')) {
			let contra = {"password": this.usuario.password};
			this.usuarioService.existe(this.usuario.correo, contra).subscribe((resUsuario: any) => {
				if (resUsuario != -1) {
					this.idProfesor = Number(resUsuario.idProfesor);
					localStorage.setItem('token', resUsuario.token);
					localStorage.setItem('correo', this.usuario.correo);
					localStorage.setItem('idProfesor', this.idProfesor + '');
					localStorage.setItem('nivel', resUsuario.nivel);
					this.router.navigateByUrl(`/home/generales/${this.idProfesor}`);
				} else {
					Swal.fire({
						position: "center",
						icon: "error",
						title: `Datos incorrectos`,
					});
				}
			});
		} else {
			Swal.fire({
				position: "center",
				icon: "error",
				title: "Ingresa tus datos"
			});
		}
	}

	cambiarPassword() {
		console.log('Cambio');
		$('#modalCambiarContrasenya').modal({ dismissible: false });
		$('#modalCambiarContrasenya').modal('open');
	}

	cambiaContraBase(){
		console.log("cambioBase");
		this.correoService.enviarCorreoRecuperacion(this.usuario).subscribe({
			next: (resUsuario: any) => console.log(resUsuario),
			error: (err) => console.error(err)
		});
	}


}
