import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProfesorComponent } from './components/profesor/profesor.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { GeneralesComponent } from './components/generales/generales.component';
import { HomeComponent } from './components/home/home.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { ArticulosViceComponent } from './components/articulos-vice/articulos-vice.component';
import { RecuperarContraComponent } from './components/recuperar-contra/recuperar-contra.component';
import { MateriasComponent } from './components/materias/materias.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfesoresViceComponent } from './components/profesores-vice/profesores-vice.component';
import { CambioInfoService } from './services/cambio-info.service';
import { InstitutosViceComponent } from './components/institutos-vice/institutos-vice.component';
import { CarrerasViceComponent } from './components/carreras-vice/carreras-vice.component';
import { AddInstitutoComponent } from './components/modals/add-instituto/add-instituto.component';
import { AddCarreraComponent } from './components/modals/add-carrera/add-carrera.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		ProfesorComponent,
		NavigationComponent,
		GeneralesComponent,
		HomeComponent,
		ArticulosComponent,
		ArticulosViceComponent,
		RecuperarContraComponent,
		MateriasComponent,
		FooterComponent,
		ProfesoresViceComponent,
		InstitutosViceComponent,
		CarrerasViceComponent,
		AddInstitutoComponent,
  AddCarreraComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		AppRoutingModule,
		NgxPaginationModule
	],
	providers: [
		CambioInfoService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
