import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  constructor( private httpClient : HttpClient ) { }

  actualizarFoto(
    archivo : File,
    tipo: 'usuarios'|'medicos'|'hospitales',
    id : string,
  ) {

    const formData = new FormData();
    formData.append('imagen', archivo);

    return this.httpClient.put(`${ base_url }/uploads/${ tipo }/${ id }`, formData, {
      headers : { 'Authorization': 'Bearer ' + localStorage.getItem('token') || '' }
      });

  }


}
