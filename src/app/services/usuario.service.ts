import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { loginForm } from '../interfaces/login-form.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

declare const google : any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private httpClient : HttpClient,
               private router : Router
             ) { }

  logout() {

    localStorage.removeItem('token');

    google.accounts.id.revoke('sanchezalvarez124@gmail.com', () => {
      this.router.navigateByUrl('/login');
    })

  }

  validarToken(): Observable<boolean> {

    const token = localStorage.getItem('token') || '';

    return this.httpClient.get(`${ base_url }/login/renew`,
     {
      headers : { 'Authorization': 'Bearer ' + token }
      }).pipe(
      tap( ( res : any ) => {
        localStorage.setItem('token', res.token);
      }),
      map( resp => true ),
      catchError( error => of( false ))
    )

  }


  crearUsuario( formData : RegisterForm ) {
    return this.httpClient.post(`${ base_url }/usuarios`, formData );
  }

  loginUsuario( formData : loginForm ) {
    return this.httpClient.post(`${ base_url }/login`, formData )
                          .pipe(
                            tap( ( resp : any ) => {
                              localStorage.setItem('token', resp.token);
                            })
                          )
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
