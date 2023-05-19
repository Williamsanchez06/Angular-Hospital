import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private httpClient : HttpClient ) { }

  get token() : string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers : { 'Authorization': 'Bearer ' + this.token }
    }
  }

  private transFormarUsuarios( resultado : any[] ) : Usuario[] {

    return resultado.map( user => new Usuario( user.nombre, user.email, '', user.imagen, user.google, user.role, user.id_usuario ));

  }

  buscar( tipo: 'usuarios'|'medicos'|'hospitales', termino : string = '', offset : number = 0 ) {

    const url = `${ base_url }/todo/coleccion/${ tipo }/${ termino }?offset=${ offset }`;

    return this.httpClient.get<any[]>( url , this.headers )
            .pipe(
              map( ( resp : any ) => {

                switch( tipo ){

                  case  'usuarios' :
                    return this.transFormarUsuarios( resp.resultados );

                  case  'medicos' :
                    return this.transFormarUsuarios( resp.resultados );

                  case  'hospitales' :
                    return this.transFormarUsuarios( resp.resultados );

                  default :
                    return [];

                }

              })
            );

  }


}
