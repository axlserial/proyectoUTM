import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfesorComponent } from './components/profesor/profesor.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { GeneralesComponent } from './components/generales/generales.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { HomeComponent } from './components/home/home.component';
import { ArticulosViceComponent } from './components/articulos-vice/articulos-vice.component';

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
			}
		]
	},
	// {
	// 	path: 'profesor',
	// 	component: ProfesorComponent
	// },
	// {
	// 	path: 'navigation',
	// 	component: NavigationComponent
	// },
	// {
	// 	path: 'generales/:id',
	// 	component: GeneralesComponent
	// }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
