import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Profesor } from 'src/app/models/profesor.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	usuario : Usuario;
	idProfesor : number;

	constructor(private usuarioService : UsuarioService, private router : Router){
		this.usuario = new Usuario();
		this.idProfesor = 0;
	}

	ngOnInit(): void {
	
	}

	logueo(): void {
		if (!(this.usuario.correo === '') && !(this.usuario.password === '')){
			this.usuarioService.existe(this.usuario.correo, this.usuario.password).subscribe((resUsuario) => {
				if (resUsuario != -1){
					console.log(resUsuario);
					// this.idProfesor = Number("Token:\n" + resUsuario);
					localStorage.setItem('token', resUsuario + '');
					// localStorage.setItem('idProfesor', this.idProfesor+'');
					// this.router.navigateByUrl(`/home/generales/${this.idProfesor}`);
				}
			});
		}
	}

	cambiarPassword(){
		console.log('Cambio');
	}
}
