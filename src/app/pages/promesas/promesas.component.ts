import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  ngOnInit(): void {

    this.getUsuarios().then( usuarios => console.log( usuarios ) )

    // const promera = new Promise( (resolve, reject) =>{

    //   if ( false ) {
    //     resolve('Hola Mundo');
    //   } else {
    //     reject('Algo salio Mal')
    //   }

    // })

    // promera.then((data) => console.log(data))
    //        .catch((err) => console.log(err))

    // console.log('Fin del Init');

    // this.getUsuarios();

  }

  getUsuarios() {

    const promesa = new Promise( ( resolve , reject )  => {
        fetch('https://reqres.in/api/users')
              .then( ( resp ) => resp.json())
              .then( ( body ) => resolve( body.data ) );
    })

    return promesa;

  }

}
