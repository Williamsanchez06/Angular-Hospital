import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal : boolean = true;
  public tipo !: string;
  public id  !: string;
  public imagen !: string;

  public nuevaImagen : EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal( tipo : 'usuarios'|'medicos'|'hospitales', id : string, img : string ) {

    this.tipo = tipo;
    this.id = id;
    // this.imagen != img;
    this._ocultarModal = false;

    if ( img.includes('https') ) {
      this.imagen = img;
    } else {
      this.imagen = `${ base_url }/uploads/${ tipo }/${ img }`;
    }

  }

  cerrarModal() {
    this._ocultarModal = true;
  }

}

