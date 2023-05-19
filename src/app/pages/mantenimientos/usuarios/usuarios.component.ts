import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuario : number = 0;
  public usuarios : Usuario[] = [];
  public usuariosTemp : Usuario[] = [];

  public imgSubs !: Subscription;
  public offset : number = 0;
  public cargando : boolean = true;
  public ultimaPagina : boolean = false;

  constructor( private usuarioService  : UsuarioService,
               private busquedaService : BusquedasService,
               private modalImagenService : ModalImagenService
             ){ }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.cargarUsuario();

    this.modalImagenService.nuevaImagen.subscribe( img => this.cargarUsuario() );

  }

  cargarUsuario() {
    this.cargando = true;
    this.usuarioService.cargarUsuario( this.offset )
    .subscribe( ({ total, usuarios }) =>{

      this.totalUsuario  = total;
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.cargando = false;

    })
  }

  cambiarPagina( valor : number ) {

    const total : number = Math.ceil(this.totalUsuario / 5);
    const offs  : number  = this.offset / 5 + 2;

    if ( total === offs) this.ultimaPagina = true;

    this.offset += valor;

    if ( this.offset < 0 ) {
        this.offset = 0;
    } else if ( this.offset > this.totalUsuario ){
      this.offset -= valor;
    }

    this.cargarUsuario();

  }

  buscar( termino : string ) {

    if ( termino.length <= 0 ){
     this.usuarios = this.usuariosTemp;
     return;
    }

      this.busquedaService.buscar( 'usuarios', termino, this.offset )
            .subscribe( resp => {
              this.usuarios = resp;
            })
  }

  eliminarUsuario(usuario : Usuario) {

    if ( usuario.id_usuario === this.usuarioService.id ) {
      Swal.fire('Error', 'No Puede borrarse a Si Mismo', 'error');
      return;
    }

    Swal.fire({
      title: 'Eliminar Usuario?',
      text: "Esta Seguro de Eliminar este Usuario",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar el Usuario'
    }).then(( result : any ) => {
      if (result.isConfirmed) {

        this.usuarioService.eliminarUsuario( usuario.id_usuario )
                           .subscribe( resp => {
                            Swal.fire(
                              'Eliminado!',
                              'Usuario Eliminado',
                              'success'
                            )
                            this.cargarUsuario();

                           }, () => {
                              Swal.fire(
                                'Ops!',
                                'Error al Eliminar el Usuario',
                                'error'
                              )
                           })

      }

    })

  }

  cambiarRole( usuario : Usuario) {

    this.usuarioService.guardarUsuario( usuario )
                       .subscribe( resp => {
                        console.log(resp);
                       })

  }

  abrirModal( usuario : Usuario ) {
    this.modalImagenService.abrirModal('usuarios', usuario.id_usuario!, usuario.imagen || 'no-image');
  }



}
