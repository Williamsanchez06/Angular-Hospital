import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgessComponent } from './progess/progess.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [

    { 
        path : 'dashboard', 
        component: PagesComponent,
        children : [
            { path : '', component : DashboardComponent },
            { path : 'progess',   component : ProgessComponent },
            { path : 'grafica1',  component : Grafica1Component },
        ]
    },
    
];

@NgModule({
    imports: [ RouterModule.forChild( routes ) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}