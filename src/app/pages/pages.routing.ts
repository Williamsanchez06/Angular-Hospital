import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgessComponent } from './progess/progess.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';

const routes: Routes = [

    {
        path : 'dashboard',
        component: PagesComponent,
        canActivate : [ AuthGuard ],
        children : [
            { path : '',          component : DashboardComponent, data: { titulo : 'Dashboard' } },
            { path : 'progress',  component : ProgessComponent, data : { titulo: 'Progress' } },
            { path : 'grafica1',  component : Grafica1Component, data: { titulo : 'Grafica' } },
            { path : 'account-settings',  component : AccountSettingsComponent, data : { titulo : 'Account-Setting' } },
            { path : 'promesas',  component : PromesasComponent, data: { titulo : 'Promesas' } },
            { path : 'rxjs',  component : RxjsComponent, data : { titulo : 'Rxjs' } },
            { path : 'perfil',  component : PerfilComponent, data : { titulo : 'Perfil de Usuario' } },

            // Mantenimientos
            { path : 'usuarios',  component : UsuariosComponent, data : { titulo : 'Usuario de aplicación' } },

        ]
    },

];

@NgModule({
    imports: [ RouterModule.forChild( routes ) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}
