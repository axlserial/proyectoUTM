import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
// import { ProfesorComponent } from './components/profesor/profesor.component';
// import { NavigationComponent } from './components/navigation/navigation.component';
import { GeneralesComponent } from './components/generales/generales.component';
import { HomeComponent } from './components/home/home.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { ArticulosViceComponent } from './components/articulos-vice/articulos-vice.component';
import { ArticulosProfComponent } from './components/articulos-prof/articulos-prof.component';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { ArticulosImpComponent } from './components/articulos-imp/articulos-imp.component';
import { ActividadesImpComponent } from './components/actividades-imp/actividades-imp.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { EventosImpComponent } from './components/eventos-imp/eventos-imp.component';
import { ProfesoresComponent } from './components/profesores/profesores.component';
// import { ProfesoresViceComponent } from './components/profesores-vice/profesores-vice.component';
// import { ProfesoresJefeComponent } from './components/profesores-jefe/profesores-jefe.component';
import { RecuperarContraComponent } from './components/recuperar-contra/recuperar-contra.component';
import { InstitutosViceComponent } from './components/institutos-vice/institutos-vice.component';
import { CarrerasViceComponent } from './components/carreras-vice/carreras-vice.component';
// import { MateriasComponent } from './components/materias/materias.component';

const routes: Routes = [
	{
		path: "",
		redirectTo: "/login",
		pathMatch: "full"
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'home',
		component: HomeComponent,
		children: [
			{
				path: 'generales/:idProfesor',
				component: GeneralesComponent
			},
			{
				path: 'articulos',
				component: ArticulosComponent
			},
			{
				path: 'articulos-prof/:idProfesor',
				component: ArticulosProfComponent
			},
			{
				path: 'articulos-vice/:idProfesor',
				component: ArticulosViceComponent
			},
			{
				path: 'articulos-imp/:idProfesor',
				component: ArticulosImpComponent
			},
			{
				path: 'actividades',
				component: ActividadesComponent
			},
			{
				path: 'actividades-imp',
				component: ActividadesImpComponent
			},
			{
				path: 'eventos',
				component: EventosComponent
			},
			{
				path: 'eventos-imp',
				component: EventosImpComponent
			},
			{
				path: 'profesores',
				component: ProfesoresComponent
			},
			{
				path: 'institutos-vice/:idProfesor',
				component: InstitutosViceComponent
			},
			{
				path: 'carreras-vice/:idProfesor',
				component: CarrerasViceComponent
			}
		]
	},
	{
		path: 'recuperar/:token',
		component: RecuperarContraComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
