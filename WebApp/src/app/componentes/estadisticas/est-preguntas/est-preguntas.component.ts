import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../../Servicios/servicios.service';
import { ChartType, ChartDataSets } from 'chart.js';
import { EstadisticaPregunta } from '../../../Interfaces/interfaces.interface';

@Component({
  selector: 'app-est-preguntas',
  templateUrl: './est-preguntas.component.html',
  styles: []
})
export class EstPreguntasComponent implements OnInit {

  Preguntas: EstadisticaPregunta[] = [];

  public ChartType: ChartType = 'pie';
  public ChartLegend = true;
  public ChartColors = [
    {
      backgroundColor: ['rgba(23,162,184,0.9)', 'rgba(255,193,7,0.9)'],
    },
  ];

  constructor(private genService: ServiciosService) { }

  ngOnInit() {
    this.obtenerEstadisticas();
  }

  obtenerEstadisticas() {
    this.genService.getEstadisticasPreguntas().subscribe((rEstadisticas: any) => {
      console.log(rEstadisticas);
      if (rEstadisticas) {
        this.Preguntas = rEstadisticas.Preguntas;
      }
    });
  }

}
