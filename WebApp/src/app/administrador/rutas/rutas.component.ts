import { Component, OnInit } from '@angular/core';
import { Ruta } from '../../Interfaces/interfaces.interface';
import { ServiciosService } from '../../Servicios/servicios.service';
import { DialogService } from '../../Servicios/dialog.service';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styles: []
})
export class RutasComponent implements OnInit {

  Rutas: Ruta[] = [];
  leyendo = false;
  eliminando = false;
  contIntentos = 1;

  constructor(private genService: ServiciosService,
              private dlgService: DialogService) { }

  ngOnInit() {
    this.leerRutas();
  }

  leerRutas() {

    this.leyendo = true;

    this.genService.getRutas().subscribe((rRutas: any) => {
      this.Rutas = rRutas.Rutas;
      console.log(rRutas);
      this.leyendo = false;
    }, error => {
      this.leerRutas();
    });
  }

  agregarRuta() {
    this.dlgService.DlgRuta('Crear', '').subscribe((rRespuesta: any) => {
      console.log(rRespuesta);
      this.leerRutas();
    });
  }

  editarRuta(ruta: Ruta) {
    this.dlgService.DlgRuta('Editar', ruta.idruta).subscribe((rRespuesta: any) => {
      console.log(rRespuesta);
      this.leerRutas();
    });
  }

  eliminarRuta(ruta: Ruta) {
    this.dlgService.confirmacion('¿Está seguro de eliminar este Ruta?').subscribe((rConfirmacion: any) => {
      console.log(rConfirmacion);
      if (rConfirmacion) {
          this.eliminar(ruta.idruta);
      }
    });
  }

  eliminar(id: string) {
    this.eliminando = true;
    this.genService.deleteRuta(id).subscribe((rRespuesta: any) => {
      this.eliminando = false;
      this.dlgService.mostrarSnackBar('Información', rRespuesta.Respuesta || rRespuesta.Error);
      this.leerRutas();
    }, error => {
       this.eliminar(id);
    });
  }

}
