import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { loginForm } from '../interfaces/login-form.interface';

import { Usuario } from '../models/usuario.model';

declare const google : any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario !: Usuario;

  constructor( private httpClient : HttpClient,
               private router : Router
             ) {

             }

  get token() : string {
    return localStorage.getItem('token') || '';
  }

  get id() : string {
    return this.usuario.id_usuario || '';
  }

  logout() {

    localStorage.removeItem('token');

    google.accounts.id.revoke('sanchezalvarez124@gmail.com', () => {
      this.router.navigateByUrl('/login');
    })

  }

  validarToken(): Observable<boolean> {

    return this.httpClient.get(`${ base_url }/login/renew`,
     {
      headers : { 'Authorization': 'Bearer ' + this.token }
      }).pipe(
      map( ( res : any ) => {

        const { email, google, id_usuario, imagen = "", nombre, role } = res.usuario;
        this.usuario = new Usuario( nombre, email, '', imagen, google, role, id_usuario );
        localStorage.setItem('token', res.token);
        return true;

      }),
      catchError( error => of( false ) )
    )

  }


  loginUsuario( formData : loginForm ) {
    return this.httpClient.post(`${ base_url }/login`, formData )
                          .pipe(
                            tap( ( resp : any ) => {
                              localStorage.setItem('token', resp.token);
                            })
                          )
  }

  actualizarPerfil( data : { email : string, nombre : string, role : string }) {

    data = {
      ...data,
      role : this.usuario.role!,
    }

    return this.httpClient.put(`${ base_url }/usuarios/${ this.id }`, data, {
      headers : { 'Authorization': 'Bearer ' + this.token }
      });
  }

  crearUsuario( formData : RegisterForm ) {
    return this.httpClient.post(`${ base_url }/usuarios`, formData );
  }

  loginGoogle( token : string ) {
    return this.httpClient.post(`${ base_url }/login/google`, { token })
                          .pipe(
                            tap( ( resp : any ) => {
                              localStorage.setItem('token', resp.token);
                            })
                          )
  }



}
