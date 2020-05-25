create table if not exists rutas(
	idruta text primary key not null,
	ruta text
);

create table if not exists roles(
	idrol text primary key not null,
	nombre text
);

create table if not exists rutasroles(
	idrutarol text primary key not null,
	idruta text references rutas(idruta),
	idrol text references roles(idrol)
);

create table if not exists instituciones(
	idinstitucion text primary key not null,
	nombre text,
	direccion text,
	telefono text,
	rector text
);

create table if not exists grados(
	idgrado text primary key not null,
	nombre text
);

create table if not exists usuarios(
	idusuario text primary key not null,
	nombre text, 
	correo text,
	contra text,
	telefono text,
	idinstitucion text references instituciones(idinstitucion),
	idrol text references roles(idrol),
	idgrado text references grados(idgrado)
);

create table if not exists profesoresencargados(
	idprofesorencargado text primary key not null,
	idinstitucion text references instituciones(idinstitucion),
	idusuario text references usuarios(idusuario)
);

create table if not exists niveles(
	idnivel text primary key not null,
	nombre text
);

create table if not exists pruebas(
	idprueba text primary key not null,
	nombre text,
	fecha text,
	horainicio text,
	horafin text,
	estado text,
	descripcion text
);

create table if not exists preguntas(
	idpregunta text primary key not null,
	pregunta text,
	idnivel text references niveles(idnivel),
	idgrado text references grados(idgrado),
	idprueba text references pruebas(idprueba)
);

/* ALTER TABLE preguntas ADD COLUMN idprueba text references pruebas(idprueba); */

create table if not exists opcionespreguntas(
	idopcionpregunta text primary key not null,
	opcion text,
	esimagen text,
	escorrecta boolean,
	idpregunta text references preguntas(idpregunta)
);

create table if not exists imagenespreguntas(
	idimagenpregunta text primary key not null,	
	imagen text,
	idpregunta text references preguntas(idpregunta)
);

/* DROP table if exists preguntaspruebas
DROP table if exists puntajepruebas
DROP table if exists pruebas */

create table if not exists preguntaspruebas(
	idpreguntapruebas text primary key not null,
	idpregunta text references preguntas(idpregunta),
	idprueba text references pruebas(idprueba)
);

create table if not exists puntajepruebas(
	idpuntajeprueba text primary key not null,
	calificacion text,
	terminada text,
	fechapresentacion text,
	cantidadpreguntas text,
	nombreprueba text,
	idusuario text references usuarios(idusuario),
	idprueba text references pruebas(idprueba)
);

create table if not exists noticias(
	idnoticia text primary key not null,
	titulo text,
	noticia text,
	fechainicio text,
	fechafin text,
	imagen text
);

/* DROP TABLE if exists rutas,
roles,
rutasroles,
instituciones,
grados,
usuarios,
instituciones,
profesoresencargados,
niveles,
preguntas,
opcionespreguntas,
imagenespreguntas,
pruebas,
preguntaspruebas,
puntajepruebas */

create table if not exists configuracion(
	idconfiguracion  text primary key not null,
	estado boolean
);

create table if not exists respuestaspreguntas(
	idrespuestapregunta text primary key not null,
	idpregunta text references preguntas(idpregunta),
	idopcion text references opcionespreguntas(idopcionpregunta),
	escorrecta text,
	idusuario text references usuarios(idusuario),
	idprueba text references pruebas(idprueba)
);