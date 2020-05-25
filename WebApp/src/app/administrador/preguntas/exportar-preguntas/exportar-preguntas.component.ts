import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../../Servicios/servicios.service';

@Component({
  selector: 'app-exportar-preguntas',
  templateUrl: './exportar-preguntas.component.html',
  styles: []
})
export class ExportarPreguntasComponent implements OnInit {

  leyendo = false;

  Niveles: any[] = [];

  constructor(private genService: ServiciosService) { }

  ngOnInit() {
    this.obtenerPreguntas();
  }

  obtenerPreguntas() {
    this.leyendo = true;
    this.genService.getPreguntasPorNivel().subscribe((rNiveles: any) => {
      console.log(rNiveles);
      this.leyendo = false;
      this.Niveles = rNiveles.Niveles;
    });
  }

}
