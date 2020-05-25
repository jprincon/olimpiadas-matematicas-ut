import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { Router } from '@angular/router';
import { retry } from "rxjs/operators";
import { LS_ULTIMA_RUTA, RUTA_MENU_PRINCIPAL } from '../config/constantes';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  letras: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
                      's', 't', 'u', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  private token = '';
  private ENCABEZADO_HTTP = 'http://';
  private IP_SERVIDOR = '201.185.240.142';
  private PUERTO = ':1980';
  private GENERAL = '/datasnap/rest/tolimpiadas/';


  private URL_TOKEN = 'Token';
  private URL_ROL = 'Rol';
  private URL_ROLES = 'Roles';
  private URL_USUARIO = 'Usuario';
  private URL_USUARIOS = 'Usuarios';
  private URL_GRADO = 'Grado';
  private URL_GRADOS = 'Grados';
  private URL_NIVEL = 'Nivel';
  private URL_NIVELES = 'Niveles';
  private URL_INSTITUCION = 'Institucion';
  private URL_INSTITUCIONES = 'Instituciones';
  private URL_RUTA = 'Ruta';
  private URL_RUTAS = 'Rutas';
  private URL_NOTICIA = 'Noticia';
  private URL_NOTICIAS = 'Noticias';
  private URL_RECUPERAR_CONTRA = 'RecuperarContra';
  private URL_PREGUNTA = 'Pregunta';
  private URL_PREGUNTAS = 'Preguntas';
  private URL_PREGUNTAS_PRUEBA = 'PreguntasPrueba';
  private URL_PREGUNTAS_POR_NIVEL = 'ExportarPreguntasPorNivel';
  private URL_OPCIONPREGUNTA = 'OpcionPregunta';
  private URL_OPCIONESPREGUNTA = 'OpcionesPregunta';
  private URL_IMAGENPREGUNTA = 'ImagenPregunta';
  private URL_IMAGENESPREGUNTA = 'ImagenesPregunta';
  private URL_IMAGENESPREGUNTAS = 'ImagenesPreguntas';
  private URL_PRUEBA = 'Prueba';
  private URL_PRUEBAS = 'Pruebas';
  private URL_VALIDAR_ACCESO_PRUEBA = 'ValidarAccesoPrueba';
  private URL_SUBIR_ARCHIVO = 'SubirArchivo';
  private URL_DESCARGAR_CERTIFICADO = 'descargarCertificado';
  private URL_CONFIGURACION = 'Configuracion';
  private URL_CONFIGURACIONES = 'Configuraciones';
  private URL_ENVIAR_CORREO = 'EnviarCorreo';
  private URL_DESCARGAR_BACKUP = 'DescargarBackup';
  private URL_DESCARGAR_POSTGRES_BACKUP = 'DescargarPostgresBackup';
  private URL_RESPUESTAPREGUNTA = 'RespuestaPregunta';
  private URL_RESPUESTAPREGUNTAS = 'RespuestaPreguntas';
  private URL_PUNTAJEPRUEBA = 'PuntajePrueba';
  private URL_PUNTAJESPRUEBA = 'PuntajesPrueba';
  private URL_ESTADISTICAS_PREGUNTAS = 'estadisticaPreguntas';
  private URL_ESTADISTICAS_PRUEBAS = 'estadisticaPruebas';


  constructor(private http: HttpClient,
              private router: Router) {

      this.obtenerNuevoToken();
   }

   obtenerNuevoToken() {
    this.postToken().subscribe((respuesta: any) => {
      this.token = respuesta.token;
      console.log(respuesta);
    });
   }

  navegar(ruta: string[]) {
      const rutas = {
        Rutas: ruta
      };

      localStorage.setItem(LS_ULTIMA_RUTA, JSON.stringify(rutas));
      this.router.navigate(ruta);
  }

  restaurarRuta() {
     if (!localStorage.getItem(LS_ULTIMA_RUTA)) {
      this.navegar([RUTA_MENU_PRINCIPAL]);
      return;
     }

     this.navegar(JSON.parse(localStorage.getItem(LS_ULTIMA_RUTA).toString()).Rutas);
  }

  generarID() {

    let id = '';

    for (let i = 1; i < 9; i++) {
      const posicion = Math.round(Math.random() * (this.letras.length - 1));
      id = id + this.letras[posicion];
    }

    id = id + '-';

    for (let i = 1; i < 5; i++) {
      const posicion = Math.round(Math.random() * (this.letras.length - 1));
      id = id + this.letras[posicion];
    }

    id = id + '-';

    for (let i = 1; i < 5; i++) {
      const posicion = Math.round(Math.random() * (this.letras.length - 1));
      id = id + this.letras[posicion];
    }

    id = id + '-';

    for (let i = 1; i < 13; i++) {
      const posicion = Math.round(Math.random() * (this.letras.length - 1));
      id = id + this.letras[posicion];
    }

    return id;
  }

  // Rutas del Servidor %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  dataSnap_Path(ruta: string) {
    return this.ENCABEZADO_HTTP + this.IP_SERVIDOR + this.PUERTO + this.GENERAL + ruta;
  }

  parametro(dato: string) {
    return '/' + dato;
  }

  postToken() {
    const url = this.dataSnap_Path(this.URL_TOKEN);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const credenciales = {
      nombre: 'jprincon',
      correo: 'jarincon@uniquindio.edu.co',
      clave: 'Donmatematicas#512519'
    };

    const datos = JSON.stringify(credenciales);

    return this.http.post(url, datos, {headers}).pipe(retry());
  }

  postEnviarCorreo(datos: string) {
    const url = this.dataSnap_Path(this.URL_ENVIAR_CORREO) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, datos, {headers}).pipe(retry());
  }

  postLinkRecuperarContra(datos: string) {
    const url = this.dataSnap_Path(this.URL_RECUPERAR_CONTRA) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, datos, {headers});
  }

  descargarBackup(tipo: string) {
    const url = this.dataSnap_Path(this.URL_DESCARGAR_BACKUP) + this.parametro(tipo);
    return this.http.get(url).pipe(
      retry()
    );
  }

  descargarPostgresBackup() {
    const url = this.dataSnap_Path(this.URL_DESCARGAR_POSTGRES_BACKUP);
    return this.http.get(url).pipe(
      retry()
    );
  }

  // %%%%%%% Subir Imágenes %%%%%%%

  /* subirArchivo(archivo: File, url: string) {

    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('imagen', archivo);
      formData.append('nombre', archivo.name);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {

          if (xhr.status === 200) {
            console.log('Imagen Subida');
            resolve( xhr.response );
          } else {
            console.log('Fallo la subida');
            reject( xhr.response);
          }
        }
      };

      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      console.log(formData);


      const url2 = this.dataSnap_Path(this.URL_SUBIR_ARCHIVO);
      xhr.open('PUT', url2, true);

      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Accept', 'text/html');

      xhr.send(formData);
    });
  } */

  putSubirArchivo(datos: string) {
    const url = this.dataSnap_Path(this.URL_SUBIR_ARCHIVO);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(url, datos, {headers}).pipe(
      retry()
    );
  }

  postDescargarCertificado(datos: string) {
    const url = this.dataSnap_Path(this.URL_DESCARGAR_CERTIFICADO);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, datos, {headers}).pipe(
      retry()
    );
  }

  /* Rol %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  postRol(datos: string) {
    const url = this.dataSnap_Path(this.URL_ROL) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, datos, {headers}).pipe(
      retry()
    );
  }

  getRoles() {
    const url = this.dataSnap_Path(this.URL_ROLES);
    return this.http.get(url).pipe(
      retry()
    );
  }

  getRol(id: string) {
    const url = this.dataSnap_Path(this.URL_ROL) + this.parametro(id);
    return this.http.get(url).pipe(
      retry()
    );
  }

  putRol(datos: string) {
    const url = this.dataSnap_Path(this.URL_ROL) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(url, datos, {headers}).pipe(
      retry()
    );
  }

  deleteRol(id: string) {
    const url = this.dataSnap_Path(this.URL_ROL) + this.parametro(this.token) + this.parametro(id);
    console.log(url);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete(url, {headers}).pipe(
      retry()
    );
  }

  /* Usuario %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  postUsuario(datos: string) {
    const url = this.dataSnap_Path(this.URL_USUARIO) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, datos, {headers}).pipe(
      retry()
    );
  }

  getUsuarios() {
    const url = this.dataSnap_Path(this.URL_USUARIOS);
    return this.http.get(url).pipe(
      retry()
    );
  }

  getUsuariosPorInstitucion(IdInstitucion: string) {
    const url = this.dataSnap_Path(this.URL_USUARIOS) + 'PorInstitucion' + this.parametro(IdInstitucion);
    return this.http.get(url).pipe(
      retry()
    );
  }

  getUsuariosPorRol(IdRol: string) {
    const url = this.dataSnap_Path(this.URL_USUARIOS) + 'PorRol' + this.parametro(IdRol);
    return this.http.get(url).pipe(
      retry()
    );
  }

  getUsuario(id: string) {
    const url = this.dataSnap_Path(this.URL_USUARIO) + this.parametro(id);
    return this.http.get(url).pipe(
      retry()
    );
  }

  putUsuario(datos: string) {
    const url = this.dataSnap_Path(this.URL_USUARIO) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(url, datos, {headers}).pipe(
      retry()
    );
  }

  deleteUsuario(id: string) {
    const url = this.dataSnap_Path(this.URL_USUARIO) + this.parametro(this.token) + this.parametro(id);
    console.log(url);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete(url, {headers}).pipe(
      retry()
    );
  }

  /* Grado %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  postGrado(datos: string) {
    const url = this.dataSnap_Path(this.URL_GRADO) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, datos, {headers}).pipe(
      retry()
    );
  }

  getGrados() {
    const url = this.dataSnap_Path(this.URL_GRADOS);
    return this.http.get(url).pipe(
      retry()
    );
  }

  getGrado(id: string) {
    const url = this.dataSnap_Path(this.URL_GRADO) + this.parametro(id);
    return this.http.get(url).pipe(
      retry()
    );
  }

  putGrado(datos: string) {
    const url = this.dataSnap_Path(this.URL_GRADO) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(url, datos, {headers}).pipe(
      retry()
    );
  }

  deleteGrado(id: string) {
    const url = this.dataSnap_Path(this.URL_GRADO) + this.parametro(this.token) + this.parametro(id);
    console.log(url);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete(url, {headers}).pipe(
      retry()
    );
  }

  /* Nivel %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  postNivel(datos: string) {
    const url = this.dataSnap_Path(this.URL_NIVEL) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, datos, {headers}).pipe(
      retry()
    );
  }

  getNiveles() {
    const url = this.dataSnap_Path(this.URL_NIVELES);
    return this.http.get(url).pipe(
      retry()
    );
  }

  getNivel(id: string) {
    const url = this.dataSnap_Path(this.URL_NIVEL) + this.parametro(id);
    return this.http.get(url).pipe(
      retry()
    );
  }

  putNivel(datos: string) {
    const url = this.dataSnap_Path(this.URL_NIVEL) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(url, datos, {headers}).pipe(
      retry()
    );
  }

  deleteNivel(id: string) {
    const url = this.dataSnap_Path(this.URL_NIVEL) + this.parametro(this.token) + this.parametro(id);
    console.log(url);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete(url, {headers}).pipe(
      retry()
    );
  }

  /* Institucion %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  postInstitucion(datos: string) {
    const url = this.dataSnap_Path(this.URL_INSTITUCION) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, datos, {headers}).pipe(
      retry()
    );
  }

  getInstituciones() {
    const url = this.dataSnap_Path(this.URL_INSTITUCIONES);
    return this.http.get(url).pipe(
      retry()
    );
  }

  getInstitucion(id: string) {
    const url = this.dataSnap_Path(this.URL_INSTITUCION) + this.parametro(id);
    return this.http.get(url).pipe(
      retry()
    );
  }

  putInstitucion(datos: string) {
    const url = this.dataSnap_Path(this.URL_INSTITUCION) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(url, datos, {headers}).pipe(
      retry()
    );
  }

  deleteInstitucion(id: string) {
    const url = this.dataSnap_Path(this.URL_INSTITUCION) + this.parametro(this.token) + this.parametro(id);
    console.log(url);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete(url, {headers}).pipe(
      retry()
    );
  }

  /* Ruta %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  postRuta(datos: string) {
    const url = this.dataSnap_Path(this.URL_RUTA) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, datos, {headers}).pipe(
      retry()
    );
  }

  getRutas() {
    const url = this.dataSnap_Path(this.URL_RUTAS);
    return this.http.get(url).pipe(
      retry()
    );
  }

  getRuta(id: string) {
    const url = this.dataSnap_Path(this.URL_RUTA) + this.parametro(id);
    return this.http.get(url).pipe(
      retry()
    );
  }

  putRuta(datos: string) {
    const url = this.dataSnap_Path(this.URL_RUTA) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(url, datos, {headers}).pipe(
      retry()
    );
  }

  deleteRuta(id: string) {
    const url = this.dataSnap_Path(this.URL_RUTA) + this.parametro(this.token) + this.parametro(id);
    console.log(url);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete(url, {headers}).pipe(
      retry()
    );
  }

  /* Noticia %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  postNoticia(datos: string) {
    const url = this.dataSnap_Path(this.URL_NOTICIA) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, datos, {headers}).pipe(
      retry()
    );
  }

  getNoticias() {
    const url = this.dataSnap_Path(this.URL_NOTICIAS);
    return this.http.get(url).pipe(
      retry()
    );
  }

  getNoticia(id: string) {
    const url = this.dataSnap_Path(this.URL_NOTICIA) + this.parametro(id);
    return this.http.get(url).pipe(
      retry()
    );
  }

  putNoticia(datos: string) {
    const url = this.dataSnap_Path(this.URL_NOTICIA) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(url, datos, {headers}).pipe(
      retry()
    );
  }

  deleteNoticia(id: string) {
    const url = this.dataSnap_Path(this.URL_NOTICIA) + this.parametro(this.token) + this.parametro(id);
    console.log(url);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete(url, {headers}).pipe(
      retry()
    );
  }

  /* Pregunta %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  postPregunta(datos: string) {
    const url = this.dataSnap_Path(this.URL_PREGUNTA) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, datos, {headers}).pipe(
      retry()
    );
  }

  getPreguntas() {
    const url = this.dataSnap_Path(this.URL_PREGUNTAS);
    return this.http.get(url).pipe(
      retry()
    );
  }

  getPreguntasPorNivel() {
    const url = this.dataSnap_Path(this.URL_PREGUNTAS_POR_NIVEL);
    return this.http.get(url).pipe(
      retry()
    );
  }

  getPreguntasPrueba(IdPrueba: string, IdUsuario: string) {
    const url = this.dataSnap_Path(this.URL_PREGUNTAS_PRUEBA) + this.parametro(IdPrueba) + this.parametro(IdUsuario);
    return this.http.get(url).pipe(
      retry()
    );
  }

  getPregunta(id: string) {
    const url = this.dataSnap_Path(this.URL_PREGUNTA) + this.parametro(id);
    return this.http.get(url).pipe(
      retry()
    );
  }

  putPregunta(datos: string) {
    const url = this.dataSnap_Path(this.URL_PREGUNTA) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(url, datos, {headers}).pipe(
      retry()
    );
  }

  deletePregunta(id: string) {
    const url = this.dataSnap_Path(this.URL_PREGUNTA) + this.parametro(this.token) + this.parametro(id);
    console.log(url);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete(url, {headers}).pipe(
      retry()
    );
  }

  /* OpcionPregunta %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  postOpcionPregunta(datos: string) {
    const url = this.dataSnap_Path(this.URL_OPCIONPREGUNTA) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, datos, {headers}).pipe(
      retry()
    );
  }

  getOpcionesPregunta(IdSecuencia: string) {
    const url = this.dataSnap_Path(this.URL_OPCIONESPREGUNTA) + this.parametro(IdSecuencia);
    return this.http.get(url).pipe(
      retry()
    );
  }

  getOpcionesPreguntas() {
    const url = this.dataSnap_Path(this.URL_OPCIONESPREGUNTA);
    return this.http.get(url).pipe(
      retry()
    );
  }

  getOpcionPregunta(id: string) {
    const url = this.dataSnap_Path(this.URL_OPCIONPREGUNTA) + this.parametro(id);
    return this.http.get(url).pipe(
      retry()
    );
  }

  putOpcionPregunta(datos: string) {
    const url = this.dataSnap_Path(this.URL_OPCIONPREGUNTA) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(url, datos, {headers}).pipe(
      retry()
    );
  }

  deleteOpcionPregunta(id: string) {
    const url = this.dataSnap_Path(this.URL_OPCIONPREGUNTA) + this.parametro(this.token) + this.parametro(id);
    console.log(url);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete(url, {headers}).pipe(
      retry()
    );
  }

  /* ImagenPregunta %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  postImagenPregunta(datos: string) {
    const url = this.dataSnap_Path(this.URL_IMAGENPREGUNTA) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, datos, {headers}).pipe(
      retry()
    );
  }

  getImagenesPregunta(IdPregunta: string) {
    const url = this.dataSnap_Path(this.URL_IMAGENESPREGUNTA) + this.parametro(IdPregunta);
    return this.http.get(url).pipe(
      retry()
    );
  }

  getImagenesPreguntas() {
    const url = this.dataSnap_Path(this.URL_IMAGENESPREGUNTAS);
    return this.http.get(url).pipe(
      retry()
    );
  }

  getImagenPregunta(id: string) {
    const url = this.dataSnap_Path(this.URL_IMAGENPREGUNTA) + this.parametro(id);
    return this.http.get(url).pipe(
      retry()
    );
  }

  putImagenPregunta(datos: string) {
    const url = this.dataSnap_Path(this.URL_IMAGENPREGUNTA) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(url, datos, {headers}).pipe(
      retry()
    );
  }

  deleteImagenPregunta(id: string) {
    const url = this.dataSnap_Path(this.URL_IMAGENPREGUNTA) + this.parametro(this.token) + this.parametro(id);
    console.log(url);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete(url, {headers}).pipe(
      retry()
    );
  }

  /* Prueba %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  postPrueba(datos: string) {
    const url = this.dataSnap_Path(this.URL_PRUEBA) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, datos, {headers}).pipe(
      retry()
    );
  }

  postValidarAccesoPrueba(datos: string) {
    const url = this.dataSnap_Path(this.URL_VALIDAR_ACCESO_PRUEBA);

    console.log(url);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, datos, {headers}).pipe(
      retry()
    );
  }

  getPruebas() {
    const url = this.dataSnap_Path(this.URL_PRUEBAS);
    return this.http.get(url).pipe(
      retry()
    );
  }

  getPrueba(id: string) {
    const url = this.dataSnap_Path(this.URL_PRUEBA) + this.parametro(id);
    return this.http.get(url).pipe(
      retry()
    );
  }

  putPrueba(datos: string) {
    const url = this.dataSnap_Path(this.URL_PRUEBA) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(url, datos, {headers}).pipe(
      retry()
    );
  }

  deletePrueba(id: string) {
    const url = this.dataSnap_Path(this.URL_PRUEBA) + this.parametro(this.token) + this.parametro(id);
    console.log(url);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete(url, {headers}).pipe(
      retry()
    );
  }

  /* Configuracion %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  postConfiguracion(datos: string) {
    const url = this.dataSnap_Path(this.URL_CONFIGURACION) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, datos, {headers}).pipe(retry());
  }

  getConfiguraciones() {
    const url = this.dataSnap_Path(this.URL_CONFIGURACIONES);
    return this.http.get(url).pipe(retry());
  }

  getConfiguracion(id: string) {
    const url = this.dataSnap_Path(this.URL_CONFIGURACION) + this.parametro(id);
    return this.http.get(url).pipe(retry());
  }

  putConfiguracion(datos: string) {
    const url = this.dataSnap_Path(this.URL_CONFIGURACION) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(url, datos, {headers}).pipe(retry());
  }

  deleteConfiguracion(id: string) {
    const url = this.dataSnap_Path(this.URL_CONFIGURACION) + this.parametro(this.token) + this.parametro(id);
    console.log(url);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete(url, {headers}).pipe(retry());
  }

  /* RespuestaPregunta %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  postRespuestaPregunta(datos: string) {
    const url = this.dataSnap_Path(this.URL_RESPUESTAPREGUNTA) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, datos, {headers}).pipe(retry());
  }

  getRespuestaPreguntas() {
    const url = this.dataSnap_Path(this.URL_RESPUESTAPREGUNTAS);
    return this.http.get(url).pipe(retry());
  }

  getRespuestaPregunta(id: string) {
    const url = this.dataSnap_Path(this.URL_RESPUESTAPREGUNTA) + this.parametro(id);
    return this.http.get(url).pipe(retry());
  }

  putRespuestaPregunta(datos: string) {
    const url = this.dataSnap_Path(this.URL_RESPUESTAPREGUNTA) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(url, datos, {headers}).pipe(retry());
  }

  deleteRespuestaPregunta(id: string) {
    const url = this.dataSnap_Path(this.URL_RESPUESTAPREGUNTA) + this.parametro(this.token) + this.parametro(id);
    console.log(url);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete(url, {headers}).pipe(retry());
  }

  /* PuntajePrueba %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  postPuntajePrueba(datos: string) {
    const url = this.dataSnap_Path(this.URL_PUNTAJEPRUEBA) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, datos, {headers}).pipe(retry());
  }

  getPuntajesPrueba() {
    const url = this.dataSnap_Path(this.URL_PUNTAJESPRUEBA);
    return this.http.get(url).pipe(retry());
  }

  getPuntajePrueba(IdUsuario: string) {
    const url = this.dataSnap_Path(this.URL_PUNTAJEPRUEBA) + this.parametro(IdUsuario);
    return this.http.get(url).pipe(retry());
  }

  putPuntajePrueba(datos: string) {
    const url = this.dataSnap_Path(this.URL_PUNTAJEPRUEBA) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(url, datos, {headers}).pipe(retry());
  }

  deletePuntajePrueba(id: string) {
    const url = this.dataSnap_Path(this.URL_PUNTAJEPRUEBA) + this.parametro(this.token) + this.parametro(id);
    console.log(url);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete(url, {headers}).pipe(retry());
  }

  // %%%%%%% Estadísticas %%%%%%%
  getEstadisticasPreguntas() {
    const url = this.dataSnap_Path(this.URL_ESTADISTICAS_PREGUNTAS);
    return this.http.get(url).pipe(retry());
  }

  getEstadisticasPruebas() {
    const url = this.dataSnap_Path(this.URL_ESTADISTICAS_PRUEBAS);
    return this.http.get(url).pipe(retry());
  }
}
