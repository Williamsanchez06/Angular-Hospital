import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FileuploadService } from 'src/app/services/fileupload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent {

  public imagenSubir !: File;
  public imgTemp : any = null;

  constructor( public modalImagenService : ModalImagenService,
               private fileService : FileuploadService,
             ) { }

  abrirModal() {

  }

  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
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
    this.fileService.actualizarFoto( this.imagenSubir, 'usuarios', this.modalImagenService.id )
                    .subscribe( (resp : any ) => {

                      Swal.fire('Guardado', 'Imagen de Usuario Actualizada', 'success')
                      this.modalImagenService.nuevaImagen.emit( resp.nombreArchivo );
                      this.cerrarModal();


                    },() => {
                      Swal.fire('Error', 'No se Pudo Subir la Imagen' , 'error');
                    })
  }

}
