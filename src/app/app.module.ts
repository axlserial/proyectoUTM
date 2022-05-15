import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProfesorComponent } from './components/profesor/profesor.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { GeneralesComponent } from './components/generales/generales.component';
import { HomeComponent } from './components/home/home.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { ArticulosProfComponent } from './components/articulos-prof/articulos-prof.component';
import { ArticulosImpComponent } from './components/articulos-imp/articulos-imp.component';
import { ArticulosViceComponent } from './components/articulos-vice/articulos-vice.component';
import { RecuperarContraComponent } from './components/recuperar-contra/recuperar-contra.component';
import { MateriasComponent } from './components/materias/materias.component';
import { FooterComponent } from './components/footer/footer.component';
// import { ProfesoresViceComponent } from './components/profesores-vice/profesores-vice.component';
import { CambioInfoService } from './services/cambio-info.service';
import { CambioIdiomaService } from './services/cambio-idioma.service';
import { InstitutosViceComponent } from './components/institutos-vice/institutos-vice.component';
import { CarrerasViceComponent } from './components/carreras-vice/carreras-vice.component';
import { AddInstitutoComponent } from './components/modals/add-instituto/add-instituto.component';
import { AddCarreraComponent } from './components/modals/add-carrera/add-carrera.component';
// import { ProfesoresJefeComponent } from './components/profesores-jefe/profesores-jefe.component';
import { ActividadesImpComponent } from './components/actividades-imp/actividades-imp.component';
import { EventosImpComponent } from './components/eventos-imp/eventos-imp.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { ExportarArticulosComponent } from './components/modals/exportar-articulos/exportar-articulos.component';
import { ProfesoresComponent } from './components/profesores/profesores.component';

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		ProfesorComponent,
		NavigationComponent,
		GeneralesComponent,
		HomeComponent,
		ArticulosComponent,
		ArticulosProfComponent,
		ArticulosImpComponent,
		ArticulosViceComponent,
		RecuperarContraComponent,
		MateriasComponent,
		FooterComponent,
		InstitutosViceComponent,
		CarrerasViceComponent,
		AddInstitutoComponent,
		AddCarreraComponent,
		ActividadesImpComponent,
		EventosImpComponent,
  EventosComponent,
  ActividadesComponent,
  ExportarArticulosComponent,
  ProfesoresComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		AppRoutingModule,
		NgxPaginationModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient],
			},
		})
	],
	providers: [
		CambioInfoService,
		CambioIdiomaService,
		DatePipe
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
