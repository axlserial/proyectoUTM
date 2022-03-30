import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class CambioInfoService {
	private messageSource = new BehaviorSubject<string>("");
	currentMsg$ = this.messageSource.asObservable();
	
	constructor() { }
	
	enviar() {
		this.messageSource.next("");
	}
}