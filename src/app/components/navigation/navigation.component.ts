import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

	idProfesor: number = 10;

	constructor() {

	}

	ngOnInit(): void {

		this.idProfesor = Number(localStorage.getItem('idProfesor'));

		console.log(this.idProfesor);

		$(document).ready(function () {
			$('.sidenav').sidenav();
			$(".dropdown-trigger").dropdown({ coverTrigger: false });
		});

	}

}
