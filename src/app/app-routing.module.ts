import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
// import { ProfesorComponent } from './components/profesor/profesor.component';
// import { NavigationComponent } from './components/navigation/navigation.component';
import { GeneralesComponent } from './components/generales/generales.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { HomeComponent } from './components/home/home.component';
import { ArticulosViceComponent } from './components/articulos-vice/articulos-vice.component';
import { ArticulosDirecComponent } from './components/articulos-direc/articulos-direc.component';
import { ArticulosImpComponent } from './components/articulos-imp/articulos-imp.component';
import { ActividadesViceComponent } from './components/actividades-vice/actividades-vice.component';
import { ActividadesViceImpComponent } from './components/actividades-vice-imp/actividades-vice-imp.component';
import { EventosViceImpComponent } from './components/eventos-vice-imp/eventos-vice-imp.component';
import { EventosViceComponent } from './components/eventos-vice/eventos-vice.component';
import { ProfesoresViceComponent } from './components/profesores-vice/profesores-vice.component';
import { ProfesoresJefeComponent } from './components/profesores-jefe/profesores-jefe.component';
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
				path: 'articulos/:idProfesor',
				component: ArticulosComponent
			},
			{
				path: 'articulos-vice/:idProfesor',
				component: ArticulosViceComponent
			},
			{
				path: 'articulos-direc/:idProfesor',
				component: ArticulosDirecComponent
			},
			{
				path: 'articulos-imp/:idProfesor',
				component: ArticulosImpComponent
			},
			{
				path: 'actividades-vice',
				component: ActividadesViceComponent
			},
			{
				path: 'actividades-vice-imp',
				component: ActividadesViceImpComponent
			},
			{
				path: 'eventos-vice-imp',
				component: EventosViceImpComponent
			},
			{
				path: 'eventos-vice',
				component: EventosViceComponent
			},
			{
				path: 'profesores-vice/:idProfesor',
				component: ProfesoresViceComponent
			},
			{
				path: 'profesores-jefe/:idProfesor',
				component: ProfesoresJefeComponent
			},
			{
				path: 'institutos-vice/:idProfesor',
				component: InstitutosViceComponent
			},
			{
				path: 'carreras-vice/:idProfesor',
				component: CarrerasViceComponent
			}
			// {
			// 	path: 'materias',
			// 	component: MateriasComponent
			// }
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
