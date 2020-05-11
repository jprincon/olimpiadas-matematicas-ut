import { Component, OnInit } from '@angular/core';
import { TransferenciaService } from '../../Servicios/transferencia.service';
import { Router } from '@angular/router';
import { ServiciosService } from '../../Servicios/servicios.service';
import { Usuario } from '../../Interfaces/interfaces.interface';
import { NOMBRE_APP } from '../../config/constantes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  nombreUsuario = 'Administrador';
  mostrarUsuario = true;
  esAdministrador = true;

  usuario: Usuario = {};

  nombreApp = NOMBRE_APP;

  constructor(private router: Router,
              private genService: ServiciosService,
              private transfer: TransferenciaService) { }

  ngOnInit() {
    this.transfer.obtenerUsuario.subscribe((rUsuario: any) => {
      this.usuario = rUsuario;

      if (rUsuario !== undefined) {
        this.mostrarUsuario = true;
      }
    });
  }

  configurarPerfil() {
    this.genService.navegar(['perfil-usuario']);
  }

  salir() {

    if (localStorage.getItem('Usuario')) {
      localStorage.removeItem('Usuario');
      this.router.navigate(['inicio']);
    }

    if (localStorage.getItem('Clave')) {
      localStorage.removeItem('Clave');
    }

    this.router.navigate(['inicio']);

    this.transfer.enviarMuestraUsuario(false);
  }

  administrar() {
    this.router.navigate(['administrador']);
  }

}
