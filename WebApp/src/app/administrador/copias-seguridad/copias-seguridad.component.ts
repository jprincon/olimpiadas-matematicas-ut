import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../Servicios/servicios.service';
import { DialogService } from '../../Servicios/dialog.service';
import { DialogoEsperaService } from '../../Servicios/dialogo-espera.service';

@Component({
  selector: 'app-copias-seguridad',
  templateUrl: './copias-seguridad.component.html',
  styles: []
})
export class CopiasSeguridadComponent implements OnInit {

  listaCopias: any[] = [
    'Roles', 'Grados', 'Niveles', 'Instituciones', 'Usuarios', 'Pruebas', 'Preguntas', 'Noticias'
  ];

  constructor(private genService: ServiciosService,
              private dlgService: DialogService,
              private dialogoEsperaService: DialogoEsperaService) { }

  ngOnInit() {
  }

  descargarInforme(copia: string) {

    this.dialogoEsperaService.mostrarDialogoEspera('Descargando Archivo ...');
    this.genService.descargarBackup(copia).subscribe((rRespuesta: any) => {
      console.log(rRespuesta);

      if (rRespuesta.Respuesta === 'Archivo creado correctamente') {
        this.dialogoEsperaService.cerrarDialogoEspera();
        this.dlgService.mostrarSnackBar('Información', rRespuesta.Respuesta);
        window.open(rRespuesta.Ruta, '_blank');
      }
    });
  }

  descargarBackupPostgres() {
    this.dialogoEsperaService.mostrarDialogoEspera('Descargando Archivo ...');

    this.genService.descargarPostgresBackup().subscribe((rRespuesta: any) => {

      if (rRespuesta.Respuesta === 'Archivo creado correctamente') {
        this.dialogoEsperaService.cerrarDialogoEspera();

        this.dlgService.mostrarSnackBar('Información', rRespuesta.Respuesta);
        window.open(rRespuesta.Ruta, '_blank');
      }
    });
  }

}
