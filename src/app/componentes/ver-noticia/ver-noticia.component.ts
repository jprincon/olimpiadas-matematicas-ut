import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../Servicios/servicios.service';
import { ActivatedRoute } from '@angular/router';
import { Noticia } from '../../Interfaces/interfaces.interface';

@Component({
  selector: 'app-ver-noticia',
  templateUrl: './ver-noticia.component.html',
  styles: []
})
export class VerNoticiaComponent implements OnInit {

  IdNoticia: string;
  noticia: Noticia = {};

  constructor(private genService: ServiciosService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((rParam: any) => {
      this.IdNoticia = rParam.id;

      this.leerNoticia();
    });
  }

  leerNoticia() {
    this.genService.getNoticia(this.IdNoticia).subscribe((rNoticia: any) => {
      this.noticia = rNoticia;
    });
  }

}
