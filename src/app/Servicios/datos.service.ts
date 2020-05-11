import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor(private http: HttpClient) { }

  getApps() {
    const url = 'assets/Aplicaciones/Apps.json';
    return this.http.get(url);
  }
}
