import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { RegisterComponent } from './components/register/register.component';
import { OlvidarPasswordComponent } from './components/olvidar-password/olvidar-password.component';
import { VerificarcorreoComponent } from './components/verificarcorreo/verificarcorreo.component';

const routes: Routes = [
  {path: 'portfolio', component: PortfolioComponent},
  {path:'login', component: LoginComponent},
  {path: '', redirectTo:'login', pathMatch:'full'},
  {path:'register', component: RegisterComponent},
  {path:'olvidar-password', component: OlvidarPasswordComponent},
  {path: 'verificarcorreo', component: VerificarcorreoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }