import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls : ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre : ['William',  Validators.required ],
    email : ['williamsanchez@correo.com', [ Validators.required , Validators.email ] ],
    password : ['123456', Validators.required ],
    password2 : ['123456', Validators.required ],
    terminos : [ true, Validators.required ]
  },{
    validators : this.passwordIguales('password', 'password2'),
  });

  constructor( private fb: FormBuilder, private usuarioService : UsuarioService, private router : Router ){}

  crearUsuario() {

    this.formSubmitted = true;

    if ( this.registerForm.invalid ) return;

    this.usuarioService.crearUsuario( this.registerForm.value )
          .subscribe( res => {

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Usuario Registrado con Exito',
              showConfirmButton: true,
              timer: 1500
            }).then( ({ isConfirmed })  =>{
                if ( isConfirmed ) {
                  this.router.navigateByUrl('/login');
                }
            })

          }, ( err ) => {
            Swal.fire('Error', err.error.msg, 'error');
          });

  }

  campoNoValido( campo : string ) {
    return this.registerForm.get( campo )?.invalid && this.formSubmitted ? true : false;
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  contrasenasNoValidas() {

    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    return pass1 !== pass2 && this.formSubmitted ? true : false;

  }

  passwordIguales( pass1 : string, pass2 : string ) {

    return ( formGroup : FormGroup ) => {

      const pass1Control = formGroup.get( pass1 );
      const pass2Control = formGroup.get( pass2 );

      if ( pass1Control?.value === pass2Control?.value ) {
        pass2Control?.setErrors( null );
      } else {
        pass2Control?.setErrors({ noEsIgual : true });
      }

    }

  }

}
