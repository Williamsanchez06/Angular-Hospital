import { environment } from "src/environments/environment"

const base_url = environment.base_url;

export class Usuario {

  constructor(
    public nombre     :  string,
    public email      :  string,
    public password   ?: string,
    public img        ?: string,
    public google     ?: boolean,
    public role       ?: string,
    public id_usuario ?: string
  ) { }

  get imagenUrl() {

    if ( this.img?.includes('https') ) {
        return this.img;
    }

   if ( this.img ) {
    return `${ base_url }/uploads/usuarios/${ this.img }`;
   }

   return `${ base_url }/uploads/usuarios/no-image`;

  }

}