import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BannerComponent } from './components/banner/banner.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { ContactosComponent } from './components/contactos/contactos.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { LoginComponent } from './components/login/login.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { OlvidarPasswordComponent } from './components/olvidar-password/olvidar-password.component';
import { VerificarcorreoComponent } from './components/verificarcorreo/verificarcorreo.component';
import { AuthService } from './shared/services/auth.service';
import { AddExperienciaComponent } from './components-add/add-experiencia/add-experiencia.component';
import { HttpClientModule } from '@angular/common/http';
import { EditPersonaComponent } from './components-edit/edit-persona/edit-persona.component';
import { AddPersonaComponent } from './components-add/add-persona/add-persona.component';
import { PersonasComponent } from './components/personas/personas.component'; 
import { PersonaService } from './services/persona.service';
import { EditExperienciaComponent } from './components-edit/edit-experiencia/edit-experiencia.component';
import { EditEducacionComponent } from './components-edit/edit-educacion/edit-educacion.component';
import { AddEducacionComponent } from './components-add/add-educacion/add-educacion.component';
import { HabilidadComponent } from './components/habilidad/habilidad.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AddHabilidadComponent } from './components-add/add-habilidad/add-habilidad.component';
import { EditHabilidadComponent } from './components-edit/edit-habilidad/edit-habilidad.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    AcercaDeComponent,
    ExperienciaComponent,
    HomeComponent,
    EducacionComponent,
    ProyectosComponent,
    FooterComponent,
    ContactosComponent,
    PerfilComponent,
    LoginComponent,
    PortfolioComponent,
    RegisterComponent,
    OlvidarPasswordComponent,
    VerificarcorreoComponent,
    AddExperienciaComponent,
    EditPersonaComponent,
    AddPersonaComponent,
    PersonasComponent,
    EditExperienciaComponent,
    EditEducacionComponent,
    AddEducacionComponent,
    HabilidadComponent,
    AddHabilidadComponent,
    EditHabilidadComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
     
     NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    
    })
  ],
  providers: [AuthService, PersonaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
