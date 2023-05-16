import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

declare const google : any;

import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  public formSubmitted = false;

  public loginForm : FormGroup  = this.fb.group({
    email    : [ localStorage.getItem('email') || '' , [ Validators.required , Validators.email ] ],
    password : ['123456',  Validators.required ],
    remember : [ false ],
  });

  @ViewChild('googleBtn') googleBtn !: ElementRef;

  constructor( private router : Router, private fb: FormBuilder , private usuarioService : UsuarioService ){}

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {

    google.accounts.id.initialize({
      client_id: "74711659571-ga8l6gq4vep2fapq124g5s4f9d23ggkq.apps.googleusercontent.com",
      callback: ( response : any ) => this.handleCredentialResponse( response ),
    });

    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );

  }

  handleCredentialResponse( response : any ) {

    this.usuarioService.loginGoogle( response.credential )
                       .subscribe( res => {

                          this.router.navigateByUrl('/dashboard');

                       }, ( err ) => {
                        Swal.fire('Error', err.error.msg, 'error');
                       })

  }

  login() {

    this.formSubmitted = true;
    if( this.loginForm.invalid ) return;

    this.usuarioService.loginUsuario( this.loginForm.value )
                       .subscribe( ( resp : any ) => {

                          if ( this.loginForm.get('remember')?.value ) {
                            localStorage.setItem('email', this.loginForm.get('email')?.value );
                          } else {
                            localStorage.removeItem('email');
                          }

                        this.router.navigateByUrl('/dashboard');

                       }, ( err ) => {
                        Swal.fire('Error', err.error.msg, 'error');
                       })

  }

  campoNoValido( campo : string ) {
    return this.loginForm.get( campo )?.invalid && this.formSubmitted ? true : false;
  }

}
