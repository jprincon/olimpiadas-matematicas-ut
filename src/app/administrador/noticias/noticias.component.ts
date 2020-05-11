import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../Servicios/servicios.service';
import { DialogService } from '../../Servicios/dialog.service';
import { Noticia } from '../../Interfaces/interfaces.interface';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styles: []
})
export class NoticiasComponent implements OnInit {

  Noticias: Noticia[] = [];
  leyendo = false;
  eliminando = false;
  contIntentos = 1;

  constructor(private genService: ServiciosService,
              private dlgService: DialogService) { }

  ngOnInit() {
    this.leerNoticias();
  }

  leerNoticias() {

    this.leyendo = true;

    this.genService.getNoticias().subscribe((rNoticias: any) => {
      this.Noticias = rNoticias.Noticias;
      console.log(rNoticias);
      this.leyendo = false;
    }, error => {
      this.contIntentos = this.contIntentos + 1;
      if (this.contIntentos > 3) {
        this.dlgService.mostrarSnackBar('Error', 'No se pudo establecer conexión con el servidor');
        this.leyendo = true;
      } else {
        this.leerNoticias();
      }
    });
  }

  agregarNoticia() {
    this.dlgService.DlgNoticia('Crear', '').subscribe((rRespuesta: any) => {
      console.log(rRespuesta);
      this.dlgService.mostrarSnackBar('Información', rRespuesta);
      this.leerNoticias();
    });
  }

  editarNoticia(noticia: Noticia) {
    this.dlgService.DlgNoticia('Editar', noticia.idnoticia).subscribe((rRespuesta: any) => {
      console.log(rRespuesta);
      this.dlgService.mostrarSnackBar('Información', rRespuesta);
      this.leerNoticias();
    });
  }

  eliminarNoticia(noticia: Noticia) {
    this.dlgService.confirmacion('¿Está seguro de eliminar este Noticia?').subscribe((rConfirmacion: any) => {
      console.log(rConfirmacion);
      if (rConfirmacion) {
        this.eliminar(noticia.idnoticia);
      }
    });
  }

  eliminar(id: string) {
    this.eliminando = true;
    this.genService.deleteNoticia(id).subscribe((rRespuesta: any) => {
      this.eliminando = false;
      this.dlgService.mostrarSnackBar('Información', rRespuesta.Respuesta || rRespuesta.Error);
      this.leerNoticias();
    }, error => {
       this.eliminar(id);
    });
  }

}
