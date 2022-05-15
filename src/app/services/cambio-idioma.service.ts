import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
	providedIn: 'root'
})
export class CambioIdiomaService {
	private messageSource = new BehaviorSubject<string>("");
	currentMsg$ = this.messageSource.asObservable();
	
	constructor() { }
	
	enviar(idioma: string) {
		this.messageSource.next(idioma);
	}
}
