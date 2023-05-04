import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() {

    const url = localStorage.getItem('theme') || './assets/css/colors/default.css';
    this.linkTheme?.setAttribute( 'href' , url );

  }

  changeTheme( theme : string, links : NodeListOf<Element> ) {

    const url = `./assets/css/colors/${ theme }.css`;
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme( links );

  }

  checkCurrentTheme(links : NodeListOf<Element>) {

    links.forEach( links => {

      links.classList.remove('working');

      const btnTheme = links.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');

      if( btnThemeUrl === currentTheme ) {
        links.classList.add('working');
      }

    })

  }



}
