import { Component, OnInit } from '@angular/core';
import { RUTA_ESTAD_USUARIO, RUTA_ESTADISTICAS, RUTA_ESTAD_PREGUNTAS, RUTA_ESTAD_PRUEBAS } from '../../config/constantes';
import { ServiciosService } from '../../Servicios/servicios.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styles: []
})
export class EstadisticasComponent implements OnInit {

  menuEstadisticas: any[] = [
    {
      titulo: 'Por pregunta',
      icono: 'assets/Iconos/roles.svg',
      descripcion: 'Calcula la estadísticas por pregunta',
      ruta: RUTA_ESTAD_PREGUNTAS
    },
    {
      titulo: 'Por Usuario',
      icono: 'assets/Iconos/roles.svg',
      descripcion: 'Calcula la estadísticas por pregunta',
      ruta: RUTA_ESTAD_USUARIO
    },
    {
      titulo: 'Por Prueba',
      icono: 'assets/Iconos/roles.svg',
      descripcion: 'Muestra una relación de respuestas correctas, por cada pregunta en un gráfico de radar',
      ruta: RUTA_ESTAD_PRUEBAS
    }
  ];

  constructor(private genService: ServiciosService) { }

  ngOnInit() {
  }

  buscarMenu(submenu: string) {
    this.genService.navegar([RUTA_ESTADISTICAS, submenu]);
  }



}
