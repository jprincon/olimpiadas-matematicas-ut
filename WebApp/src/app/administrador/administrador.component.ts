import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../Servicios/servicios.service';
import { RUTA_ADMINISTRADOR, RUTA_ADMIN_NOTICIAS, RUTA_ADMIN_PRUEBAS, RUTA_ADMIN_PREGUNTAS, RUTA_ADMIN_USUARIOS, RUTA_ADMIN_INSTITUCIONES, RUTA_ADMIN_NIVELES, RUTA_ADMIN_GRADOS, RUTA_ADMIN_RUTAS, RUTA_ADMIN_RUTAS_ROLES, RUTA_ADMIN_ROLES, RUTA_ADMIN_ENVIAR_CORREO, RUTA_ADMIN_CONFIGURACION, RUTA_ADMIN_COPIAS_SEGURIDAD } from '../config/constantes';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styles: []
})
export class AdministradorComponent implements OnInit {

  titulo = 'Roles';

  menuAdministrador: any[] = [
    {
      titulo: 'Roles',
      icono: 'assets/Iconos/roles.svg',
      descripcion: 'Crea/Edita los Roles',
      ruta: RUTA_ADMIN_ROLES
    },
    {
      titulo: 'Rutas',
      icono: 'assets/Iconos/rutas.svg',
      descripcion: 'Crea/Edita las Rutas',
      ruta: RUTA_ADMIN_RUTAS
    },
    {
      titulo: 'Rutas de Roles',
      icono: 'assets/Iconos/rutasroles.svg',
      descripcion: 'Crea/Edita las Rutas de los Roles',
      ruta: RUTA_ADMIN_RUTAS_ROLES
    },
    {
      titulo: 'Grados',
      icono: 'assets/Iconos/grados.svg',
      descripcion: 'Crea/Edita las Grados',
      ruta: RUTA_ADMIN_GRADOS
    },
    {
      titulo: 'Niveles',
      icono: 'assets/Iconos/niveles.svg',
      descripcion: 'Crea/Edita los Niveles',
      ruta: RUTA_ADMIN_NIVELES
    },
    {
      titulo: 'Instituciones',
      icono: 'assets/Iconos/instituciones.svg',
      descripcion: 'Crea/Edita las Instituciones',
      ruta: RUTA_ADMIN_INSTITUCIONES
    },
    {
      titulo: 'Usuarios',
      icono: 'assets/Iconos/usuarios.svg',
      descripcion: 'Crea/Edita los Usuarios',
      ruta: RUTA_ADMIN_USUARIOS
    },
    {
      titulo: 'Editor Preguntas',
      icono: 'assets/Iconos/preguntas.svg',
      descripcion: 'Crea/Edita las preguntas',
      ruta: RUTA_ADMIN_PREGUNTAS
    },
    {
      titulo: 'Pruebas',
      icono: 'assets/Iconos/pruebas.svg',
      descripcion: 'Crea/Edita las pruebas',
      ruta: RUTA_ADMIN_PRUEBAS
    },
    {
      titulo: 'Noticias',
      icono: 'assets/Iconos/Noticias.svg',
      descripcion: 'Crea/Edita las noticias de la página',
      ruta: RUTA_ADMIN_NOTICIAS
    },
    {
      titulo: 'Correos',
      icono: 'assets/Iconos/Correo.png',
      descripcion: 'Enviar correos a todos los usuarios de la aplicación',
      ruta: RUTA_ADMIN_ENVIAR_CORREO
    },
    {
      titulo: 'Backups',
      icono: 'assets/Iconos/Backups.png',
      descripcion: 'Descargar copias de Seguridad de los Datos',
      ruta: RUTA_ADMIN_COPIAS_SEGURIDAD
    },
    {
      titulo: 'Configuración',
      icono: 'assets/Iconos/Configuracion.png',
      descripcion: 'Configurar los ajustes de la aplicación',
      ruta: RUTA_ADMIN_CONFIGURACION
    }
  ];

  constructor(private genService: ServiciosService) { }

  ngOnInit() {
  }

  buscarMenu(ruta: string, ss: string) {
    this.titulo = ss;
    this.genService.navegar([RUTA_ADMINISTRADOR, ruta]);
  }

}
