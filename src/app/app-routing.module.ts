import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProgessComponent } from './pages/progess/progess.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { Page404Component } from './pages/page404/page404.component';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [

  { 
    path : '', 
    component: PagesComponent,
    children : [
      { path : 'dashboard', component : DashboardComponent },
      { path : 'progess',   component : ProgessComponent },
      { path : 'grafica1',  component : Grafica1Component }
    ]
  },

  { path : 'register', component : RegisterComponent },
  { path : 'login', component : LoginComponent },
  
  { path : '**', component: Page404Component }

];

@NgModule({
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }