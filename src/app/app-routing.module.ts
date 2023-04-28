import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { RegisterComponent } from './components/register/register.component';
import { OlvidarPasswordComponent } from './components/olvidar-password/olvidar-password.component';
import { VerificarcorreoComponent } from './components/verificarcorreo/verificarcorreo.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { AddPersonaComponent } from './components-add/add-persona/add-persona.component';
import { PersonasComponent } from './components/personas/personas.component';
import { EditPersonaComponent } from './components-edit/edit-persona/edit-persona.component';
import { EditExperienciaComponent } from './components-edit/edit-experiencia/edit-experiencia.component';
import { AddExperienciaComponent } from './components-add/add-experiencia/add-experiencia.component';
import { EditEducacionComponent } from './components-edit/edit-educacion/edit-educacion.component';
import { AddEducacionComponent } from './components-add/add-educacion/add-educacion.component';

const routes: Routes = [
  {path: 'portfolio', component: PortfolioComponent},
  {path: 'portfolio/:id', component: PortfolioComponent, canActivate: [AuthGuard] },
  {path:'login', component: LoginComponent},
  {path: '', redirectTo:'portfolio', pathMatch:'full'},
  {path:'register', component: RegisterComponent},
  {path:'olvidar-password', component: OlvidarPasswordComponent},
  {path: 'verificarcorreo', component: VerificarcorreoComponent},
  {path: 'personas', component: PersonasComponent},
  {path: 'persona/:id', component: EditPersonaComponent, canActivate: [AuthGuard]},
  {path: 'add?persona', component: AddPersonaComponent, canActivate: [AuthGuard]},
  {path: 'experiencia/:id', component: EditExperienciaComponent, canActivate: [AuthGuard]},
  {path: 'add?experiencia/:personaid', component: AddExperienciaComponent, canActivate: [AuthGuard]},
  {path: 'educacion/:id', component: EditEducacionComponent, canActivate: [AuthGuard]},
  {path: 'add?educacion/:personaid', component: AddEducacionComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }