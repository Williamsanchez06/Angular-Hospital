import { environment } from "src/environments/environment"

const base_url = environment.base_url;

export class Usuario {

  constructor(
    public nombre     :  string,
    public email      :  string,
    public password   ?: string,
    public imagen        ?: string,
    public google     ?: boolean,
    public role       ?: string,
    public id_usuario ?: string
  ) { }

  get imagenUrl() {

    if( !this.imagen ) {

      return `${ base_url }/uploads/usuarios/no-image`;

    } else if ( this.imagen?.includes('https') ) {

      return this.imagen;

    } else if ( this.imagen ) {

      return `${ base_url }/uploads/usuarios/${ this.imagen }`;

   }

   return `${ base_url }/uploads/usuarios/no-image`;

  }

}
