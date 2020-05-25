import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../../Servicios/servicios.service';
import { ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-est-pruebas',
  templateUrl: './est-pruebas.component.html',
  styles: []
})
export class EstPruebasComponent implements OnInit {

  pruebas: any[] = [];

  public ChartType: ChartType = 'bar';
  public ChartLabels: Label[] = ['[0.0-1.0)', '[1.0-2.0)', '[2.0-3.0)', '[3.0-4.0)', '[4.0-5.0]'];
  public ChartLegend = false;
  public ChartColors = [
    {
      backgroundColor: ['rgba(23,162,184,0.9)', 'rgba(23,162,184,0.9)', 'rgba(23,162,184,0.9)', 'rgba(23,162,184,0.9)', 'rgba(23,162,184,0.9)'],
    },
  ];

  constructor(private genSercice: ServiciosService) { }

  ngOnInit() {
    this.obtenerEstadisticas();
  }

  obtenerEstadisticas() {
    this.genSercice.getEstadisticasPruebas().subscribe((rEstadisticas: any) => {
      console.log(rEstadisticas);
      this.pruebas = rEstadisticas.Pruebas;
    });
  }

}
