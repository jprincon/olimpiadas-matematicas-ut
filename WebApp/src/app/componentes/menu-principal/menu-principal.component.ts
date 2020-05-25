import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../Servicios/servicios.service';
import { Noticia, Usuario } from '../../Interfaces/interfaces.interface';
import { Router } from '@angular/router';
import { TransferenciaService } from '../../Servicios/transferencia.service';
import { NOMBRE_APP, AUTORES } from '../../config/constantes';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styles: []
})
export class MenuPrincipalComponent implements OnInit {

  Noticias: Noticia[] = [];
  usuario: Usuario = {};

  nombreApp = NOMBRE_APP;
  autores = AUTORES;

  constructor(private genService: ServiciosService,
              private router: Router,
              private transfer: TransferenciaService) { }

  ngOnInit() {
    this.leerNoticias();

    this.transfer.obtenerUsuario.subscribe((rUsuario: Usuario) => {
      console.log(rUsuario);
      this.usuario = rUsuario;
    });
  }

  leerNoticias() {
    this.genService.getNoticias().subscribe((rNoticias: any) => {
      this.Noticias = rNoticias.Noticias;
    }, error => {
      this.leerNoticias();
    });
  }

  verNoticia(noticia: Noticia) {
    this.router.navigate(['ver-noticia', noticia.idnoticia]);
  }

  irMenu(ruta: string) {
    this.genService.navegar([ruta]);
  }

}
