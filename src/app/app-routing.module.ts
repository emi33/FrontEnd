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
import { AddHabilidadComponent } from './components-add/add-habilidad/add-habilidad.component';
import { EditHabilidadComponent } from './components-edit/edit-habilidad/edit-habilidad.component';
import { AddProyectoComponent } from './components-add/add-proyecto/add-proyecto.component';
import { EditProyectoComponent } from './components-edit/edit-proyecto/edit-proyecto.component';
import { AddSocialComponent } from './components-add/add-social/add-social.component';
import { EditSocialComponent } from './components-edit/edit-social/edit-social.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

const routes: Routes = [
  {path: 'portfolio', component: PortfolioComponent},
  {path: 'portfolio/:id', component: PortfolioComponent },
  {path:'login', component: LoginComponent},
  {path: '', redirectTo:'portfolio', pathMatch:'full'},

  {path:'register', component: RegisterComponent},
  {path:'olvidar-password', component: OlvidarPasswordComponent},
  {path: 'verificarcorreo', component: VerificarcorreoComponent},
  {path: 'personas', component: PersonasComponent, canActivate: [AuthGuard]},
  {path: 'add?persona/:id', component: AddPersonaComponent, canActivate: [AuthGuard]},
  {path: 'add?persona', component: AddPersonaComponent, canActivate: [AuthGuard]},

  {path: 'persona/:id', component: EditPersonaComponent, canActivate: [AuthGuard]},
  {path: 'add?persona/:id', component: AddPersonaComponent, canActivate: [AuthGuard]},
  {path: 'experiencia/:id', component: EditExperienciaComponent, canActivate: [AuthGuard]},
  {path: 'add?experiencia/:personaid', component: AddExperienciaComponent, canActivate: [AuthGuard]},
  {path: 'educacion/:id', component: EditEducacionComponent, canActivate: [AuthGuard]},
  {path: 'add?educacion/:personaid', component: AddEducacionComponent, canActivate: [AuthGuard]},
  {path: 'add?habilidad/:personaid', component: AddHabilidadComponent, canActivate: [AuthGuard]},
  {path: 'habilidad/:id', component: EditHabilidadComponent, canActivate: [AuthGuard]},
  {path: 'add?proyecto/:personaid', component: AddProyectoComponent, canActivate: [AuthGuard]},
  {path: 'proyecto/:id', component: EditProyectoComponent, canActivate: [AuthGuard]},
  {path: 'add?social/:personaid', component: AddSocialComponent, canActivate: [AuthGuard]},
  {path: 'contacto/:id', component: EditSocialComponent, canActivate: [AuthGuard]},
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }