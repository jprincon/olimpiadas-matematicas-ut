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
  private URL_OPCIONPREGUNTA = 'OpcionPregunta';
  private URL_OPCIONESPREGUNTA = 'OpcionesPregunta';
  private URL_IMAGENPREGUNTA = 'ImagenPregunta';
  private URL_IMAGENESPREGUNTA = 'ImagenesPregunta';
  private URL_IMAGENESPREGUNTAS = 'ImagenesPreguntas';
  private URL_PRUEBA = 'Prueba';
  private URL_PRUEBAS = 'Pruebas';
  private URL_SUBIR_ARCHIVO = 'SubirArchivo';

  constructor(private http: HttpClient,
              private router: Router) {

    this.postToken().subscribe((respuesta: any) => {
      this.token = respuesta.token;
      // console.log(respuesta);
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

    return this.http.post(url, datos, {headers});
  }

  postLinkRecuperarContra(datos: string) {
    const url = this.dataSnap_Path(this.URL_RECUPERAR_CONTRA) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, datos, {headers});
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
      retry(10)
    );
  }

  /* Rol %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  postRol(datos: string) {
    const url = this.dataSnap_Path(this.URL_ROL) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, datos, {headers}).pipe(
      retry(10)
    );
  }

  getRoles() {
    const url = this.dataSnap_Path(this.URL_ROLES);
    return this.http.get(url).pipe(
      retry(10)
    );
  }

  getRol(id: string) {
    const url = this.dataSnap_Path(this.URL_ROL) + this.parametro(id);
    return this.http.get(url).pipe(
      retry(10)
    );
  }

  putRol(datos: string) {
    const url = this.dataSnap_Path(this.URL_ROL) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(url, datos, {headers}).pipe(
      retry(10)
    );
  }

  deleteRol(id: string) {
    const url = this.dataSnap_Path(this.URL_ROL) + this.parametro(this.token) + this.parametro(id);
    console.log(url);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete(url, {headers}).pipe(
      retry(10)
    );
  }

  /* Usuario %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  postUsuario(datos: string) {
    const url = this.dataSnap_Path(this.URL_USUARIO) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, datos, {headers}).pipe(
      retry(10)
    );
  }

  getUsuarios() {
    const url = this.dataSnap_Path(this.URL_USUARIOS);
    return this.http.get(url).pipe(
      retry(10)
    );
  }

  getUsuariosPorInstitucion(IdInstitucion: string) {
    const url = this.dataSnap_Path(this.URL_USUARIOS) + 'PorInstitucion' + this.parametro(IdInstitucion);
    return this.http.get(url).pipe(
      retry(10)
    );
  }

  getUsuario(id: string) {
    const url = this.dataSnap_Path(this.URL_USUARIO) + this.parametro(id);
    return this.http.get(url).pipe(
      retry(10)
    );
  }

  putUsuario(datos: string) {
    const url = this.dataSnap_Path(this.URL_USUARIO) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(url, datos, {headers}).pipe(
      retry(10)
    );
  }

  deleteUsuario(id: string) {
    const url = this.dataSnap_Path(this.URL_USUARIO) + this.parametro(this.token) + this.parametro(id);
    console.log(url);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete(url, {headers}).pipe(
      retry(10)
    );
  }

  /* Grado %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  postGrado(datos: string) {
    const url = this.dataSnap_Path(this.URL_GRADO) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, datos, {headers}).pipe(
      retry(10)
    );
  }

  getGrados() {
    const url = this.dataSnap_Path(this.URL_GRADOS);
    return this.http.get(url).pipe(
      retry(10)
    );
  }

  getGrado(id: string) {
    const url = this.dataSnap_Path(this.URL_GRADO) + this.parametro(id);
    return this.http.get(url).pipe(
      retry(10)
    );
  }

  putGrado(datos: string) {
    const url = this.dataSnap_Path(this.URL_GRADO) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(url, datos, {headers}).pipe(
      retry(10)
    );
  }

  deleteGrado(id: string) {
    const url = this.dataSnap_Path(this.URL_GRADO) + this.parametro(this.token) + this.parametro(id);
    console.log(url);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete(url, {headers}).pipe(
      retry(10)
    );
  }

  /* Nivel %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  postNivel(datos: string) {
    const url = this.dataSnap_Path(this.URL_NIVEL) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, datos, {headers}).pipe(
      retry(10)
    );
  }

  getNiveles() {
    const url = this.dataSnap_Path(this.URL_NIVELES);
    return this.http.get(url).pipe(
      retry(10)
    );
  }

  getNivel(id: string) {
    const url = this.dataSnap_Path(this.URL_NIVEL) + this.parametro(id);
    return this.http.get(url).pipe(
      retry(10)
    );
  }

  putNivel(datos: string) {
    const url = this.dataSnap_Path(this.URL_NIVEL) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(url, datos, {headers}).pipe(
      retry(10)
    );
  }

  deleteNivel(id: string) {
    const url = this.dataSnap_Path(this.URL_NIVEL) + this.parametro(this.token) + this.parametro(id);
    console.log(url);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete(url, {headers}).pipe(
      retry(10)
    );
  }

  /* Institucion %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  postInstitucion(datos: string) {
    const url = this.dataSnap_Path(this.URL_INSTITUCION) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, datos, {headers}).pipe(
      retry(10)
    );
  }

  getInstituciones() {
    const url = this.dataSnap_Path(this.URL_INSTITUCIONES);
    return this.http.get(url).pipe(
      retry(10)
    );
  }

  getInstitucion(id: string) {
    const url = this.dataSnap_Path(this.URL_INSTITUCION) + this.parametro(id);
    return this.http.get(url).pipe(
      retry(10)
    );
  }

  putInstitucion(datos: string) {
    const url = this.dataSnap_Path(this.URL_INSTITUCION) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(url, datos, {headers}).pipe(
      retry(10)
    );
  }

  deleteInstitucion(id: string) {
    const url = this.dataSnap_Path(this.URL_INSTITUCION) + this.parametro(this.token) + this.parametro(id);
    console.log(url);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete(url, {headers}).pipe(
      retry(10)
    );
  }

  /* Ruta %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  postRuta(datos: string) {
    const url = this.dataSnap_Path(this.URL_RUTA) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, datos, {headers}).pipe(
      retry(10)
    );
  }

  getRutas() {
    const url = this.dataSnap_Path(this.URL_RUTAS);
    return this.http.get(url).pipe(
      retry(10)
    );
  }

  getRuta(id: string) {
    const url = this.dataSnap_Path(this.URL_RUTA) + this.parametro(id);
    return this.http.get(url).pipe(
      retry(10)
    );
  }

  putRuta(datos: string) {
    const url = this.dataSnap_Path(this.URL_RUTA) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(url, datos, {headers}).pipe(
      retry(10)
    );
  }

  deleteRuta(id: string) {
    const url = this.dataSnap_Path(this.URL_RUTA) + this.parametro(this.token) + this.parametro(id);
    console.log(url);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete(url, {headers}).pipe(
      retry(10)
    );
  }

  /* Noticia %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  postNoticia(datos: string) {
    const url = this.dataSnap_Path(this.URL_NOTICIA) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, datos, {headers}).pipe(
      retry(10)
    );
  }

  getNoticias() {
    const url = this.dataSnap_Path(this.URL_NOTICIAS);
    return this.http.get(url).pipe(
      retry(10)
    );
  }

  getNoticia(id: string) {
    const url = this.dataSnap_Path(this.URL_NOTICIA) + this.parametro(id);
    return this.http.get(url).pipe(
      retry(10)
    );
  }

  putNoticia(datos: string) {
    const url = this.dataSnap_Path(this.URL_NOTICIA) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(url, datos, {headers}).pipe(
      retry(10)
    );
  }

  deleteNoticia(id: string) {
    const url = this.dataSnap_Path(this.URL_NOTICIA) + this.parametro(this.token) + this.parametro(id);
    console.log(url);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete(url, {headers}).pipe(
      retry(10)
    );
  }

  /* Pregunta %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  postPregunta(datos: string) {
    const url = this.dataSnap_Path(this.URL_PREGUNTA) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, datos, {headers}).pipe(
      retry(10)
    );
  }

  getPreguntas() {
    const url = this.dataSnap_Path(this.URL_PREGUNTAS);
    return this.http.get(url).pipe(
      retry(10)
    );
  }

  getPreguntasPrueba(IdPrueba: string) {
    const url = this.dataSnap_Path(this.URL_PREGUNTAS_PRUEBA) + this.parametro(IdPrueba);
    return this.http.get(url).pipe(
      retry(10)
    );
  }

  getPregunta(id: string) {
    const url = this.dataSnap_Path(this.URL_PREGUNTA) + this.parametro(id);
    return this.http.get(url).pipe(
      retry(10)
    );
  }

  putPregunta(datos: string) {
    const url = this.dataSnap_Path(this.URL_PREGUNTA) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(url, datos, {headers}).pipe(
      retry(10)
    );
  }

  deletePregunta(id: string) {
    const url = this.dataSnap_Path(this.URL_PREGUNTA) + this.parametro(this.token) + this.parametro(id);
    console.log(url);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete(url, {headers}).pipe(
      retry(10)
    );
  }

  /* OpcionPregunta %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  postOpcionPregunta(datos: string) {
    const url = this.dataSnap_Path(this.URL_OPCIONPREGUNTA) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, datos, {headers}).pipe(
      retry(10)
    );
  }

  getOpcionesPregunta(IdSecuencia: string) {
    const url = this.dataSnap_Path(this.URL_OPCIONESPREGUNTA) + this.parametro(IdSecuencia);
    return this.http.get(url).pipe(
      retry(10)
    );
  }

  getOpcionesPreguntas() {
    const url = this.dataSnap_Path(this.URL_OPCIONESPREGUNTA);
    return this.http.get(url).pipe(
      retry(10)
    );
  }

  getOpcionPregunta(id: string) {
    const url = this.dataSnap_Path(this.URL_OPCIONPREGUNTA) + this.parametro(id);
    return this.http.get(url).pipe(
      retry(10)
    );
  }

  putOpcionPregunta(datos: string) {
    const url = this.dataSnap_Path(this.URL_OPCIONPREGUNTA) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(url, datos, {headers}).pipe(
      retry(10)
    );
  }

  deleteOpcionPregunta(id: string) {
    const url = this.dataSnap_Path(this.URL_OPCIONPREGUNTA) + this.parametro(this.token) + this.parametro(id);
    console.log(url);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete(url, {headers}).pipe(
      retry(10)
    );
  }

  /* ImagenPregunta %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  postImagenPregunta(datos: string) {
    const url = this.dataSnap_Path(this.URL_IMAGENPREGUNTA) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, datos, {headers}).pipe(
      retry(10)
    );
  }

  getImagenesPregunta(IdPregunta: string) {
    const url = this.dataSnap_Path(this.URL_IMAGENESPREGUNTA) + this.parametro(IdPregunta);
    return this.http.get(url).pipe(
      retry(10)
    );
  }

  getImagenesPreguntas() {
    const url = this.dataSnap_Path(this.URL_IMAGENESPREGUNTAS);
    return this.http.get(url).pipe(
      retry(10)
    );
  }

  getImagenPregunta(id: string) {
    const url = this.dataSnap_Path(this.URL_IMAGENPREGUNTA) + this.parametro(id);
    return this.http.get(url).pipe(
      retry(10)
    );
  }

  putImagenPregunta(datos: string) {
    const url = this.dataSnap_Path(this.URL_IMAGENPREGUNTA) + this.parametro(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(url, datos, {headers}).pipe(
      retry(10)
    );
  }

  deleteImagenPregunta(id: string) {
    const url = this.dataSnap_Path(this.URL_IMAGENPREGUNTA) + this.parametro(this.token) + this.parametro(id);
    console.log(url);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete(url, {headers}).pipe(
      retry(10)
    );
  }

  /* Prueba %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

 postPrueba(datos: string) {
  const url = this.dataSnap_Path(this.URL_PRUEBA) + this.parametro(this.token);
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  return this.http.post(url, datos, {headers}).pipe(
    retry(10)
  );
}

getPruebas() {
  const url = this.dataSnap_Path(this.URL_PRUEBAS);
  return this.http.get(url).pipe(
    retry(10)
  );
}

getPrueba(id: string) {
  const url = this.dataSnap_Path(this.URL_PRUEBA) + this.parametro(id);
  return this.http.get(url).pipe(
    retry(10)
  );
}

putPrueba(datos: string) {
  const url = this.dataSnap_Path(this.URL_PRUEBA) + this.parametro(this.token);
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  return this.http.put(url, datos, {headers}).pipe(
    retry(10)
  );
}

deletePrueba(id: string) {
  const url = this.dataSnap_Path(this.URL_PRUEBA) + this.parametro(this.token) + this.parametro(id);
  console.log(url);
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  return this.http.delete(url, {headers}).pipe(
    retry(10)
  );
}
}
