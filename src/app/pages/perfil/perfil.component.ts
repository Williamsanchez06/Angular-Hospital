import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FileuploadService } from '../../services/fileupload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{

  public perfilForm !: FormGroup;
  public usuario !: Usuario;
  public imagenSubir !: File;
  public imgTemp : any = null;

  constructor( private fb : FormBuilder,
               private usuarioService : UsuarioService,
               private fileService : FileuploadService
             ) {
              this.usuario = usuarioService.usuario;
             }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre , Validators.required ],
      email : [ this.usuario.email  , [ Validators.required, Validators.email ] ],
    });

  }

  actualizarPerfil(): void {

    this.usuarioService.actualizarPerfil( this.perfilForm.value )
                       .subscribe(resp => {

                          const { nombre, email } = this.perfilForm.value;
                          this.usuario.nombre = nombre;
                          this.usuario.email = email;

                          Swal.fire('Usuario Guardado', 'Cambios fueron Guardados', 'success');

                       }, ( err ) => {
                        Swal.fire('Error', err.error.msg , 'error');
                       })

  }

  cambiarImagen( event : any ) {
    this.imagenSubir = event.files[0];

    if ( !event.files[0] ) {
      this.imgTemp = null;
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL( event.files[0] );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

  subirImagen() {
    this.fileService.actualizarFoto( this.imagenSubir, 'usuarios', this.usuario.id_usuario! )
                    .subscribe( (resp : any ) => {
                      this.usuario.imagen = resp.nombreArchivo;

                      Swal.fire('Guardado', 'Imagen de Usuario Actualizada', 'success');
                    },(err) => {
                      Swal.fire('Error', 'No se Pudo Subir la Imagen' , 'error');
                    })
  }

}
