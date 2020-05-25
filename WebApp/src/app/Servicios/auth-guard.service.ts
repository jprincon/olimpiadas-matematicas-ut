import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { TransferenciaService } from './transferencia.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  puedeVerRuta = false;

  constructor(private transfer: TransferenciaService,
              private router: Router) {

    console.log('Servicio de Protección');

    /* transfer.obtenerMuestraUsuario.subscribe((rMuestra: boolean) => {
      // console.log(rMuestra);
      this.puedeVerRuta = rMuestra;
    }); */

    this.puedeVerRuta = true;

    if (!this.puedeVerRuta) {
      this.router.navigate(['inicio']);
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    return this.puedeVerRuta;
  }
}
