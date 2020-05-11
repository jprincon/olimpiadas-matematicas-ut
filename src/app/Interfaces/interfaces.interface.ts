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

export interface Pregunta {
  idpregunta?: string;
  pregunta?: string;
  idnivel?: string;
  idgrado?: string;
  nivel?: string;
  grado?: string;
  idprueba?: string;
  prueba?: string;
}

export interface OpcionPregunta {
  idopcionpregunta?: string;
  opcion?: string;
  escorrecta?: string;
  idpregunta?: string;
}

export interface ImagenPregunta {
  idimagenpregunta?: string;
  imagen?: string;
  idpregunta?: string;
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
