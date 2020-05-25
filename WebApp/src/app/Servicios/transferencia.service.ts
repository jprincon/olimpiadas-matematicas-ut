import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario, Rol } from '../Interfaces/interfaces.interface';
import { ServiciosService } from './servicios.service';

@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {

  /* MÉTODO PARA ACTUALIZAR Y OBTENER EL USUARIO EN TODA LA APLICACIÓN %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
  private bsUsuario = new BehaviorSubject<Usuario>({});
  public obtenerUsuario = this.bsUsuario.asObservable();

  /* MÉTODO PARA ACTUALIZAR Y OBTENER EL TITULO DE ADMINISTRACIÓN %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
  private bsTituloAdministracion = new BehaviorSubject<string>('');
  public obtenerTitulo = this.bsTituloAdministracion.asObservable();

  /* MÉTODO PARA PERMITIR EL ACCESO AL ADMINISTRADOR %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
  private bsEsAdministrador = new BehaviorSubject<boolean>(false);
  public obtenerPermisoAdministrador = this.bsEsAdministrador.asObservable();

  /* MÉTODO PARA ENTORNO DE PRUEBAS %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
  private bsEntornoPruebas = new BehaviorSubject<boolean>(false);
  public obtenerEntornoPruebas = this.bsEntornoPruebas.asObservable();

  /* MÉTODO VER APLICACIONES PANTALLA COMPLETA %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
  private bsPantallaCompleta = new BehaviorSubject<boolean>(false);
  public obtenerPantallaCompleta = this.bsPantallaCompleta.asObservable();

  /* MÉTODO MOSTRAR USUARIO EN MENU PRINCIPAL %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
  private bsMuestraUsuario = new BehaviorSubject<boolean>(false);
  public obtenerMuestraUsuario = this.bsMuestraUsuario.asObservable();

  /* MÉTODO MOSTRAR USUARIO EN MENU PRINCIPAL %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
  private bsNombreUsuario = new BehaviorSubject<string>('');
  public obtenerNombreUsuario = this.bsNombreUsuario.asObservable();

  constructor(private servicio: ServiciosService) { }

  enviarUsuario(usuario: Usuario) {
    this.bsUsuario.next(usuario);
  }

  enviarEsAdministrador(bb: boolean) {
    this.bsEsAdministrador.next(bb);
  }

  enviarNombreUsuario(nn: string) {
    this.bsNombreUsuario.next(nn);
  }

  enviarMuestraUsuario(bb: boolean) {
    this.bsMuestraUsuario.next(bb);
  }

  actualizarPantallaCompleta(valor: boolean) {
    this.bsPantallaCompleta.next(valor);
  }

  actualizarTitulo(titulo: string) {
    this.bsTituloAdministracion.next(titulo);
  }

  enviarRespuestaEntornoPruebas(valorEntorno: boolean) {
    this.bsEntornoPruebas.next(valorEntorno);
  }
}
