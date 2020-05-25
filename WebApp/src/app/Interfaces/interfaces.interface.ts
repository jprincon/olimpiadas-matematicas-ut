export interface Rol {
  idrol?: string;
  nombre?: string;
}

export interface Usuario {
  idusuario?: string;
  nombre?: string;
  correo?: string;
  contra?: string;
  telefono?: string;
  idinstitucion?: string;
  idrol?: string;
  idgrado?: string;
}

export interface Grado {
  idgrado?: string;
  nombre?: string;
}

export interface Nivel {
  idnivel?: string;
  nombre?: string;
}

export interface Institucion {
  idinstitucion?: string;
  nombre?: string;
  direccion?: string;
  telefono?: string;
  rector?: string;
}

export interface Ruta {
  idruta?: string;
  ruta?: string;
}

export interface Noticia {
  idnoticia?: string;
  titulo?: string;
  noticia?: string;
  fechainicio?: string;
  fechafin?: string;
  imagen?: string;
}

export interface OpcionPregunta {
  idopcionpregunta?: string;
  opcion?: string;
  escorrecta?: string;
  idpregunta?: string;
  esimagen?: string;
}

export interface ImagenPregunta {
  idimagenpregunta?: string;
  imagen?: string;
  idpregunta?: string;
}

export interface Pregunta {
  idpregunta?: string;
  pregunta?: string;
  idnivel?: string;
  idgrado?: string;
  nivel?: string;
  grado?: string;
  idprueba?: string;
  prueba?: string;
  opciones?: OpcionPregunta[];
  respondida?: string;
  opcionCorrecta?: OpcionPregunta;
  opcionSeleccionada?: string;
  imagenes?: ImagenPregunta[];
}

export interface Estado {
  dias?: string;
  estado?: string;
  horas?: number;
  presentar?: string;
}

export interface Prueba {
  idprueba?: string;
  nombre?: string;
  fecha?: string;
  horainicio?: string;
  horafin?: string;
  descripcion?: string;
  estado?: Estado;
}

export interface Configuracion {
  idconfiguracion?: string;
  permiteinscripciones?: string;
}

export interface CorreoUsuario {
  nombre?: string;
  correo?: string;
}

export interface Correo {
  asunto?: string;
  titulo?: string;
  mensaje?: string;
  usuarios?: CorreoUsuario[];
}

export interface RespuestaPregunta {
  idrespuestapregunta?: string;
  idpregunta?: string;
  idopcion?: string;
  escorrecta?: string;
  idusuario?: string;
  idprueba?: string;
}

export interface PuntajePrueba {
  idpuntajeprueba?: string;
  calificacion?: string;
  idpregunta?: string;
  idusuario?: string;
  idprueba?: string;
  terminada?: string;
  fechapresentacion?: string;
  cantidadpreguntas?: string;
  nombreprueba?: string;
}

export interface Puntaje {
  calificacion?: string;
  cantidadpreguntas?: string;
  fechapresentacion?: string;
  idprueba?: string;
  idpuntajeprueba?: string;
  idusuario?: string;
  nombreprueba?: string;
  terminada?: string;
  Data?: number[];
  Labels?: string[];
}

export interface DataBar {
  data: number[];
}

export interface EstadisticaPregunta {
  Correctas?: string;
  Incorrectas?: string;
  Datos: DataBar[];
  Labels: string[];
  PorcCorrectas?: string;
  PorcIncorrectas?: string;
  idpregunta?: string;
  pregunta?: string;
  totalRespuesta?: string;
}
