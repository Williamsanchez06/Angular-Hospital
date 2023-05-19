import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu : any[] = [

    {
      titulo : 'Dashboard',
      icono : 'mdi mdi-gauge',
      subMenu : [
        { titulo : 'Main', url : '/' },
        { titulo : 'ProgressBar', url : '/dashboard/progress' },
        { titulo : 'Graficas', url : '/dashboard/grafica1' },
        { titulo : 'Promesas', url : '/dashboard/promesas' },
        { titulo : 'rxjs', url : '/dashboard/rxjs' },
      ]
    },
    {
      titulo : 'Mantenimientos',
      icono : 'mdi mdi-folder-lock-open',
      subMenu : [
        { titulo : 'Usuarios', url : 'usuarios' },
        { titulo : 'Hospitales', url : 'hospitales' },
        { titulo : 'Médicos', url : 'medicos' },
      ]
    }

  ]

  constructor() { }

}
