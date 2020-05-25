import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../Servicios/servicios.service';
import { LS_USUARIO } from '../../config/constantes';
import { Puntaje } from 'src/app/Interfaces/interfaces.interface';

@Component({
  selector: 'app-puntajes',
  templateUrl: './puntajes.component.html',
  styles: []
})
export class PuntajesComponent implements OnInit {

  certificado: any = {
    idusuario: '1098308059'
  };

  public pieChartColors = [
    {
      backgroundColor: ['rgba(23,162,184,0.9)', 'rgba(255,193,7,0.9)'],
    },
  ];

  IdUsuario: string;

  puntajes: Puntaje[] = [];

  constructor(private genService: ServiciosService) { }

  ngOnInit() {
    this.obtenerPuntajesUsuario();
  }

  descargarCertificado() {
    const datos = JSON.stringify(this.certificado);

    this.genService.postDescargarCertificado(datos).subscribe((rRespuesta: any) => {
      console.log(rRespuesta);

      if (rRespuesta.Respuesta === 'El Certificado se creo correctamente') {
        window.open(rRespuesta.descarga, '_blank');
      }
    });
  }

  obtenerPuntajesUsuario() {
    this.IdUsuario = localStorage.getItem(LS_USUARIO).toString();

    this.genService.getPuntajePrueba(this.IdUsuario).subscribe((rPuntajes: any) => {
      console.log(rPuntajes);
      this.puntajes = rPuntajes.Puntajes;
    });
  }

}
