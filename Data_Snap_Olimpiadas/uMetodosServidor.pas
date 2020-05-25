unit uMetodosServidor;

interface

uses System.SysUtils, System.Classes, System.Json,
  Datasnap.DSServer, Datasnap.DSAuth, FireDAC.Stan.Intf, FireDAC.Stan.Option,
  FireDAC.Stan.Param, FireDAC.Stan.Error, FireDAC.DatS, FireDAC.Phys.Intf,
  FireDAC.DApt.Intf, FireDAC.Stan.Async, FireDAC.DApt, FireDAC.UI.Intf,
  FireDAC.Stan.Def, FireDAC.Stan.Pool, FireDAC.Phys, FireDAC.Phys.PG,
  FireDAC.Phys.PGDef, FireDAC.VCLUI.Wait, Data.DB, FireDAC.Comp.Client,
  FireDAC.Comp.DataSet, uFOlimpiadas, IdBaseComponent, IdComponent,
  IdTCPConnection, IdTCPClient, IdExplicitTLSClientServerBase, IdMessageClient,
  IdSMTPBase, IdSMTP, IdMessage, IdIOHandler, IdIOHandlerSocket,
  System.NetEncoding, dialogs,
  IdIOHandlerStack, IdSSL, IdSSLOpenSSL, IdTelnet, IdText, uBackupModule,
  uFCertificado, Utilidades;

type
{$METHODINFO ON}
  TOlimpiadas = class(TDataModule)
    Conexion: TFDConnection;
    SMTP: TIdSMTP;
    SSL: TIdSSLIOHandlerSocketOpenSSL;
    Data: TIdMessage;
    IdTelnet1: TIdTelnet;
    procedure DataModuleCreate(Sender: TObject);
  private
    FParametros: TStringList;
    FTipo: TStringList;

    procedure escribirMensaje(msg: string; tipo: string);

    function AccesoDenegado: string;
    function estadisticaPregunta(const IdPregunta: string): TJSONObject;
  public
    { Public declarations }
    function EchoString(Value: string): string;
    function ReverseString(Value: string): string;

    procedure limpiarConsulta(Query: TFDQuery);
    procedure SELECT(nombreTabla, OrdenarPor: string; Query: TFDQuery);
    procedure SelectWhere(nombreTabla, Identificador, ID: string;
      Query: TFDQuery);
    procedure SelectWhereOrder(nombreTabla, Identificador, OrdenarPor,
      ID: string; Query: TFDQuery);
    procedure InnerJoin(Tabla1, Tabla2, Parametro, IdBusqueda, Valor: string;
      Query: TFDQuery);
    procedure InnerJoin3(Tabla1, Tabla2, Tabla3, Parametro1, Parametro2,
      IdBusqueda, Valor: string; Query: TFDQuery);
    procedure INSERT(nombreTabla: string; Query: TFDQuery);
    procedure DELETE(nombreTabla, Identificador, ID: string; Query: TFDQuery);
    procedure UPDATE(nombreTabla, Identificador, ID: string; Query: TFDQuery);
    procedure limpiarParametros;
    Procedure agregarParametro(Param: string; tipo: string);
    function crearJSON(Query: TFDQuery): TJSONObject;
    procedure asignarDatos(datos: TJSONObject; Query: TFDQuery);
    function Texto(ss: string): string;
    function JsonRespuesta: string;
    function JsonError: string;

    function StringToBoolJS(ss: string): boolean;
    function BoolToStringJS(bb: boolean): string;

    function updateToken(const datos: TJSONObject): TJSONObject;
    function updateRecuperarContra(const token: string;
      const datos: TJSONObject): TJSONObject;

    function DateToString(fecha: Tdate): string;
    function DateJSToDatePAS(ss: string): Tdate;
    function CompararFechas(fecha1, fecha2: Tdate): integer;

    { Otros Servicios }
    function SubirArchivo(const datos: TJSONObject): boolean;
    function updateDescargarCertificado(const datos: TJSONObject): TJSONObject;
    function updateEnviarCorreo(const token: string; const datos: TJSONObject)
      : TJSONObject;
    function DescargarBackup(const nombreArchivo: string): TJSONObject;
    function DescargarPostgresBackup: TJSONObject;

    { Rol }
    function updateRol(const token: string; const datos: TJSONObject)
      : TJSONObject;
    function Rol(const ID: string): TJSONObject;
    function Roles: TJSONObject;
    function cancelRol(const token: string; const ID: string): TJSONObject;
    function acceptRol(const token: string; const datos: TJSONObject)
      : TJSONObject;

    { Usuario }
    function updateUsuario(const token: string; const datos: TJSONObject)
      : TJSONObject;
    function Usuario(const ID: string): TJSONObject;
    function Usuarios: TJSONObject;
    function UsuariosPorInstitucion(const IdInstitucion: string): TJSONObject;
    function UsuariosPorRol(const IdRol: string): TJSONObject;
    function cancelUsuario(const token: string; const ID: string): TJSONObject;
    function acceptUsuario(const token: string; const datos: TJSONObject)
      : TJSONObject;

    { Grado }
    function updateGrado(const token: string; const datos: TJSONObject)
      : TJSONObject;
    function Grado(const ID: string): TJSONObject;
    function Grados: TJSONObject;
    function cancelGrado(const token: string; const ID: string): TJSONObject;
    function acceptGrado(const token: string; const datos: TJSONObject)
      : TJSONObject;

    { Nivel }
    function updateNivel(const token: string; const datos: TJSONObject)
      : TJSONObject;
    function Nivel(const ID: string): TJSONObject;
    function Niveles: TJSONObject;
    function cancelNivel(const token: string; const ID: string): TJSONObject;
    function acceptNivel(const token: string; const datos: TJSONObject)
      : TJSONObject;

    { Institucion }
    function updateInstitucion(const token: string; const datos: TJSONObject)
      : TJSONObject;
    function Institucion(const ID: string): TJSONObject;
    function Instituciones: TJSONObject;
    function cancelInstitucion(const token: string; const ID: string)
      : TJSONObject;
    function acceptInstitucion(const token: string; const datos: TJSONObject)
      : TJSONObject;

    { Ruta }
    function updateRuta(const token: string; const datos: TJSONObject)
      : TJSONObject;
    function Ruta(const ID: string): TJSONObject;
    function Rutas: TJSONObject;
    function cancelRuta(const token: string; const ID: string): TJSONObject;
    function acceptRuta(const token: string; const datos: TJSONObject)
      : TJSONObject;

    { Noticia }
    function updateNoticia(const token: string; const datos: TJSONObject)
      : TJSONObject;
    function Noticia(const ID: string): TJSONObject;
    function Noticias: TJSONObject;
    function cancelNoticia(const token: string; const ID: string): TJSONObject;
    function acceptNoticia(const token: string; const datos: TJSONObject)
      : TJSONObject;

    { Pregunta }
    function updatePregunta(const token: string; const datos: TJSONObject)
      : TJSONObject;
    function Pregunta(const ID: string): TJSONObject;
    function Preguntas: TJSONObject;
    function PreguntasPrueba(const IdPrueba: string; const IdUsuario: string)
      : TJSONObject;
    function ExportarPreguntasPorNivel: TJSONObject;
    function cancelPregunta(const token: string; const ID: string): TJSONObject;
    function acceptPregunta(const token: string; const datos: TJSONObject)
      : TJSONObject;

    { OpcionPregunta }
    function updateOpcionPregunta(const token: string; const datos: TJSONObject)
      : TJSONObject;
    function OpcionPregunta(const ID: string): TJSONObject;
    function OpcionesPregunta(const IdPregunta: string): TJSONObject;
    function OpcionesPreguntas: TJSONObject;
    function cancelOpcionPregunta(const token: string; const ID: string)
      : TJSONObject;
    function acceptOpcionPregunta(const token: string; const datos: TJSONObject)
      : TJSONObject;

    { ImagenPregunta }
    function updateImagenPregunta(const token: string; const datos: TJSONObject)
      : TJSONObject;
    function ImagenPregunta(const ID: string): TJSONObject;
    function ImagenesPregunta(const IdPregunta: string): TJSONObject;
    function ImagenesPreguntas: TJSONObject;
    function cancelImagenPregunta(const token: string; const ID: string)
      : TJSONObject;
    function acceptImagenPregunta(const token: string; const datos: TJSONObject)
      : TJSONObject;

    { Prueba }
    function updatePrueba(const token: string; const datos: TJSONObject)
      : TJSONObject;
    function Prueba(const ID: string): TJSONObject;
    function Pruebas: TJSONObject;
    function updateValidarAccesoPrueba(const datos: TJSONObject): TJSONObject;
    function cancelPrueba(const token: string; const ID: string): TJSONObject;
    function acceptPrueba(const token: string; const datos: TJSONObject)
      : TJSONObject;

    { Configuracion }
    function updateConfiguracion(const token: string; const datos: TJSONObject)
      : TJSONObject;
    function Configuracion(const ID: string): TJSONObject;
    function Configuraciones: TJSONObject;
    function cancelConfiguracion(const token: string; const ID: string)
      : TJSONObject;
    function acceptConfiguracion(const token: string; const datos: TJSONObject)
      : TJSONObject;

    { RespuestaPregunta }
    function updateRespuestaPregunta(const token: string;
      const datos: TJSONObject): TJSONObject;
    function RespuestaPregunta(const ID: string): TJSONObject;
    function RespuestaPreguntas: TJSONObject;
    function cancelRespuestaPregunta(const token: string; const ID: string)
      : TJSONObject;
    function acceptRespuestaPregunta(const token: string;
      const datos: TJSONObject): TJSONObject;

    { PuntajePrueba }
    function updatePuntajePrueba(const token: string; const datos: TJSONObject)
      : TJSONObject;
    function PuntajePrueba(const IdUsuario: string): TJSONObject;
    function PuntajesPrueba: TJSONObject;
    function Ranking(const IdUsuario: string): TJSONObject;
    function cancelPuntajePrueba(const token: string; const ID: string)
      : TJSONObject;
    function acceptPuntajePrueba(const token: string; const datos: TJSONObject)
      : TJSONObject;

    function estadisticaPreguntas: TJSONObject;
    function estadisticaPruebas: TJSONObject;
  end;
{$METHODINFO OFF}

implementation

{$R *.dfm}

uses System.StrUtils;

{ Método INSERT - PuntajePrueba }
function TOlimpiadas.updatePuntajePrueba(const token: string;
  const datos: TJSONObject): TJSONObject;
var
  Json, tDatos: TJSONObject;
  Query, QueryResp: TFDQuery;
  IdPrueba, IdUsuario: string;
  total: integer;
  nota: real;
  i: integer;
begin
  try
    Query := TFDQuery.create(nil);
    Query.Connection := Conexion;
    QueryResp := TFDQuery.create(nil);
    QueryResp.Connection := Conexion;

    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin

      IdUsuario := datos.GetValue('idusuario').Value;
      IdPrueba := datos.GetValue('idprueba').Value;

      QueryResp.Close;
      QueryResp.SQL.Text := 'SELECT * FROM respuestaspreguntas WHERE idprueba='
        + Texto(IdPrueba) + ' AND idusuario=' + Texto(IdUsuario);
      QueryResp.Open;

      nota := 0;
      total := QueryResp.RecordCount;
      for i := 1 to total do
      begin
        if QueryResp.FieldByName('escorrecta').AsString = 'Si' then
          nota := nota + 1;

        QueryResp.Next;
      end;

      nota := 5 * (nota / total);

      limpiarConsulta(Query);

      limpiarParametros;

      agregarParametro('idpuntajeprueba', 'String');
      agregarParametro('calificacion', 'String');
      agregarParametro('idusuario', 'String');
      agregarParametro('idprueba', 'String');
      agregarParametro('terminada', 'String');
      agregarParametro('fechapresentacion', 'String');
      agregarParametro('cantidadpreguntas', 'String');
      agregarParametro('nombreprueba', 'String');

      INSERT('puntajepruebas', Query);

      tDatos := TJSONObject.create;
      tDatos := datos;
      tDatos.AddPair('calificacion', FloatToStr(nota));
      tDatos.AddPair('fechapresentacion', DateToStr(now));
      asignarDatos(tDatos, Query);

      Json.AddPair(JsonRespuesta,
        'el puntaje de la prueba se creo correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToStr(now),
        'updatePuntajePrueba', datos.toString, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('updatePuntajePrueba', Json.toString);
  Query.Free;
end;

{ Método GET - PuntajePrueba }
function TOlimpiadas.PuntajePrueba(const IdUsuario: string): TJSONObject;
var
  Json, JsonPuntaje: TJSONObject;
  ArrayPuntajes, ArrayLabel, ArrayData: TJSONArray;
  Query, QueryPrueba: TFDQuery;
  i: integer;
  nota, restante: real;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;
    ArrayPuntajes := TJSONArray.create;
    Json.AddPair('Puntajes', ArrayPuntajes);

    limpiarConsulta(Query);
    SelectWhere('puntajepruebas', 'idusuario', Texto(IdUsuario), Query);

    limpiarParametros;
    agregarParametro('idpuntajeprueba', 'String');
    agregarParametro('calificacion', 'String');
    agregarParametro('idusuario', 'String');
    agregarParametro('idprueba', 'String');
    agregarParametro('terminada', 'String');
    agregarParametro('fechapresentacion', 'String');
    agregarParametro('cantidadpreguntas', 'String');
    agregarParametro('nombreprueba', 'String');

    for i := 1 to Query.RecordCount do
    begin
      JsonPuntaje := TJSONObject.create;
      JsonPuntaje := crearJSON(Query);

      nota := StrToFloat(Query.FieldByName('calificacion').AsString);
      restante := 5 - nota;

      ArrayLabel := TJSONArray.create;
      ArrayData := TJSONArray.create;

      ArrayLabel.Add('Respuestas Correctas');
      ArrayLabel.Add('Respuestas Incorrectas');
      JsonPuntaje.AddPair('Labels', ArrayLabel);

      ArrayData.Add(nota);
      ArrayData.Add(restante);
      JsonPuntaje.AddPair('Data', ArrayData);

      ArrayPuntajes.Add(JsonPuntaje);

      Query.Next;
    end;

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToStr(now),
        'getPuntajePrueba', IdUsuario, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('PuntajePrueba', Json.toString);
  Query.Free;
end;

{ Método GET-ALL - PuntajePrueba }
function TOlimpiadas.PuntajesPrueba: TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  ArrayJson: TJSONArray;
  JsonLinea: TJSONObject;
  i: integer;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;
    ArrayJson := TJSONArray.create;
    Json.AddPair('PuntajesPruebas', ArrayJson);

    limpiarConsulta(Query);
    SELECT('puntajepruebas', 'calificacion', Query);

    limpiarParametros;
    agregarParametro('idpuntajeprueba', 'String');
    agregarParametro('calificacion', 'String');
    agregarParametro('idusuario', 'String');
    agregarParametro('idprueba', 'String');
    agregarParametro('terminada', 'String');

    for i := 1 to Query.RecordCount do
    begin
      ArrayJson.AddElement(crearJSON(Query));
      Query.Next;
    end;

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToStr(now),
        'getAllPuntajePrueba', '-no data-', E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('PuntajesPrueba', Json.toString);
  Query.Free;
end;

{ Método DELETE - PuntajePrueba }
function TOlimpiadas.cancelPuntajePrueba(const token, ID: string): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin
      limpiarConsulta(Query);
      DELETE('puntajepruebas', 'idpuntajeprueba', Texto(ID), Query);

      Json.AddPair(JsonRespuesta,
        'el puntaje de la prueba se elmino correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToStr(now),
        'deletePuntajePrueba', ID, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('cancelPuntajePrueba', Json.toString);
  Query.Free;
end;

{ Método UPDATE - PuntajePrueba }
function TOlimpiadas.acceptPuntajePrueba(const token: string;
  const datos: TJSONObject): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  ID: string;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin
      limpiarConsulta(Query);

      limpiarParametros;

      agregarParametro('idpuntajeprueba', 'String');
      agregarParametro('calificacion', 'String');
      agregarParametro('idusuario', 'String');
      agregarParametro('idprueba', 'String');
      agregarParametro('terminada', 'String');

      ID := datos.GetValue('idpuntajeprueba').Value;
      UPDATE('puntajepruebas', 'idpuntajeprueba', Texto(ID), Query);

      asignarDatos(datos, Query);

      Json.AddPair(JsonRespuesta,
        'el puntaje de la prueba se actualizo correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToStr(now),
        'acceptPuntajePrueba', datos.toString, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('updatePuntajePrueba', Json.toString);
  Query.Free;
end;

{ Método INSERT - RespuestaPregunta }
function TOlimpiadas.updateRespuestaPregunta(const token: string;
  const datos: TJSONObject): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
begin
  try
    Query := TFDQuery.create(nil);
    Query.Connection := Conexion;
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin

      limpiarConsulta(Query);

      limpiarParametros;

      agregarParametro('idrespuestapregunta', 'String');
      agregarParametro('idpregunta', 'String');
      agregarParametro('idopcion', 'String');
      agregarParametro('escorrecta', 'String');
      agregarParametro('idusuario', 'String');
      agregarParametro('idprueba', 'String');

      INSERT('configuracion', Query);

      asignarDatos(datos, Query);

      Json.AddPair(JsonRespuesta, 'La Respuesta se creo correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToStr(now),
        'updateRespuestaPregunta', datos.toString, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('updateRespuestaPregunta', Json.toString);
  Query.Free;
end;

function TOlimpiadas.Ranking(const IdUsuario: string): TJSONObject;
begin

end;

{ Método GET - RespuestaPregunta }
function TOlimpiadas.RespuestaPregunta(const ID: string): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  i: integer;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    limpiarConsulta(Query);
    SelectWhere('configuracion', 'idrespuestapregunta', Texto(ID), Query);

    limpiarParametros;
    agregarParametro('idrespuestapregunta', 'String');
    agregarParametro('idpregunta', 'String');
    agregarParametro('idopcion', 'String');
    agregarParametro('escorrecta', 'String');
    agregarParametro('idusuario', 'String');
    agregarParametro('idprueba', 'String');

    Json := crearJSON(Query);

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToStr(now),
        'getRespuestaPregunta', ID, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('RespuestaPregunta', Json.toString);
  Query.Free;
end;

{ Método GET-ALL - RespuestaPregunta }
function TOlimpiadas.RespuestaPreguntas: TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  ArrayJson: TJSONArray;
  JsonLinea: TJSONObject;
  i: integer;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;
    ArrayJson := TJSONArray.create;
    Json.AddPair('RespuestasPreguntas', ArrayJson);

    limpiarConsulta(Query);
    SELECT('configuracion', 'idpregunta', Query);

    limpiarParametros;
    agregarParametro('idrespuestapregunta', 'String');
    agregarParametro('idpregunta', 'String');
    agregarParametro('idopcion', 'String');
    agregarParametro('escorrecta', 'String');
    agregarParametro('idusuario', 'String');
    agregarParametro('idprueba', 'String');

    for i := 1 to Query.RecordCount do
    begin
      ArrayJson.AddElement(crearJSON(Query));
      Query.Next;
    end;

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToStr(now),
        'getAllRespuestaPregunta', '-no data-', E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('RespuestaPreguntas', Json.toString);
  Query.Free;
end;

{ Método DELETE - RespuestaPregunta }
function TOlimpiadas.cancelRespuestaPregunta(const token, ID: string)
  : TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin
      limpiarConsulta(Query);
      DELETE('configuracion', 'idrespuestapregunta', Texto(ID), Query);

      Json.AddPair(JsonRespuesta, 'La Respuesta se elimino correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToStr(now),
        'deleteRespuestaPregunta', ID, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('cancelRespuestaPregunta', Json.toString);
  Query.Free;
end;

{ Método UPDATE - RespuestaPregunta }
function TOlimpiadas.acceptRespuestaPregunta(const token: string;
  const datos: TJSONObject): TJSONObject;
var
  Json, tDatos: TJSONObject;
  Query, QueryValidar: TFDQuery;
  ID: string;
  IdPregunta, IdUsuario, IdPrueba: string;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  QueryValidar := TFDQuery.create(nil);
  QueryValidar.Connection := Conexion;

  try
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin
      { Determinar si ya existe en la base de datos }
      QueryValidar.Close;

      IdPregunta := datos.GetValue('idpregunta').Value;
      IdUsuario := datos.GetValue('idusuario').Value;
      IdPrueba := datos.GetValue('idprueba').Value;

      QueryValidar.SQL.Text := 'SELECT * FROM respuestaspreguntas WHERE ' +
        ' idpregunta=' + #39 + IdPregunta + #39 + ' and idprueba=' + #39 +
        IdPrueba + #39 + ' and idusuario=' + #39 + IdUsuario + #39;
      QueryValidar.Open;

      if QueryValidar.RecordCount >= 1 then
      begin
        { Actualizar }

        limpiarConsulta(Query);

        limpiarParametros;

        agregarParametro('idrespuestapregunta', 'String');
        agregarParametro('idpregunta', 'String');
        agregarParametro('idopcion', 'String');
        agregarParametro('escorrecta', 'String');
        agregarParametro('idusuario', 'String');
        agregarParametro('idprueba', 'String');

        ID := QueryValidar.FieldByName('idrespuestapregunta').AsString;
        UPDATE('respuestaspreguntas', 'idrespuestapregunta', Texto(ID), Query);

        asignarDatos(datos, Query);

        Json.AddPair(JsonRespuesta, 'La Respuesta se actualizo correctamente');
      end
      else
      begin
        { Crear }

        limpiarConsulta(Query);

        limpiarParametros;

        agregarParametro('idrespuestapregunta', 'String');
        agregarParametro('idpregunta', 'String');
        agregarParametro('idopcion', 'String');
        agregarParametro('escorrecta', 'String');
        agregarParametro('idusuario', 'String');
        agregarParametro('idprueba', 'String');

        INSERT('respuestaspreguntas', Query);

        tDatos := TJSONObject.create;
        tDatos := datos;
        tDatos.AddPair('idrespuestapregunta', generarID);

        escribirMensaje('acceptRespuestaPregunta', tDatos.toString);

        asignarDatos(tDatos, Query);

        Json.AddPair(JsonRespuesta, 'La Respuesta se actualizo correctamente');
      end;

    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToStr(now),
        'acceptRespuestaPregunta', datos.toString, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('updateRespuestaPregunta', Json.toString);
  Query.Free;
end;

{ Método INSERT - Configuracion }
function TOlimpiadas.updateConfiguracion(const token: string;
  const datos: TJSONObject): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
begin
  try
    Query := TFDQuery.create(nil);
    Query.Connection := Conexion;
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin

      limpiarConsulta(Query);

      limpiarParametros;

      agregarParametro('idconfiguracion', 'String');
      agregarParametro('permiteinscripciones', 'String');

      INSERT('configuracion', Query);

      asignarDatos(datos, Query);

      Json.AddPair(JsonRespuesta, 'La Configuración se creo correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToStr(now),
        'updateConfiguracion', datos.toString, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('updateConfiguracion', Json.toString);
  Query.Free;
end;

{ Método GET - Configuracion }
function TOlimpiadas.Configuracion(const ID: string): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  i: integer;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    limpiarConsulta(Query);
    SelectWhere('configuracion', 'idconfiguracion', Texto(ID), Query);

    limpiarParametros;
    agregarParametro('idconfiguracion', 'String');
    agregarParametro('permiteinscripciones', 'String');

    Json := crearJSON(Query);

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToStr(now),
        'getConfiguracion', ID, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('Configuracion', Json.toString);
  Query.Free;
end;

{ Método GET-ALL - Configuracion }
function TOlimpiadas.Configuraciones: TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  ArrayJson: TJSONArray;
  JsonLinea: TJSONObject;
  i: integer;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;
    ArrayJson := TJSONArray.create;
    Json.AddPair('Configuraciones', ArrayJson);

    limpiarConsulta(Query);
    SELECT('configuracion', 'estado', Query);

    limpiarParametros;
    agregarParametro('idconfiguracion', 'String');
    agregarParametro('permiteinscripciones', 'String');

    for i := 1 to Query.RecordCount do
    begin
      ArrayJson.AddElement(crearJSON(Query));
      Query.Next;
    end;

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToStr(now),
        'getAllConfiguracion', '-no data-', E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('Configuraciones', Json.toString);
  Query.Free;
end;

{ Método DELETE - Configuracion }
function TOlimpiadas.cancelConfiguracion(const token, ID: string): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin
      limpiarConsulta(Query);
      DELETE('configuracion', 'idconfiguracion', Texto(ID), Query);

      Json.AddPair(JsonRespuesta, 'La Configuración se elimino correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToStr(now),
        'deleteConfiguracion', ID, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('cancelConfiguracion', Json.toString);
  Query.Free;
end;

{ Método UPDATE - Configuracion }
function TOlimpiadas.acceptConfiguracion(const token: string;
  const datos: TJSONObject): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  ID: string;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin
      escribirMensaje('acceptConfiguracion', datos.toString);

      limpiarConsulta(Query);

      limpiarParametros;

      agregarParametro('idconfiguracion', 'String');
      agregarParametro('permiteinscripciones', 'String');

      ID := datos.GetValue('idconfiguracion').Value;
      UPDATE('configuracion', 'idconfiguracion', Texto(ID), Query);

      asignarDatos(datos, Query);

      Json.AddPair(JsonRespuesta,
        'La Configuración se actualizo correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToStr(now),
        'acceptConfiguracion', datos.toString, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('updateConfiguracion', Json.toString);
  Query.Free;
end;

{ Método INSERT - Prueba }
function TOlimpiadas.updatePrueba(const token: string; const datos: TJSONObject)
  : TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
begin
  try
    Query := TFDQuery.create(nil);
    Query.Connection := Conexion;
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin

      limpiarConsulta(Query);

      limpiarParametros;

      agregarParametro('idprueba', 'String');
      agregarParametro('nombre', 'String');
      agregarParametro('fecha', 'String');
      agregarParametro('horainicio', 'String');
      agregarParametro('horafin', 'String');
      agregarParametro('estado', 'String');
      agregarParametro('descripcion', 'String');

      INSERT('pruebas', Query);

      asignarDatos(datos, Query);

      Json.AddPair(JsonRespuesta, 'La Prueba se creo correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'updatePrueba', datos.toString, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('POST', 'Prueba: ' + Json.toString);
  Query.Free;
end;

{ Método GET - Prueba }
function TOlimpiadas.Prueba(const ID: string): TJSONObject;
var
  Json, JsonTemp: TJSONObject;
  Query: TFDQuery;
  i: integer;
  fechaHoy, fechaDato: Tdate;
  horaHoy: TTime;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    limpiarConsulta(Query);
    SelectWhere('pruebas', 'idprueba', Texto(ID), Query);

    limpiarParametros;
    agregarParametro('idprueba', 'String');
    agregarParametro('nombre', 'String');
    agregarParametro('fecha', 'String');
    agregarParametro('horainicio', 'String');
    agregarParametro('horafin', 'String');
    agregarParametro('descripcion', 'String');

    JsonTemp := TJSONObject.create;
    JsonTemp := crearJSON(Query);

    // fechaHoy := now;
    // escribirMensaje(Query.FieldByName('fecha').AsString, 'Fecha');
    // fechaDato := StrToDate(Query.FieldByName('fecha').AsString);
    //
    // horaHoy := now;
    //
    // JsonTemp.AddPair('estado', DateToStr(fechaHoy) + ' - ' +
    // DateToStr(fechaDato) + ' - ' + TimeToStr(horaHoy));

    JsonTemp.AddPair('estado', '');
    Json := JsonTemp;

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now), 'Prueba',
        ID, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('GET', 'Prueba: ' + Json.toString);
  Query.Free;
end;

{ Método GET-ALL - Prueba }
function TOlimpiadas.Pruebas: TJSONObject;
var
  Json, JsonTemp, JsonEstado: TJSONObject;
  Query: TFDQuery;
  ArrayJson: TJSONArray;
  i, dias: integer;
  fechaDato: Tdate;
  yy, mm, dd: word;
  hh, mt, ss, ms: word;
  horaHoy, horaInicio, horaFin: TTime;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;
    ArrayJson := TJSONArray.create;
    Json.AddPair('Pruebas', ArrayJson);

    limpiarConsulta(Query);
    SELECT('pruebas', 'nombre', Query);

    limpiarParametros;
    agregarParametro('idprueba', 'String');
    agregarParametro('nombre', 'String');
    agregarParametro('fecha', 'String');
    agregarParametro('horainicio', 'String');
    agregarParametro('horafin', 'String');
    agregarParametro('estado', 'String');
    agregarParametro('descripcion', 'String');

    for i := 1 to Query.RecordCount do
    begin
      JsonTemp := TJSONObject.create;
      JsonTemp := crearJSON(Query);
      JsonEstado := TJSONObject.create;

      fechaDato := DateJSToDatePAS(Query.FieldByName('fecha').AsString);
      dias := CompararFechas(fechaDato, now);

      if dias < 0 then
      begin
        JsonEstado.AddPair('estado', 'En Espera');
        JsonEstado.AddPair('dias', 'Faltan ' + IntToStr(abs(dias)) +
          ' días para la prueba');
        JsonEstado.AddPair('presentar', 'no');
      end;

      if dias = 0 then
      begin
        { Calcular la fecha de hoy, la hora de inicio y la hora de fin }
        horaHoy := now;
        DecodeDate(horaHoy, yy, mm, dd);
        horaInicio := StrToTime(JsonTemp.GetValue('horainicio').Value) +
          EncodeDate(yy, mm, dd);
        horaFin := StrToTime(JsonTemp.GetValue('horafin').Value) +
          EncodeDate(yy, mm, dd);

        if (horaHoy < horaInicio) then
        begin
          DecodeTime(horaInicio - horaHoy, hh, mt, ss, ms);
          JsonEstado.AddPair('dias', 'Esta prueba es hoy, dentro de ' +
            Format('%d horas y %d minutos', [hh, mt]));
          JsonEstado.AddPair('presentar', 'no');
        end;

        if (horaHoy > horaInicio) and (horaHoy < horaFin) then
        begin
          DecodeTime(horaFin - horaHoy, hh, mt, ss, ms);
          JsonEstado.AddPair('dias', 'Esta prueba es hoy, quedan ' +
            Format('%d horas y %d minutos ', [hh, mt]) + ' para terminarla');
          JsonEstado.AddPair('presentar', 'si');
        end;

        if (horaHoy > horaFin) then
        begin
          DecodeTime(horaInicio - horaHoy, hh, mt, ss, ms);
          JsonEstado.AddPair('dias', 'Esta prueba fue hoy, hace ' +
            Format('%d horas y %d minutos', [hh, mt]));
          JsonEstado.AddPair('presentar', 'no');
        end;

        JsonEstado.AddPair('estado', 'Actual');
      end;

      if dias > 0 then
      begin
        JsonEstado.AddPair('estado', 'Finalizada');
        JsonEstado.AddPair('dias', 'La prueba fue hace ' + IntToStr(dias)
          + ' días');
        JsonEstado.AddPair('presentar', 'no');
      end;

      JsonTemp.AddPair('estado', JsonEstado);

      ArrayJson.AddElement(JsonTemp);
      Query.Next;
    end;

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now), 'Pruebas',
        '-no aplica-', E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('GET', 'Prueba: ' + Json.toString);
  Query.Free;
end;

function TOlimpiadas.updateValidarAccesoPrueba(const datos: TJSONObject)
  : TJSONObject;
var
  IdPrueba, IdUsuario: string;
  Query: TFDQuery;
  Json: TJSONObject;

  i, dias: integer;
  fechaDato: Tdate;
  yy, mm, dd: word;
  hh, mt, ss, ms: word;
  horaHoy, horaInicio, horaFin: TTime;

  resultadoValidacion: boolean;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    { Se supone en un inicio que se puede presentar la prueba }
    resultadoValidacion := True;
    escribirMensaje('datos', datos.toString);
    escribirMensaje('prueba', '1243');

    // Datos de consulta
    IdPrueba := datos.GetValue('idprueba').Value;
    IdUsuario := datos.GetValue('idusuario').Value;

    { Validar que este en el tiempo permitido %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% }
    Query.Close;
    Query.SQL.Text := 'SELECT * FROM pruebas WHERE idprueba=' + Texto(IdPrueba);
    Query.Open;

    fechaDato := DateJSToDatePAS(Query.FieldByName('fecha').AsString);
    dias := CompararFechas(fechaDato, now);

    escribirMensaje('prueba', '1250');

    if (dias < 0) or (dias > 0) then
    begin
      Json.AddPair('tiempoPermitido', 'No');
      resultadoValidacion := resultadoValidacion and False;
    end;

    if dias = 0 then
    begin
      { Calcular la fecha de hoy, la hora de inicio y la hora de fin }
      horaHoy := now;
      DecodeDate(horaHoy, yy, mm, dd);
      horaInicio := StrToTime(Query.FieldByName('horainicio').AsString) +
        EncodeDate(yy, mm, dd);
      horaFin := StrToTime(Query.FieldByName('horafin').AsString) +
        EncodeDate(yy, mm, dd);

      if (horaHoy < horaInicio) or (horaHoy > horaFin) then
      begin
        Json.AddPair('tiempoPermitido', 'No');
        resultadoValidacion := resultadoValidacion and False;
      end;

      if (horaHoy > horaInicio) and (horaHoy < horaFin) then
      begin
        Json.AddPair('tiempoPermitido', 'Si');
        resultadoValidacion := resultadoValidacion and True;
      end;
    end;

    escribirMensaje('prueba', '1280');
    { Determinar si la prueba ya fue presentada %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% }
    Query.Close;
    Query.SQL.Text := 'SELECT * FROM puntajepruebas WHERE idprueba=' +
      Texto(IdPrueba) + ' AND idusuario=' + Texto(IdUsuario);
    Query.Open;

    if Query.RecordCount >= 1 then
    begin
      if Query.FieldByName('terminada').AsString = 'Si' then
      begin
        resultadoValidacion := resultadoValidacion and False;
        Json.AddPair('pruebaPresentada', 'Si');
      end
      else
      begin
        resultadoValidacion := resultadoValidacion and True;
        Json.AddPair('pruebaPresentada', 'No');
      end;
    end
    else
    begin
      resultadoValidacion := resultadoValidacion and True;
      Json.AddPair('pruebaPresentada', 'No');
    end;

    escribirMensaje('prueba', '1308');
    { Determinar si el usuario tiene el puntaje necesario para presentar %%%%%
      la prueba actual %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% }
    Json.AddPair('superaCalificacion', 'Si');

    if resultadoValidacion then
      Json.AddPair('resultadoValidacion', 'Si')
    else
      Json.AddPair('resultadoValidacion', 'No');
    escribirMensaje('prueba', '1317');
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'updateValidarAccesoPrueba', datos.toString, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('DELETE', 'Prueba: ' + Json.toString);
  Query.Free;
end;

{ Método DELETE - Prueba }
function TOlimpiadas.cancelPrueba(const token, ID: string): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin
      limpiarConsulta(Query);
      DELETE('pruebas', 'idprueba', Texto(ID), Query);

      Json.AddPair(JsonRespuesta, 'La Prueba se elimino correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'cancelPrueba', ID, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('DELETE', 'Prueba: ' + Json.toString);
  Query.Free;
end;

{ Método UPDATE - Prueba }
function TOlimpiadas.acceptPrueba(const token: string; const datos: TJSONObject)
  : TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  ID: string;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin
      limpiarConsulta(Query);

      limpiarParametros;

      agregarParametro('idprueba', 'String');
      agregarParametro('nombre', 'String');
      agregarParametro('fecha', 'String');
      agregarParametro('horainicio', 'String');
      agregarParametro('horafin', 'String');
      agregarParametro('estado', 'String');
      agregarParametro('descripcion', 'String');

      ID := datos.GetValue('idprueba').Value;
      UPDATE('pruebas', 'idprueba', Texto(ID), Query);

      asignarDatos(datos, Query);

      Json.AddPair(JsonRespuesta, 'La Prueba se actualizo correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'acceptPrueba', datos.toString, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('UPDATE', 'Prueba: ' + Json.toString);
  Query.Free;
end;

{ Método INSERT - ImagenPregunta }
function TOlimpiadas.updateImagenPregunta(const token: string;
  const datos: TJSONObject): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  i: integer;
begin
  try
    Query := TFDQuery.create(nil);
    Query.Connection := Conexion;
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin

      limpiarConsulta(Query);

      limpiarParametros;

      agregarParametro('idimagenpregunta', 'String');
      agregarParametro('imagen', 'String');
      agregarParametro('idpregunta', 'String');

      INSERT('imagenespreguntas', Query);

      Query.Params.ParamByName(FParametros[0]).Value :=
        datos.GetValue(FParametros[0]).Value;
      Query.Params.ParamByName(FParametros[1]).AsWideMemo :=
        datos.GetValue(FParametros[1]).Value;
      Query.Params.ParamByName(FParametros[2]).Value :=
        datos.GetValue(FParametros[2]).Value;
      Query.ExecSQL;

      Json.AddPair(JsonRespuesta, 'La Imagen se creo correctamente');
      Json.AddPair('archivo', datos.GetValue('imagen').Value);
      Json.AddPair('nombre', datos.GetValue('idimagenpregunta').Value);

      SubirArchivo(Json);
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'updateImagenPregunta', datos.toString, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('POST', 'ImagenPregunta: ' + Json.toString);
  Query.Free;
end;

{ Método GET - ImagenPregunta }
function TOlimpiadas.ImagenPregunta(const ID: string): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  i: integer;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    limpiarConsulta(Query);
    SelectWhere('imagenespreguntas', 'idimagenpregunta', Texto(ID), Query);

    limpiarParametros;
    agregarParametro('idimagenpregunta', 'String');
    agregarParametro('imagen', 'String');
    agregarParametro('idpregunta', 'String');

    Json := crearJSON(Query);

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'ImagenPregunta', ID, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('GET', 'ImagenPregunta: ' + Json.toString);
  Query.Free;
end;

{ Método GET-ALL - ImagenPregunta }
function TOlimpiadas.ImagenesPregunta(const IdPregunta: string): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  ArrayJson: TJSONArray;
  JsonLinea: TJSONObject;
  i: integer;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;
    ArrayJson := TJSONArray.create;
    Json.AddPair('ImagenesPreguntas', ArrayJson);

    limpiarConsulta(Query);
    SelectWhereOrder('imagenespreguntas', 'idpregunta', 'imagen',
      Texto(IdPregunta), Query);

    limpiarParametros;
    agregarParametro('idimagenpregunta', 'String');
    agregarParametro('imagen', 'String');
    agregarParametro('idpregunta', 'String');

    for i := 1 to Query.RecordCount do
    begin
      ArrayJson.AddElement(crearJSON(Query));
      Query.Next;
    end;

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'ImagenesPregunta', IdPregunta, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('GET', 'ImagenPregunta: ' + Json.toString);
  Query.Free;
end;

function TOlimpiadas.ImagenesPreguntas: TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  ArrayJson: TJSONArray;
  JsonLinea: TJSONObject;
  i: integer;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;
    ArrayJson := TJSONArray.create;
    Json.AddPair('ImagenesPreguntas', ArrayJson);

    limpiarConsulta(Query);
    SELECT('imagenespreguntas', 'imagen', Query);

    limpiarParametros;
    agregarParametro('idimagenpregunta', 'String');
    agregarParametro('imagen', 'String');
    agregarParametro('idpregunta', 'String');

    for i := 1 to Query.RecordCount do
    begin
      ArrayJson.AddElement(crearJSON(Query));
      Query.Next;
    end;

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'ImagenesPregunta', '-no aplica-', E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('GET', 'ImagenPregunta: ' + Json.toString);
  Query.Free;
end;

{ Método DELETE - ImagenPregunta }
function TOlimpiadas.cancelImagenPregunta(const token, ID: string): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin
      limpiarConsulta(Query);
      DELETE('imagenespreguntas', 'idimagenpregunta', Texto(ID), Query);

      Json.AddPair(JsonRespuesta, 'La Imagen se elimino correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'cancelImagenPregunta', ID, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('DELETE', 'ImagenPregunta: ' + Json.toString);
  Query.Free;
end;

{ Método UPDATE - ImagenPregunta }
function TOlimpiadas.acceptImagenPregunta(const token: string;
  const datos: TJSONObject): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  ID: string;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin
      limpiarConsulta(Query);

      limpiarParametros;

      agregarParametro('idimagenpregunta', 'String');
      agregarParametro('imagen', 'String');
      agregarParametro('idpregunta', 'String');

      ID := datos.GetValue('idimagenpregunta').Value;
      UPDATE('imagenespreguntas', 'idimagenpregunta', Texto(ID), Query);

      Query.Params.ParamByName(FParametros[0]).Value :=
        datos.GetValue(FParametros[0]).Value;
      Query.Params.ParamByName(FParametros[1]).AsWideMemo :=
        datos.GetValue(FParametros[1]).Value;
      Query.Params.ParamByName(FParametros[2]).Value :=
        datos.GetValue(FParametros[2]).Value;
      Query.ExecSQL;

      Json.AddPair(JsonRespuesta, 'La Imagen se actualizo correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'acceptImagenPregunta', datos.toString, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('UPDATE', 'ImagenPregunta: ' + Json.toString);
  Query.Free;
end;

{ Método INSERT - OpcionPregunta }
function TOlimpiadas.updateOpcionPregunta(const token: string;
  const datos: TJSONObject): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
begin
  try
    Query := TFDQuery.create(nil);
    Query.Connection := Conexion;
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin

      limpiarConsulta(Query);

      limpiarParametros;

      agregarParametro('idopcionpregunta', 'String');
      agregarParametro('opcion', 'Memo');
      agregarParametro('escorrecta', 'String');
      agregarParametro('esimagen', 'String');
      agregarParametro('idpregunta', 'String');

      INSERT('opcionespreguntas', Query);
      escribirMensaje('datos', datos.toString);
      asignarDatos(datos, Query);

      Json.AddPair(JsonRespuesta, 'La opción se creo correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'updateOpcionPregunta', datos.toString, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('POST', 'OpcionPregunta: ' + Json.toString);
  Query.Free;
end;

{ Método GET - OpcionPregunta }
function TOlimpiadas.OpcionPregunta(const ID: string): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  i: integer;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    limpiarConsulta(Query);
    SelectWhere('opcionespreguntas', 'idopcionpregunta', Texto(ID), Query);

    limpiarParametros;
    agregarParametro('idopcionpregunta', 'String');
    agregarParametro('opcion', 'Memo');
    agregarParametro('escorrecta', 'String');
    agregarParametro('esimagen', 'String');
    agregarParametro('idpregunta', 'String');

    Json := crearJSON(Query);

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'OpcionPregunta', ID, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('GET', 'OpcionPregunta: ' + Json.toString);
  Query.Free;
end;

{ Método GET-ALL - OpcionPregunta }
function TOlimpiadas.OpcionesPregunta(const IdPregunta: string): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  ArrayJson: TJSONArray;
  JsonLinea: TJSONObject;
  i: integer;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;
    ArrayJson := TJSONArray.create;
    Json.AddPair('OpcionesPreguntas', ArrayJson);

    limpiarConsulta(Query);
    SelectWhereOrder('opcionespreguntas', 'idpregunta', 'opcion',
      Texto(IdPregunta), Query);

    limpiarParametros;
    agregarParametro('idopcionpregunta', 'String');
    agregarParametro('opcion', 'Memo');
    agregarParametro('escorrecta', 'String');
    agregarParametro('esimagen', 'String');
    agregarParametro('idpregunta', 'String');

    for i := 1 to Query.RecordCount do
    begin
      ArrayJson.AddElement(crearJSON(Query));
      Query.Next;
    end;

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'OpcionesPregunta', IdPregunta, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('GET', 'OpcionPregunta: ' + Json.toString);
  Query.Free;
end;

function TOlimpiadas.OpcionesPreguntas: TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  ArrayJson: TJSONArray;
  JsonLinea: TJSONObject;
  i: integer;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;
    ArrayJson := TJSONArray.create;
    Json.AddPair('OpcionesPreguntas', ArrayJson);

    limpiarConsulta(Query);
    SELECT('opcionespreguntas', 'opcion', Query);

    limpiarParametros;
    agregarParametro('idopcionpregunta', 'String');
    agregarParametro('opcion', 'Memo');
    agregarParametro('escorrecta', 'String');
    agregarParametro('esimagen', 'String');
    agregarParametro('idpregunta', 'String');

    for i := 1 to Query.RecordCount do
    begin
      ArrayJson.AddElement(crearJSON(Query));
      Query.Next;
    end;

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'OpcionesPreguntas', '-no data-', E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('GET', 'OpcionPregunta: ' + Json.toString);
  Query.Free;
end;

{ Método DELETE - OpcionPregunta }
function TOlimpiadas.cancelOpcionPregunta(const token, ID: string): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin
      limpiarConsulta(Query);
      DELETE('opcionespreguntas', 'idopcionpregunta', Texto(ID), Query);

      Json.AddPair(JsonRespuesta, 'La opción se elimino correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'cancelOpcionPregunta', ID, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('DELETE', 'OpcionPregunta: ' + Json.toString);
  Query.Free;
end;

{ Método UPDATE - OpcionPregunta }
function TOlimpiadas.acceptOpcionPregunta(const token: string;
  const datos: TJSONObject): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  ID: string;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin
      limpiarConsulta(Query);

      limpiarParametros;

      agregarParametro('idopcionpregunta', 'String');
      agregarParametro('opcion', 'Memo');
      agregarParametro('escorrecta', 'String');
      agregarParametro('esimagen', 'String');
      agregarParametro('idpregunta', 'String');

      ID := datos.GetValue('idopcionpregunta').Value;
      UPDATE('opcionespreguntas', 'idopcionpregunta', Texto(ID), Query);

      asignarDatos(datos, Query);

      Json.AddPair(JsonRespuesta, 'La opción se actualizo correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'acceptOpcionPregunta', datos.toString, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('UPDATE', 'OpcionPregunta: ' + Json.toString);
  Query.Free;
end;

{ Método INSERT - Pregunta }
function TOlimpiadas.updatePregunta(const token: string;
  const datos: TJSONObject): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
begin
  try
    Query := TFDQuery.create(nil);
    Query.Connection := Conexion;
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin

      limpiarConsulta(Query);

      limpiarParametros;

      agregarParametro('idpregunta', 'String');
      agregarParametro('pregunta', 'String');
      agregarParametro('idnivel', 'String');
      agregarParametro('idgrado', 'String');
      agregarParametro('idprueba', 'String');

      INSERT('preguntas', Query);

      asignarDatos(datos, Query);

      Json.AddPair(JsonRespuesta, 'La pregunta se creo correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'updatePregunta', datos.toString, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('POST', 'Pregunta: ' + Json.toString);
  Query.Free;
end;

{ Método GET - Pregunta }
function TOlimpiadas.Pregunta(const ID: string): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  i: integer;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    limpiarConsulta(Query);
    SelectWhere('preguntas', 'idpregunta', Texto(ID), Query);

    limpiarParametros;
    agregarParametro('idpregunta', 'String');
    agregarParametro('pregunta', 'String');
    agregarParametro('idnivel', 'String');
    agregarParametro('idgrado', 'String');
    agregarParametro('idprueba', 'String');

    Json := crearJSON(Query);

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now), 'Pregunta',
        ID, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('GET', 'Pregunta: ' + Json.toString);
  Query.Free;
end;

{ Método GET-ALL - Pregunta }
function TOlimpiadas.Preguntas: TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  ArrayJson: TJSONArray;
  JsonLinea: TJSONObject;
  i: integer;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;
    ArrayJson := TJSONArray.create;
    Json.AddPair('Preguntas', ArrayJson);

    limpiarConsulta(Query);
    Query.Close;
    Query.SQL.Clear;
    Query.SQL.Add('SELECT ');
    Query.SQL.Add('pregunta, ');
    Query.SQL.Add('idpregunta, ');
    Query.SQL.Add('n.idnivel as idnivel, ');
    Query.SQL.Add('g.idgrado as idgrado, ');
    Query.SQL.Add('pr.idprueba as idprueba,');
    Query.SQL.Add('g.nombre as grado,');
    Query.SQL.Add('n.nombre as nivel,');
    Query.SQL.Add('pr.nombre as prueba ');
    Query.SQL.Add('FROM preguntas as p ');
    Query.SQL.Add('INNER JOIN grados as g ON p.idgrado=g.idgrado ');
    Query.SQL.Add('INNER JOIN niveles as n ON p.idnivel=n.idnivel ');
    Query.SQL.Add('INNER JOIN pruebas as pr ON p.idprueba=pr.idprueba');

    Query.Open;

    limpiarParametros;
    agregarParametro('idpregunta', 'String');
    agregarParametro('pregunta', 'String');
    agregarParametro('idnivel', 'String');
    agregarParametro('idgrado', 'String');
    agregarParametro('grado', 'String');
    agregarParametro('nivel', 'String');
    agregarParametro('idprueba', 'String');
    agregarParametro('prueba', 'String');

    for i := 1 to Query.RecordCount do
    begin
      ArrayJson.AddElement(crearJSON(Query));
      Query.Next;
    end;

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'Preguntas', '- no data -', E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('GET', 'Pregunta: ' + Json.toString);
  Query.Free;
end;

function TOlimpiadas.PreguntasPrueba(const IdPrueba: string;
  const IdUsuario: string): TJSONObject;
var
  Json, JsonPregunta, JsonOpciones, JsonImagenes, JsonOpcCorrecta: TJSONObject;
  Query, QueryOpciones, QueryImagenes, QueryRespuesta: TFDQuery;
  ArrayPreguntas, ArrayOpciones, ArrayImagenes: TJSONArray;
  JsonLinea: TJSONObject;
  i, ID: integer;
  IdPregunta: string;
  j: integer;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  QueryOpciones := TFDQuery.create(nil);
  QueryOpciones.Connection := Conexion;
  QueryRespuesta := TFDQuery.create(nil);
  QueryRespuesta.Connection := Conexion;
  QueryImagenes := TFDQuery.create(nil);
  QueryImagenes.Connection := Conexion;

  try
    Json := TJSONObject.create;
    ArrayPreguntas := TJSONArray.create;
    Json.AddPair('Preguntas', ArrayPreguntas);

    limpiarParametros;
    agregarParametro('idpregunta', 'String');
    agregarParametro('pregunta', 'String');
    agregarParametro('idnivel', 'String');
    agregarParametro('idgrado', 'String');
    agregarParametro('idprueba', 'String');

    limpiarConsulta(Query);
    Query.Close;
    Query.SQL.Text := 'SELECT * FROM preguntas WHERE idprueba=' + #39 + IdPrueba
      + #39 + ' ORDER BY ' + FParametros[Random(5)];
    Query.Open;

    for i := 1 to Query.RecordCount do
    begin
      JsonPregunta := TJSONObject.create;
      JsonPregunta := crearJSON(Query);
      ArrayOpciones := TJSONArray.create;
      JsonPregunta.AddPair('opciones', ArrayOpciones);

      IdPregunta := Query.FieldByName('idpregunta').AsString;
      QueryOpciones.Close;
      QueryOpciones.SQL.Text :=
        'SELECT * FROM opcionespreguntas WHERE idpregunta=' + Texto(IdPregunta);
      QueryOpciones.Open;

      JsonOpcCorrecta := TJSONObject.create;

      for j := 1 to QueryOpciones.RecordCount do
      begin
        JsonOpciones := TJSONObject.create;
        JsonOpciones.AddPair('idopcionpregunta',
          QueryOpciones.FieldByName('idopcionpregunta').AsString);
        JsonOpciones.AddPair('opcion', QueryOpciones.FieldByName('opcion')
          .AsString);
        JsonOpciones.AddPair('escorrecta',
          QueryOpciones.FieldByName('escorrecta').AsString);
        JsonOpciones.AddPair('esimagen', QueryOpciones.FieldByName('esimagen')
          .AsString);
        JsonOpciones.AddPair('idpregunta',
          QueryOpciones.FieldByName('idpregunta').AsString);

        { Si la opción es correcta se debe crear un nuevo Json }
        if QueryOpciones.FieldByName('escorrecta').AsString = 'Si' then
        begin
          JsonOpcCorrecta.AddPair('idopcionpregunta',
            QueryOpciones.FieldByName('idopcionpregunta').AsString);
          JsonOpcCorrecta.AddPair('opcion', QueryOpciones.FieldByName('opcion')
            .AsString);
          JsonOpcCorrecta.AddPair('escorrecta',
            QueryOpciones.FieldByName('escorrecta').AsString);
          JsonOpcCorrecta.AddPair('esimagen',
            QueryOpciones.FieldByName('esimagen').AsString);
          JsonOpcCorrecta.AddPair('idpregunta',
            QueryOpciones.FieldByName('idpregunta').AsString);

          JsonPregunta.AddPair('opcionCorrecta', JsonOpcCorrecta);
        end;

        ArrayOpciones.Add(JsonOpciones);
        QueryOpciones.Next;
      end;

      { Determinar si ya esta contestada }
      QueryRespuesta.SQL.Text := 'SELECT * FROM respuestaspreguntas WHERE ' +
        ' idpregunta=' + #39 + IdPregunta + #39 + ' and idprueba=' + #39 +
        IdPrueba + #39 + ' and idusuario=' + #39 + IdUsuario + #39;
      QueryRespuesta.Open;

      if QueryRespuesta.RecordCount >= 1 then
      begin
        JsonPregunta.AddPair('respondida', 'Si');
        JsonPregunta.AddPair('opcionSeleccionada',
          QueryRespuesta.FieldByName('idopcion').AsString);
      end
      else
      begin
        JsonPregunta.AddPair('respondida', 'No');
        JsonPregunta.AddPair('opcionSeleccionada', '');
      end;

      { Obtener las imágenes de la pregunta }
      QueryImagenes.Close;
      QueryImagenes.SQL.Text :=
        'SELECT * FROM imagenespreguntas WHERE idpregunta=' + Texto(IdPregunta);
      QueryImagenes.Open;

      ArrayImagenes := TJSONArray.create;
      JsonPregunta.AddPair('imagenes', ArrayImagenes);

      for j := 1 to QueryImagenes.RecordCount do
      begin
        JsonImagenes := TJSONObject.create;
        JsonImagenes.AddPair('idimagenpregunta',
          QueryImagenes.FieldByName('idimagenpregunta').AsString);
        JsonImagenes.AddPair('imagen', QueryImagenes.FieldByName('imagen')
          .AsString);
        JsonImagenes.AddPair('idpregunta',
          QueryImagenes.FieldByName('idpregunta').AsString);

        ArrayImagenes.Add(JsonImagenes);
        QueryImagenes.Next;
      end;

      ArrayPreguntas.AddElement(JsonPregunta);
      Query.Next;
    end;

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'PreguntasPrueba', IdPrueba, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('GET', 'Pregunta: ' + Json.toString);
  Query.Free;
end;

{ Método DELETE - Pregunta }
function TOlimpiadas.cancelPregunta(const token, ID: string): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin
      limpiarConsulta(Query);
      DELETE('preguntas', 'idpregunta', Texto(ID), Query);

      Json.AddPair(JsonRespuesta, 'La pregunta se elimino correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'cancelPregunta', ID, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('DELETE', 'Pregunta: ' + Json.toString);
  Query.Free;
end;

{ Método UPDATE - Pregunta }
function TOlimpiadas.acceptPregunta(const token: string;
  const datos: TJSONObject): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  ID: string;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin
      limpiarConsulta(Query);

      limpiarParametros;

      agregarParametro('idpregunta', 'String');
      agregarParametro('pregunta', 'String');
      agregarParametro('idnivel', 'String');
      agregarParametro('idgrado', 'String');
      agregarParametro('idprueba', 'String');

      ID := datos.GetValue('idpregunta').Value;
      UPDATE('preguntas', 'idpregunta', Texto(ID), Query);

      asignarDatos(datos, Query);

      Json.AddPair(JsonRespuesta, 'La pregunta se actualizo correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'acceptPregunta', datos.toString, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('UPDATE', 'Pregunta: ' + Json.toString);
  Query.Free;
end;

{ Método INSERT - Noticia }
function TOlimpiadas.updateNoticia(const token: string;
  const datos: TJSONObject): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
begin
  try
    Query := TFDQuery.create(nil);
    Query.Connection := Conexion;
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin

      limpiarConsulta(Query);

      limpiarParametros;

      agregarParametro('idnoticia', 'String');
      agregarParametro('titulo', 'String');
      agregarParametro('noticia', 'String');
      agregarParametro('fechainicio', 'String');
      agregarParametro('fechafin', 'String');
      agregarParametro('imagen', 'String');

      INSERT('noticias', Query);

      asignarDatos(datos, Query);

      Json.AddPair(JsonRespuesta, 'La noticia se creo correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'updateNoticia', datos.toString, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('POST', 'Noticia: ' + Json.toString);
  Query.Free;
end;

{ Método GET - Noticia }
function TOlimpiadas.Noticia(const ID: string): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  i: integer;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    limpiarConsulta(Query);
    SelectWhere('noticias', 'idnoticia', Texto(ID), Query);

    limpiarParametros;
    agregarParametro('idnoticia', 'String');
    agregarParametro('titulo', 'String');
    agregarParametro('noticia', 'String');
    agregarParametro('fechainicio', 'String');
    agregarParametro('fechafin', 'String');
    agregarParametro('imagen', 'String');

    Json := crearJSON(Query);

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now), 'Noticia',
        ID, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('GET', 'Noticia: ' + Json.toString);
  Query.Free;
end;

{ Método GET-ALL - Noticia }
function TOlimpiadas.Noticias: TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  ArrayJson: TJSONArray;
  JsonLinea: TJSONObject;
  i: integer;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;
    ArrayJson := TJSONArray.create;
    Json.AddPair('Noticias', ArrayJson);

    limpiarConsulta(Query);
    SELECT('noticias', 'titulo', Query);

    limpiarParametros;
    agregarParametro('idnoticia', 'String');
    agregarParametro('titulo', 'String');
    agregarParametro('noticia', 'String');
    agregarParametro('fechainicio', 'String');
    agregarParametro('fechafin', 'String');
    agregarParametro('imagen', 'String');

    for i := 1 to Query.RecordCount do
    begin
      ArrayJson.AddElement(crearJSON(Query));
      Query.Next;
    end;

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now), 'Noticias',
        '- no data -', E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('GET', 'Noticia: ' + Json.toString);
  Query.Free;
end;

{ Método DELETE - Noticia }
function TOlimpiadas.cancelNoticia(const token, ID: string): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin
      limpiarConsulta(Query);
      DELETE('noticias', 'idnoticia', Texto(ID), Query);

      Json.AddPair(JsonRespuesta, 'La noticia se elimino correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'cancelNoticia', ID, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('DELETE', 'Noticia: ' + Json.toString);
  Query.Free;
end;

{ Método UPDATE - Noticia }
function TOlimpiadas.acceptNoticia(const token: string;
  const datos: TJSONObject): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  ID: string;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin
      limpiarConsulta(Query);

      limpiarParametros;

      agregarParametro('idnoticia', 'String');
      agregarParametro('titulo', 'String');
      agregarParametro('noticia', 'String');
      agregarParametro('fechainicio', 'String');
      agregarParametro('fechafin', 'String');
      agregarParametro('imagen', 'String');

      ID := datos.GetValue('idnoticia').Value;
      UPDATE('noticias', 'idnoticia', Texto(ID), Query);

      asignarDatos(datos, Query);

      Json.AddPair(JsonRespuesta, 'La noticia se actualizo correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'acceptNoticia', datos.toString, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('UPDATE', 'Noticia: ' + Json.toString);
  Query.Free;
end;

{ Método INSERT - Ruta }
function TOlimpiadas.updateRuta(const token: string; const datos: TJSONObject)
  : TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
begin
  try
    Query := TFDQuery.create(nil);
    Query.Connection := Conexion;
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin

      limpiarConsulta(Query);

      limpiarParametros;

      agregarParametro('idruta', 'String');
      agregarParametro('ruta', 'String');

      INSERT('rutas', Query);

      asignarDatos(datos, Query);

      Json.AddPair(JsonRespuesta, 'La Ruta se creo correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'updateRuta', datos.toString, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('POST', 'Ruta: ' + Json.toString);
  Query.Free;
end;

{ Método GET - Ruta }
function TOlimpiadas.Ruta(const ID: string): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  i: integer;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    limpiarConsulta(Query);
    SelectWhere('rutas', 'idruta', Texto(ID), Query);

    limpiarParametros;
    agregarParametro('idruta', 'String');
    agregarParametro('ruta', 'String');

    Json := crearJSON(Query);

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now), 'ruta', ID,
        E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('GET', 'Ruta: ' + Json.toString);
  Query.Free;
end;

{ Método GET-ALL - Ruta }
function TOlimpiadas.Rutas: TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  ArrayJson: TJSONArray;
  JsonLinea: TJSONObject;
  i: integer;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;
    ArrayJson := TJSONArray.create;
    Json.AddPair('Rutas', ArrayJson);

    limpiarConsulta(Query);
    SELECT('rutas', 'ruta', Query);

    limpiarParametros;
    agregarParametro('idruta', 'String');
    agregarParametro('ruta', 'String');

    for i := 1 to Query.RecordCount do
    begin
      ArrayJson.AddElement(crearJSON(Query));
      Query.Next;
    end;

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now), 'Rutas',
        '- no data -', E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('GET', 'Ruta: ' + Json.toString);
  Query.Free;
end;

{ Método DELETE - Ruta }
function TOlimpiadas.cancelRuta(const token, ID: string): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin
      limpiarConsulta(Query);
      DELETE('rutas', 'idruta', Texto(ID), Query);

      Json.AddPair(JsonRespuesta, 'La Ruta se elimino correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'cancelRuta', ID, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('DELETE', 'Ruta: ' + Json.toString);
  Query.Free;
end;

{ Método UPDATE - Ruta }
function TOlimpiadas.acceptRuta(const token: string; const datos: TJSONObject)
  : TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  ID: string;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin
      limpiarConsulta(Query);

      limpiarParametros;

      agregarParametro('idruta', 'String');
      agregarParametro('ruta', 'String');

      ID := datos.GetValue('idruta').Value;
      UPDATE('rutas', 'idruta', Texto(ID), Query);

      asignarDatos(datos, Query);

      Json.AddPair(JsonRespuesta, 'La Ruta se actualizo correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'acceptRuta', datos.toString, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('UPDATE', 'Ruta: ' + Json.toString);
  Query.Free;
end;

{ Método INSERT - Institucion }
function TOlimpiadas.updateInstitucion(const token: string;
  const datos: TJSONObject): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
begin
  try
    Query := TFDQuery.create(nil);
    Query.Connection := Conexion;
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin

      limpiarConsulta(Query);

      limpiarParametros;

      agregarParametro('idinstitucion', 'String');
      agregarParametro('nombre', 'String');
      agregarParametro('direccion', 'String');
      agregarParametro('telefono', 'String');
      agregarParametro('rector', 'String');

      INSERT('instituciones', Query);

      asignarDatos(datos, Query);

      Json.AddPair(JsonRespuesta, 'La Institución se creo correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'updateInstitucion', datos.toString, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('POST', 'Institucion: ' + Json.toString);
  Query.Free;
end;

{ Método GET - Institucion }
function TOlimpiadas.Institucion(const ID: string): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  i: integer;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    limpiarConsulta(Query);
    SelectWhere('instituciones', 'idinstitucion', Texto(ID), Query);

    limpiarParametros;
    agregarParametro('idinstitucion', 'String');
    agregarParametro('nombre', 'String');
    agregarParametro('direccion', 'String');
    agregarParametro('telefono', 'String');
    agregarParametro('rector', 'String');

    Json := crearJSON(Query);

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'Institucion', ID, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('GET', 'Institucion: ' + Json.toString);
  Query.Free;
end;

{ Método GET-ALL - Institucion }
function TOlimpiadas.Instituciones: TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  ArrayJson: TJSONArray;
  JsonLinea: TJSONObject;
  i: integer;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;
    ArrayJson := TJSONArray.create;
    Json.AddPair('Instituciones', ArrayJson);

    limpiarConsulta(Query);
    SELECT('instituciones', 'nombre', Query);

    limpiarParametros;
    agregarParametro('idinstitucion', 'String');
    agregarParametro('nombre', 'String');
    agregarParametro('direccion', 'String');
    agregarParametro('telefono', 'String');
    agregarParametro('rector', 'String');

    for i := 1 to Query.RecordCount do
    begin
      ArrayJson.AddElement(crearJSON(Query));
      Query.Next;
    end;

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'Instituciones', '- no data -', E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('GET', 'Institucion: ' + Json.toString);
  Query.Free;
end;

{ Método DELETE - Institucion }
function TOlimpiadas.cancelInstitucion(const token, ID: string): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin
      limpiarConsulta(Query);
      DELETE('instituciones', 'idinstitucion', Texto(ID), Query);

      Json.AddPair(JsonRespuesta, 'La Institución  se elmino correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'cancelInstitucion', ID, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('DELETE', 'Institucion: ' + Json.toString);
  Query.Free;
end;

{ Método UPDATE - Institucion }
function TOlimpiadas.acceptInstitucion(const token: string;
  const datos: TJSONObject): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  ID: string;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin
      limpiarConsulta(Query);

      limpiarParametros;

      agregarParametro('idinstitucion', 'String');
      agregarParametro('nombre', 'String');
      agregarParametro('direccion', 'String');
      agregarParametro('telefono', 'String');
      agregarParametro('rector', 'String');

      ID := datos.GetValue('idinstitucion').Value;
      UPDATE('instituciones', 'idinstitucion', Texto(ID), Query);

      asignarDatos(datos, Query);

      Json.AddPair(JsonRespuesta, 'La Institución se actualizo correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'acceptInstitucion', datos.toString, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('UPDATE', 'Institucion: ' + Json.toString);
  Query.Free;
end;

{ Método INSERT - Nivel }
function TOlimpiadas.updateNivel(const token: string; const datos: TJSONObject)
  : TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
begin
  try
    Query := TFDQuery.create(nil);
    Query.Connection := Conexion;
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin

      limpiarConsulta(Query);

      limpiarParametros;

      agregarParametro('idnivel', 'String');
      agregarParametro('nombre', 'String');

      INSERT('niveles', Query);

      asignarDatos(datos, Query);

      Json.AddPair(JsonRespuesta, 'El nivel se creo correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'updateNivel', datos.toString, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('POST', 'Nivel: ' + Json.toString);
  Query.Free;
end;

{ Método GET - Nivel }
function TOlimpiadas.Nivel(const ID: string): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  i: integer;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    limpiarConsulta(Query);
    SelectWhere('niveles', 'idnivel', Texto(ID), Query);

    limpiarParametros;
    agregarParametro('idnivel', 'String');
    agregarParametro('nombre', 'String');

    Json := crearJSON(Query);

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now), 'Nivel',
        ID, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('GET', 'Nivel: ' + Json.toString);
  Query.Free;
end;

{ Método GET-ALL - Nivel }
function TOlimpiadas.Niveles: TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  ArrayJson: TJSONArray;
  JsonLinea: TJSONObject;
  i: integer;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;
    ArrayJson := TJSONArray.create;
    Json.AddPair('Niveles', ArrayJson);

    limpiarConsulta(Query);
    SELECT('niveles', 'nombre', Query);

    limpiarParametros;
    agregarParametro('idnivel', 'String');
    agregarParametro('nombre', 'String');

    for i := 1 to Query.RecordCount do
    begin
      ArrayJson.AddElement(crearJSON(Query));
      Query.Next;
    end;

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now), 'Niveles',
        '- no data -', E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('GET', 'Nivel: ' + Json.toString);
  Query.Free;
end;

{ Método DELETE - Nivel }
function TOlimpiadas.cancelNivel(const token, ID: string): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin
      limpiarConsulta(Query);
      DELETE('niveles', 'idnivel', Texto(ID), Query);

      Json.AddPair(JsonRespuesta, 'El nivel se elimino correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'cancelNivel', ID, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('DELETE', 'Nivel: ' + Json.toString);
  Query.Free;
end;

{ Método UPDATE - Nivel }
function TOlimpiadas.acceptNivel(const token: string; const datos: TJSONObject)
  : TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  ID: string;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin
      limpiarConsulta(Query);

      limpiarParametros;

      agregarParametro('idnivel', 'String');
      agregarParametro('nombre', 'String');

      ID := datos.GetValue('idnivel').Value;
      UPDATE('niveles', 'idnivel', Texto(ID), Query);

      asignarDatos(datos, Query);

      Json.AddPair(JsonRespuesta, 'El nivel se actualizo correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'acceptNivel', datos.toString, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('UPDATE', 'Nivel: ' + Json.toString);
  Query.Free;
end;

{ Método INSERT - Grado }
function TOlimpiadas.updateGrado(const token: string; const datos: TJSONObject)
  : TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
begin
  try
    Query := TFDQuery.create(nil);
    Query.Connection := Conexion;
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin

      limpiarConsulta(Query);

      limpiarParametros;

      agregarParametro('idgrado', 'String');
      agregarParametro('nombre', 'String');

      INSERT('grados', Query);

      asignarDatos(datos, Query);

      Json.AddPair(JsonRespuesta, 'el grado se creo correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'updateGrado', datos.toString, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('POST', 'Grado: ' + Json.toString);
  Query.Free;
end;

{ Método GET - Grado }
function TOlimpiadas.Grado(const ID: string): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  i: integer;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    limpiarConsulta(Query);
    SelectWhere('grados', 'idgrado', Texto(ID), Query);

    limpiarParametros;
    agregarParametro('idgrado', 'String');
    agregarParametro('nombre', 'String');

    Json := crearJSON(Query);

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now), 'Grado',
        ID, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('GET', 'Grado: ' + Json.toString);
  Query.Free;
end;

{ Método GET-ALL - Grado }
function TOlimpiadas.Grados: TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  ArrayJson: TJSONArray;
  JsonLinea: TJSONObject;
  i: integer;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;
    ArrayJson := TJSONArray.create;
    Json.AddPair('Grados', ArrayJson);

    limpiarConsulta(Query);
    SELECT('grados', 'nombre', Query);

    limpiarParametros;
    agregarParametro('idgrado', 'String');
    agregarParametro('nombre', 'String');

    for i := 1 to Query.RecordCount do
    begin
      ArrayJson.AddElement(crearJSON(Query));
      Query.Next;
    end;

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now), 'Grados',
        '- no data -', E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('GET', 'Grado: ' + Json.toString);
  Query.Free;
end;

{ Método DELETE - Grado }
function TOlimpiadas.cancelGrado(const token, ID: string): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin
      limpiarConsulta(Query);
      DELETE('grados', 'idgrado', Texto(ID), Query);

      Json.AddPair(JsonRespuesta, 'el grado se elmino correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'cancelGrado', ID, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('DELETE', 'Grado: ' + Json.toString);
  Query.Free;
end;

{ Método UPDATE - Grado }
function TOlimpiadas.acceptGrado(const token: string; const datos: TJSONObject)
  : TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  ID: string;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin
      limpiarConsulta(Query);

      limpiarParametros;

      agregarParametro('idgrado', 'String');
      agregarParametro('nombre', 'String');

      ID := datos.GetValue('idgrado').Value;
      UPDATE('grados', 'idgrado', Texto(ID), Query);

      asignarDatos(datos, Query);

      Json.AddPair(JsonRespuesta, 'el grado se actualizo correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'acceptGrado', datos.toString, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('UPDATE', 'Grado: ' + Json.toString);
  Query.Free;
end;

{ Método INSERT - Usuario }
function TOlimpiadas.updateUsuario(const token: string;
  const datos: TJSONObject): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
begin
  try
    Query := TFDQuery.create(nil);
    Query.Connection := Conexion;
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin

      limpiarConsulta(Query);

      limpiarParametros;

      agregarParametro('idusuario', 'String');
      agregarParametro('nombre', 'String');
      agregarParametro('correo', 'String');
      agregarParametro('contra', 'String');
      agregarParametro('telefono', 'String');
      agregarParametro('idinstitucion', 'String');
      agregarParametro('idrol', 'String');
      agregarParametro('idgrado', 'String');

      INSERT('usuarios', Query);

      asignarDatos(datos, Query);

      Json.AddPair(JsonRespuesta, 'el usuario se creo correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'updateUsuario', datos.toString, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('POST', 'Usuario: ' + Json.toString);
  Query.Free;
end;

{ Método GET - Usuario }
function TOlimpiadas.Usuario(const ID: string): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  i: integer;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    limpiarConsulta(Query);
    SelectWhere('usuarios', 'idusuario', Texto(ID), Query);

    limpiarParametros;
    agregarParametro('idusuario', 'String');
    agregarParametro('nombre', 'String');
    agregarParametro('correo', 'String');
    agregarParametro('contra', 'String');
    agregarParametro('telefono', 'String');
    agregarParametro('idinstitucion', 'String');
    agregarParametro('idrol', 'String');
    agregarParametro('idgrado', 'String');

    Json := crearJSON(Query);

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now), 'Usuario',
        ID, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('GET', 'Usuario: ' + Json.toString);
  Query.Free;
end;

{ Método GET-ALL - Usuario }
function TOlimpiadas.Usuarios: TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  ArrayJson: TJSONArray;
  JsonLinea: TJSONObject;
  i: integer;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;
    ArrayJson := TJSONArray.create;
    Json.AddPair('Usuarios', ArrayJson);

    limpiarConsulta(Query);
    SELECT('usuarios', 'nombre', Query);

    limpiarParametros;
    agregarParametro('idusuario', 'String');
    agregarParametro('nombre', 'String');
    agregarParametro('correo', 'String');
    agregarParametro('contra', 'String');
    agregarParametro('telefono', 'String');
    agregarParametro('idinstitucion', 'String');
    agregarParametro('idrol', 'String');
    agregarParametro('idgrado', 'String');

    for i := 1 to Query.RecordCount do
    begin
      ArrayJson.AddElement(crearJSON(Query));
      Query.Next;
    end;

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now), 'Usuarios',
        '- no data -', E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('GET', 'Usuario: ' + Json.toString);
  Query.Free;
end;

function TOlimpiadas.UsuariosPorInstitucion(const IdInstitucion: string)
  : TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  ArrayJson: TJSONArray;
  JsonLinea: TJSONObject;
  i: integer;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;
    ArrayJson := TJSONArray.create;
    Json.AddPair('Usuarios', ArrayJson);

    limpiarConsulta(Query);
    SelectWhereOrder('usuarios', 'idinstitucion', 'nombre',
      Texto(IdInstitucion), Query);

    limpiarParametros;
    agregarParametro('idusuario', 'String');
    agregarParametro('nombre', 'String');
    agregarParametro('correo', 'String');
    agregarParametro('contra', 'String');
    agregarParametro('telefono', 'String');
    agregarParametro('idinstitucion', 'String');
    agregarParametro('idrol', 'String');
    agregarParametro('idgrado', 'String');

    for i := 1 to Query.RecordCount do
    begin
      ArrayJson.AddElement(crearJSON(Query));
      Query.Next;
    end;

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now), 'Usuarios',
        '- no data -', E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('GET', Json.toString);
  Query.Free;
end;

function TOlimpiadas.UsuariosPorRol(const IdRol: string): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  ArrayJson: TJSONArray;
  JsonLinea: TJSONObject;
  i: integer;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;
    ArrayJson := TJSONArray.create;
    Json.AddPair('Usuarios', ArrayJson);

    limpiarConsulta(Query);
    SelectWhereOrder('usuarios', 'idrol', 'nombre', Texto(IdRol), Query);

    limpiarParametros;
    agregarParametro('idusuario', 'String');
    agregarParametro('nombre', 'String');
    agregarParametro('correo', 'String');
    agregarParametro('contra', 'String');
    agregarParametro('telefono', 'String');
    agregarParametro('idinstitucion', 'String');
    agregarParametro('idrol', 'String');
    agregarParametro('idgrado', 'String');

    for i := 1 to Query.RecordCount do
    begin
      ArrayJson.AddElement(crearJSON(Query));
      Query.Next;
    end;

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now), 'Usuarios',
        '- no data -', E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('UsuariosPorRol', Json.toString);
  Query.Free;
end;

{ Método DELETE - Usuario }
function TOlimpiadas.cancelUsuario(const token, ID: string): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin
      limpiarConsulta(Query);
      DELETE('usuarios', 'idusuario', Texto(ID), Query);

      Json.AddPair(JsonRespuesta, 'el usuario se elmino correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'cancelUsuario', ID, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('DELETE', 'Usuario: ' + Json.toString);
  Query.Free;
end;

function TOlimpiadas.CompararFechas(fecha1, fecha2: Tdate): integer;
begin
  Result := Trunc(fecha2 - fecha1);
end;

{ Método UPDATE - Usuario }
function TOlimpiadas.acceptUsuario(const token: string;
  const datos: TJSONObject): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  ID: string;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin
      limpiarConsulta(Query);

      limpiarParametros;

      agregarParametro('idusuario', 'String');
      agregarParametro('nombre', 'String');
      agregarParametro('correo', 'String');
      // agregarParametro('contra', 'String');
      agregarParametro('telefono', 'String');
      agregarParametro('idinstitucion', 'String');
      agregarParametro('idrol', 'String');
      agregarParametro('idgrado', 'String');

      ID := datos.GetValue('idusuario').Value;
      UPDATE('usuarios', 'idusuario', Texto(ID), Query);

      asignarDatos(datos, Query);

      Json.AddPair(JsonRespuesta, 'el usuario se actualizo correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'acceptUsuario', datos.toString, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('UPDATE', 'Usuario: ' + Json.toString);
  Query.Free;
end;

{ Método INSERT - Rol }
function TOlimpiadas.updateRecuperarContra(const token: string;
  const datos: TJSONObject): TJSONObject;
var
  Json: TJSONObject;
  Texto: TIdText;
  Html: TStringList;
  Correo: string;
begin
  Json := TJSONObject.create;
  try
    Html := TStringList.create;
    Html.Add('<!doctype html>');
    Html.Add('<html lang="es">');
    Html.Add('  <head>');
    Html.Add('    <meta charset="utf-8">');
    Html.Add('');
    Html.Add('    <title>Recuperación de Contraseña de Olimpiadas Matemáticas</title>');
    Html.Add('  </head>');
    Html.Add('  <body>');

    Html.Add('<div style="border: 1px; border-radius: 10px; margin: 100px; -webkit-box-shadow: 10px 10px 15px 1px rgba(0,0,0,0.58); -moz-box-shadow: 10px 10px 15px 1px rgba(0,0,0,0.58); box-shadow: 10px 10px 15px 1px rgba(0,0,0,0.58);">');
    Html.Add('');
    Html.Add('    <div style="background-color: red; color: white;">');
    Html.Add('        <h1 style="margin: 10px; padding: 10px;">Olimpiadas Matemáticas</h1>');
    Html.Add('    </div>');
    Html.Add('');
    Html.Add('    <div style="margin: 10px; padding: 10px; font-size: 24px;">');
    Html.Add('        <p>Cordial Saludo,</p>');
    Html.Add('        <p>Hemos recibido una solicitud de recuperación de contraseña. Para recuperar la contraseña, haga clic en el siguiente vínculo</p>');
    Html.Add('        <a href="' + datos.GetValue('Link').Value +
      '">Recuperar mi Contraseña</a>');
    Html.Add('        <div style="height: 30px;"></div>');
    Html.Add('        <p>Atentamente,</p>');
    Html.Add('        <p>El equipo de Olimpiadas Matemáticas</p>');
    Html.Add('    </div>');
    Html.Add('');
    Html.Add('</div>');

    Html.Add('  </body>');
    Html.Add('</html>');

    Correo := datos.GetValue('Correo').Value;

    Data.Subject := 'Recuperación de Contraseña Olimpiadas Matemáticas';
    Data.Recipients.EMailAddresses := Correo;
    Data.From.Text := 'Olimpiadas@Matematicas.com';
    Data.ContentType := 'text/html';
    Data.CharSet := 'UTF-8';
    Data.Body.Assign(Html);

    if Correo <> '' then
    begin
      try
        SMTP.Connect;
        SMTP.Authenticate;
        SMTP.Send(Data);
      finally
        SMTP.Disconnect(True);
        Json.AddPair(JsonRespuesta, 'Correcto');
      end;
    end
    else
    begin
      Json.AddPair('Error', 'El Usuario no tiene un correo asociado');
    end;

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'updateRecuperarContra', datos.toString, E.Message);
    end;

  end;

  Result := Json;
end;

function TOlimpiadas.updateRol(const token: string; const datos: TJSONObject)
  : TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
begin
  try
    Query := TFDQuery.create(nil);
    Query.Connection := Conexion;
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin

      limpiarConsulta(Query);

      limpiarParametros;

      agregarParametro('idrol', 'String');
      agregarParametro('nombre', 'String');

      INSERT('roles', Query);

      asignarDatos(datos, Query);

      Json.AddPair(JsonRespuesta, 'el rol se creo correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'updateRol', datos.toString, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('POST', 'Rol: ' + Json.toString);
  Query.Free;
end;

{ Método GET - Rol }
function TOlimpiadas.Rol(const ID: string): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  i: integer;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    limpiarConsulta(Query);
    SelectWhere('roles', 'idrol', Texto(ID), Query);

    limpiarParametros;
    agregarParametro('idrol', 'String');
    agregarParametro('nombre', 'String');

    Json := crearJSON(Query);

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now), 'Rol', ID,
        E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('GET', 'Rol: ' + Json.toString);
  Query.Free;
end;

{ Método GET-ALL - Rol }
function TOlimpiadas.Roles: TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  ArrayJson: TJSONArray;
  JsonLinea: TJSONObject;
  i: integer;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;
    ArrayJson := TJSONArray.create;
    Json.AddPair('Roles', ArrayJson);

    limpiarConsulta(Query);
    SELECT('roles', 'nombre', Query);

    limpiarParametros;
    agregarParametro('idrol', 'String');
    agregarParametro('nombre', 'String');

    for i := 1 to Query.RecordCount do
    begin
      ArrayJson.AddElement(crearJSON(Query));
      Query.Next;
    end;

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now), 'Roles',
        '- no data -', E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('GET', 'Rol: ' + Json.toString);
  Query.Free;
end;

{ Método DELETE - Rol }
function TOlimpiadas.cancelRol(const token, ID: string): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin
      limpiarConsulta(Query);
      DELETE('roles', 'idrol', Texto(ID), Query);

      Json.AddPair(JsonRespuesta, 'el rol se elmino correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'cancelRol', ID, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('DELETE', 'Rol: ' + Json.toString);
  Query.Free;
end;

{ Método UPDATE - Rol }
function TOlimpiadas.acceptRol(const token: string; const datos: TJSONObject)
  : TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  ID: string;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin
      limpiarConsulta(Query);

      limpiarParametros;

      agregarParametro('idrol', 'String');
      agregarParametro('nombre', 'String');

      ID := datos.GetValue('idrol').Value;
      UPDATE('roles', 'idrol', Texto(ID), Query);

      asignarDatos(datos, Query);

      Json.AddPair(JsonRespuesta, 'el rol se actualizo correctamente');
    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'acceptRol', datos.toString, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('UPDATE', 'Rol: ' + Json.toString);
  Query.Free;
end;

function TOlimpiadas.EchoString(Value: string): string;
begin
  Result := Value;
end;

procedure TOlimpiadas.escribirMensaje(msg, tipo: string);
begin
  FOlimpiadas.escribirMensaje(msg, tipo);
end;

function TOlimpiadas.estadisticaPregunta(const IdPregunta: string): TJSONObject;
begin

end;

function TOlimpiadas.estadisticaPreguntas: TJSONObject;
var
  Json, JsonDatos, JsonData: TJSONObject;
  ArrayPreguntas, ArrayData, ArrayPorcentajes, ArrayLabels: TJSONArray;
  Query, QueryResp: TFDQuery;
  i: integer;
  IdPregunta: string;
  j, cantCorrectas, totalResp: integer;
  porcCorrectas, porcIncorrectas: real;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  QueryResp := TFDQuery.create(nil);
  QueryResp.Connection := Conexion;

  Json := TJSONObject.create;

  ArrayPreguntas := TJSONArray.create;
  Json.AddPair('Preguntas', ArrayPreguntas);

  try
    Query.Close;
    Query.SQL.Text := 'SELECT * FROM preguntas';
    Query.Open;
    Query.First;

    for i := 1 to Query.RecordCount do
    begin
      IdPregunta := Query.FieldByName('idpregunta').AsString;
      JsonDatos := TJSONObject.create;

      QueryResp.Close;
      QueryResp.SQL.Text :=
        'SELECT * FROM respuestaspreguntas WHERE idpregunta=' + #39 +
        IdPregunta + #39;
      QueryResp.Open;
      QueryResp.First;

      JsonDatos.AddPair('idpregunta', Query.FieldByName('idpregunta').AsString);
      JsonDatos.AddPair('pregunta', Query.FieldByName('pregunta').AsString);

      cantCorrectas := 0;
      totalResp := QueryResp.RecordCount;

      for j := 1 to totalResp do
      begin
        if (QueryResp.FieldByName('escorrecta').AsString = 'Si') then
          cantCorrectas := cantCorrectas + 1;

        QueryResp.Next;
      end;

      if totalResp > 0 then
      begin
        porcCorrectas := 100 * (cantCorrectas / totalResp);
        porcIncorrectas := 100 * ((totalResp - cantCorrectas) / totalResp);
      end
      else
      begin
        porcCorrectas := 0;
        porcIncorrectas := 0;
      end;

      ArrayPorcentajes := TJSONArray.create;
      JsonDatos.AddPair('Datos', ArrayPorcentajes);

      JsonData := TJSONObject.create;
      ArrayData := TJSONArray.create;
      JsonData.AddPair('data', ArrayData);
      ArrayData.Add(porcCorrectas);
      ArrayData.Add(porcIncorrectas);
      ArrayPorcentajes.Add(JsonData);

      ArrayLabels := TJSONArray.create;
      JsonDatos.AddPair('Labels', ArrayLabels);
      ArrayLabels.Add('% Correctas');
      ArrayLabels.Add('% Incorrectas');

      JsonDatos.AddPair('totalRespuesta', IntToStr(totalResp));
      JsonDatos.AddPair('Correctas', IntToStr(cantCorrectas));
      JsonDatos.AddPair('Incorrectas', IntToStr(totalResp - cantCorrectas));
      JsonDatos.AddPair('PorcCorrectas', FloatToStr(porcCorrectas));
      JsonDatos.AddPair('PorcIncorrectas', FloatToStr(porcIncorrectas));

      ArrayPreguntas.Add(JsonDatos);

      Query.Next;
    end;
  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'Preguntas', '- no data -', E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('estadisticaPreguntas', Json.toString);
  Query.Free;
  QueryResp.Free;
end;

function TOlimpiadas.estadisticaPruebas: TJSONObject;
var
  Json, JsonPrueba, JsonData: TJSONObject;
  ArrayPruebas, ArrayData, ArrayNiveles: TJSONArray;
  QueryPruebas, QueryPuntaje: TFDQuery;
  IdPrueba, NombrePrueba: string;
  i, totalPuntajes: integer;
  puntajes: array [1 .. 5] of real;
  promedio, calificacion: real;
  minimo, maximo: real;
  j: integer;
begin
  Json := TJSONObject.create;
  ArrayPruebas := TJSONArray.create;

  QueryPruebas := TFDQuery.create(nil);
  QueryPruebas.Connection := Conexion;
  QueryPuntaje := TFDQuery.create(nil);
  QueryPuntaje.Connection := Conexion;

  try
    QueryPruebas.Close;
    QueryPruebas.SQL.Text := 'SELECT * FROM pruebas';
    QueryPruebas.Open;
    QueryPruebas.First;

    for i := 1 to QueryPruebas.RecordCount do
    begin
      IdPrueba := QueryPruebas.FieldByName('idprueba').AsString;
      NombrePrueba := QueryPruebas.FieldByName('nombre').AsString;

      QueryPuntaje.Close;
      QueryPuntaje.SQL.Text := 'SELECT * FROM puntajepruebas WHERE idprueba=' +
        #39 + IdPrueba + #39;
      QueryPuntaje.Open;
      QueryPuntaje.First;

      totalPuntajes := QueryPuntaje.RecordCount;
      minimo := 5;
      maximo := 0;
      promedio := 0;

      JsonPrueba := TJSONObject.create;

      for j := 1 to 5 do
        puntajes[j] := 0;

      { Realizar el cálculo }
      for j := 1 to totalPuntajes do
      begin

        calificacion := StrToFloat(QueryPuntaje.FieldByName('calificacion')
          .AsString);

        if calificacion < minimo then
          minimo := calificacion;

        if calificacion > maximo then
          maximo := calificacion;

        promedio := promedio + calificacion;

        puntajes[Round(calificacion) + 1] :=
          puntajes[Round(calificacion) + 1] + 1;

        QueryPuntaje.Next;
      end;

      if totalPuntajes > 0 then
        promedio := promedio / totalPuntajes
      else
        promedio := 0;

      JsonPrueba.AddPair('Nombre', NombrePrueba);
      JsonPrueba.AddPair('Minimo', FloatToStr(minimo));
      JsonPrueba.AddPair('Maximo', FloatToStr(maximo));
      JsonPrueba.AddPair('Promedio', FloatToStr(promedio));
      JsonPrueba.AddPair('TotalPuntajes', FloatToStr(totalPuntajes));

      { Agregar los niveles }
      ArrayNiveles := TJSONArray.create;
      for j := 1 to 5 do
      begin
        ArrayNiveles.Add(puntajes[j]);
      end;

      { Crear el arreglo de data }
      JsonData := TJSONObject.create;
      JsonData.AddPair('data', ArrayNiveles);
      ArrayData := TJSONArray.create;
      ArrayData.Add(JsonData);
      JsonPrueba.AddPair('Niveles', ArrayData);

      { Agregar toda la prueba al array de pruebas }
      ArrayPruebas.Add(JsonPrueba);

      QueryPruebas.Next;
    end;

    Json.AddPair('Pruebas', ArrayPruebas);

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'Preguntas', '- no data -', E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('ExportarPreguntasPorNivel', 'Pregunta: ' + Json.toString);
end;

function TOlimpiadas.ExportarPreguntasPorNivel: TJSONObject;
var
  Json, JsonNivel, JsonPregunta, JsonOpciones: TJSONObject;
  QueryPreguntas, QueryNivel, QueryOpciones: TFDQuery;
  ArrayNiveles, ArrayPreguntas, ArrayOpciones: TJSONArray;
  JsonLinea: TJSONObject;
  i, j, k: integer;
  idnivel: string;
begin
  QueryPreguntas := TFDQuery.create(nil);
  QueryPreguntas.Connection := Conexion;
  QueryNivel := TFDQuery.create(nil);
  QueryNivel.Connection := Conexion;
  QueryOpciones := TFDQuery.create(nil);
  QueryOpciones.Connection := Conexion;

  try
    Json := TJSONObject.create;
    ArrayNiveles := TJSONArray.create;
    Json.AddPair('Niveles', ArrayNiveles);

    QueryNivel.Close;
    QueryNivel.SQL.Text := 'SELECT * FROM niveles ORDER BY nombre';
    QueryNivel.Open;

    for i := 1 to QueryNivel.RecordCount do
    begin
      { Leemos las preguntas del nivel }

      JsonNivel := TJSONObject.create;
      ArrayPreguntas := TJSONArray.create;
      JsonNivel.AddPair('Preguntas', ArrayPreguntas);

      idnivel := QueryNivel.FieldByName('idnivel').AsString;
      limpiarConsulta(QueryPreguntas);
      SelectWhereOrder('preguntas', 'idnivel', 'pregunta', Texto(idnivel),
        QueryPreguntas);

      agregarParametro('idpregunta', 'String');
      agregarParametro('pregunta', 'String');
      agregarParametro('idnivel', 'String');
      agregarParametro('idgrado', 'String');
      agregarParametro('idprueba', 'String');

      for j := 1 to QueryPreguntas.RecordCount do
      begin
        JsonPregunta := TJSONObject.create;
        JsonPregunta := crearJSON(QueryPreguntas);

        { Leer las opciones }
        JsonOpciones := TJSONObject.create;
        ArrayOpciones := TJSONArray.create;
        JsonPregunta.AddPair('Opciones', ArrayOpciones);

        QueryOpciones.Close;
        QueryOpciones.SQL.Text :=
          'SELECT * FROM opcionespreguntas WHERE idpregunta=' + #39 +
          QueryPreguntas.FieldByName('idpregunta').AsString + #39;
        QueryOpciones.Open;

        for k := 1 to QueryOpciones.RecordCount do
        begin
          JsonOpciones := TJSONObject.create;
          JsonOpciones.AddPair('idopcionpregunta',
            QueryOpciones.FieldByName('idopcionpregunta').AsString);
          JsonOpciones.AddPair('opcion', QueryOpciones.FieldByName('opcion')
            .AsString);
          JsonOpciones.AddPair('esimagen', QueryOpciones.FieldByName('esimagen')
            .AsString);
          JsonOpciones.AddPair('escorrecta',
            QueryOpciones.FieldByName('escorrecta').AsString);
          JsonOpciones.AddPair('idpregunta',
            QueryOpciones.FieldByName('idpregunta').AsString);

          ArrayOpciones.Add(JsonOpciones);
          QueryOpciones.Next;
        end;

        ArrayPreguntas.AddElement(JsonPregunta);
        QueryPreguntas.Next;
      end;

      JsonNivel.AddPair('idnivel', QueryNivel.FieldByName('idnivel').AsString);
      JsonNivel.AddPair('nombre', QueryNivel.FieldByName('nombre').AsString);
      ArrayNiveles.Add(JsonNivel);

      QueryNivel.Next;
    end;

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'Preguntas', '- no data -', E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('ExportarPreguntasPorNivel', 'Pregunta: ' + Json.toString);
  QueryPreguntas.Free;
  QueryNivel.Free;
  QueryOpciones.Free;
end;

function TOlimpiadas.ReverseString(Value: string): string;
begin
  Result := System.StrUtils.ReverseString(Value);
end;

function TOlimpiadas.JsonRespuesta: string;
begin
  Result := 'Respuesta';
end;

function TOlimpiadas.JsonError: string;
begin
  Result := 'Error';
end;

procedure TOlimpiadas.limpiarConsulta(Query: TFDQuery);
begin
  try
    Query.Close;
    Query.SQL.Clear;
  except
    on E: Exception do
    begin
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'limpiarConsulta', '- no data -', E.Message);
    end;
  end;
end;

procedure TOlimpiadas.SELECT(nombreTabla, OrdenarPor: string; Query: TFDQuery);
begin
  try
    Query.SQL.Text := 'SELECT * FROM ' + nombreTabla + ' ORDER BY ' +
      OrdenarPor;
    Query.Open;
    Query.First;
  except
    on E: Exception do
    begin
      BackupModule.registrarError(TimeToStr(now), DateToString(now), 'SELECT',
        '- no data -', E.Message);
    end;
  end;
end;

procedure TOlimpiadas.SelectWhere(nombreTabla, Identificador, ID: string;
  Query: TFDQuery);
begin
  try
    Query.SQL.Text := 'SELECT * FROM ' + nombreTabla + ' WHERE ' + Identificador
      + '=' + ID;
    Query.Open;
  except
    on E: Exception do
    begin
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'selectWhere', '- no data -', E.Message);
    end;
  end;
end;

procedure TOlimpiadas.SelectWhereOrder(nombreTabla, Identificador, OrdenarPor,
  ID: string; Query: TFDQuery);
begin
  try
    Query.SQL.Text := 'SELECT * FROM ' + nombreTabla + ' WHERE ' + Identificador
      + '=' + ID + ' ORDER BY ' + OrdenarPor;
    Query.Open;
  except
    on E: Exception do
    begin
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'SelectWhereOrder', '- no data -', E.Message);
    end;
  end;
end;

function TOlimpiadas.StringToBoolJS(ss: string): boolean;
begin
  if ss = 'true' then
    Result := True
  else
    Result := False;
end;

function TOlimpiadas.SubirArchivo(const datos: TJSONObject): boolean;
var
  iInStream: TStringStream;
  iOutStream: TMemoryStream;
begin

  try
    iInStream := TStringStream.create(datos.GetValue('archivo').Value);
    iInStream.Position := 0;

    iOutStream := TMemoryStream.create;
    TNetEncoding.Base64.Decode(iInStream, iOutStream);
    iOutStream.Position := 0;
    iOutStream.SaveToFile(ExtractFilePath(ParamStr(0)) + '\' +
      datos.GetValue('nombre').Value);

    Result := True;
  except
    on E: Exception do
    begin
      Result := False;
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'SubirArchivo', datos.toString, E.Message);
    end;
  end;
end;

procedure TOlimpiadas.InnerJoin(Tabla1, Tabla2, Parametro, IdBusqueda,
  Valor: string; Query: TFDQuery);
begin
  try
    Query.Close;
    Query.SQL.Text := 'SELECT * FROM ' + Tabla1 + ' INNER JOIN ' + Tabla2 +
      ' ON ' + Tabla1 + '.' + Parametro + ' = ' + Tabla2 + '.' + Parametro +
      ' WHERE ' + Tabla2 + '.' + IdBusqueda + '=' + Valor;
    escribirMensaje('InnerJoin', Query.SQL.Text);
    Query.Open;
  except
    on E: Exception do
    begin
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'InnerJoin', '- no data -', E.Message);
    end;

  end;
end;

procedure TOlimpiadas.InnerJoin3(Tabla1, Tabla2, Tabla3, Parametro1, Parametro2,
  IdBusqueda, Valor: string; Query: TFDQuery);
begin
  try
    Query.Close;
    Query.SQL.Text := 'SELECT * FROM ' + Tabla1 + ' INNER JOIN ' + Tabla2 +
      ' ON ' + Tabla1 + '.' + Parametro1 + ' = ' + Tabla2 + '.' + Parametro1 +
      ' inner join ' + Tabla3 + ' on ' + Tabla1 + '.' + Parametro2 + ' = ' +
      Tabla3 + '.' + Parametro2 + ' WHERE ' + Tabla2 + '.' + IdBusqueda +
      '=' + Valor;
    Query.Open;
  except
    on E: Exception do
    begin
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'InnerJoin3', '- no data -', E.Message);
    end;
  end;
end;

procedure TOlimpiadas.INSERT(nombreTabla: string; Query: TFDQuery);
var
  i: integer;
  consulta: string;
begin
  try
    consulta := 'INSERT INTO ' + nombreTabla + '(';

    for i := 1 to FParametros.Count do
    begin
      consulta := consulta + FParametros[i - 1];
      if i < FParametros.Count then
        consulta := consulta + ',';
    end;

    consulta := consulta + ') VALUES (';

    for i := 1 to FParametros.Count do
    begin
      consulta := consulta + ':' + FParametros[i - 1];
      if i < FParametros.Count then
        consulta := consulta + ',';
    end;

    consulta := consulta + ')';

    Query.SQL.Text := consulta;
  except
    on E: Exception do
    begin
      BackupModule.registrarError(TimeToStr(now), DateToString(now), 'INSERT',
        '- no data -', E.Message);
    end;
  end;
end;

procedure TOlimpiadas.DataModuleCreate(Sender: TObject);
begin
  FParametros := TStringList.create;
  FTipo := TStringList.create;
  Conexion.Connected := True;
end;

procedure TOlimpiadas.DELETE(nombreTabla, Identificador, ID: string;
  Query: TFDQuery);
begin
  try
    Query.SQL.Text := 'DELETE FROM ' + nombreTabla + ' WHERE ' + Identificador
      + '=' + ID;
    Query.ExecSQL;
  except
    on E: Exception do
    begin
      BackupModule.registrarError(TimeToStr(now), DateToString(now), 'DELETE',
        '- no data -', E.Message);
    end;
  end;
end;

function TOlimpiadas.DescargarBackup(const nombreArchivo: string): TJSONObject;
var
  Json: TJSONObject;
  Query: TFDQuery;
  i, j: integer;
  archivo: TStringList;
  fila: string;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    archivo := TStringList.create;
    limpiarConsulta(Query);

    { Archivo de Roles %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% }
    if nombreArchivo = 'Roles' then
    begin
      SELECT('roles', 'idrol', Query);

      limpiarParametros;
      agregarParametro('idrol', 'String');
      agregarParametro('nombre', 'String');

      fila := 'idrol;nombre';
      archivo.Add(fila);
    end;

    { Archivo de Grados %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% }
    if nombreArchivo = 'Grados' then
    begin
      SELECT('grados', 'idgrado', Query);

      limpiarParametros;
      agregarParametro('idgrado', 'String');
      agregarParametro('nombre', 'String');

      fila := 'idgrado;nombre';
      archivo.Add(fila);
    end;

    { Archivo de Niveles %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% }
    if nombreArchivo = 'Niveles' then
    begin
      SELECT('niveles', 'idnivel', Query);

      limpiarParametros;
      agregarParametro('idnivel', 'String');
      agregarParametro('nombre', 'String');

      fila := 'idnivel;nombre';
      archivo.Add(fila);
    end;

    { Archivo de Instituciones %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% }
    if nombreArchivo = 'Instituciones' then
    begin
      SELECT('instituciones', 'idinstitucion', Query);

      limpiarParametros;
      agregarParametro('idinstitucion', 'String');
      agregarParametro('nombre', 'String');
      agregarParametro('direccion', 'String');
      agregarParametro('telefono', 'String');
      agregarParametro('rector', 'String');

      fila := 'idinstitucion;nombre;direccion;telefono;rector';
      archivo.Add(fila);
    end;

    { Archivo de Usuarios %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% }
    if nombreArchivo = 'Usuarios' then
    begin
      SELECT('usuarios', 'idusuario', Query);

      limpiarParametros;
      agregarParametro('idusuario', 'String');
      agregarParametro('nombre', 'String');
      agregarParametro('correo', 'String');
      agregarParametro('contra', 'String');
      agregarParametro('telefono', 'String');
      agregarParametro('idinstitucion', 'String');
      agregarParametro('idrol', 'String');
      agregarParametro('idgrado', 'String');

      fila := 'idusuario;nombre;correo;contra;telefono;idinstitucion;idrol;idgrado';
      archivo.Add(fila);
    end;

    { Archivo de Pruebas %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% }
    if nombreArchivo = 'Pruebas' then
    begin
      SELECT('pruebas', 'idprueba', Query);

      limpiarParametros;
      agregarParametro('idprueba', 'String');
      agregarParametro('nombre', 'String');
      agregarParametro('fecha', 'String');
      agregarParametro('horainicio', 'String');
      agregarParametro('horafin', 'String');
      agregarParametro('estado', 'String');
      agregarParametro('descripcion', 'String');

      fila := 'idprueba;nombre;fecha;horainicio;horafin;estado;descripcion';
      archivo.Add(fila);
    end;

    { Archivo de Preguntas %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% }
    if nombreArchivo = 'Preguntas' then
    begin
      SELECT('preguntas', 'idpregunta', Query);

      limpiarParametros;
      agregarParametro('idpregunta', 'String');
      agregarParametro('pregunta', 'String');
      agregarParametro('idnivel', 'String');
      agregarParametro('idgrado', 'String');
      agregarParametro('idprueba', 'String');

      fila := 'idpregunta;pregunta;idnivel;idgrado;idprueba';
      archivo.Add(fila);
    end;

    { Archivo de Noticias %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% }
    if nombreArchivo = 'Noticias' then
    begin
      SELECT('noticias', 'idnoticia', Query);

      limpiarParametros;
      agregarParametro('idnoticia', 'String');
      agregarParametro('titulo', 'String');
      agregarParametro('noticia', 'String');
      agregarParametro('fechainicio', 'String');
      agregarParametro('fechafin', 'String');
      agregarParametro('imagen', 'String');

      fila := 'idnoticia;titulo;noticia;fechainicio;fechafin;imagen';
      archivo.Add(fila);
    end;

    { Proceso General %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% }
    for i := 1 to Query.RecordCount do
    begin

      fila := '';
      { Crear la cadena }
      for j := 1 to FParametros.Count do
      begin
        fila := fila + Query.FieldByName(FParametros[j - 1]).AsString;
        if j < FParametros.Count then
          fila := fila + ';'
      end;

      archivo.Add(fila);

      Query.Next;
    end;

    { guardar archivo }
    archivo.SaveToFile(FOlimpiadas.RutaArchivos + '\' + nombreArchivo + '.csv');

    Json.AddPair(JsonRespuesta, 'Archivo creado correctamente');
    Json.AddPair('Ruta', FOlimpiadas.RutaServidor + 'Archivos/' + nombreArchivo
      + '.csv');

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now), 'Rol',
        nombreArchivo, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('GET', 'Rol: ' + Json.toString);
  Query.Free;
end;

function TOlimpiadas.DescargarPostgresBackup: TJSONObject;
var
  Script: TStringList;
  Json: TJSONObject;
  Query: TFDQuery;
  i: integer;
  nombreArchivo: string;
begin
  Query := TFDQuery.create(nil);
  Query.Connection := Conexion;
  try
    Json := TJSONObject.create;

    Script := TStringList.create;
    Script.Add('@echo off');
    Script.Add('cd C:\Program Files\PostgreSQL\9.2\bin');
    Script.Add('set BACKUP_FILE=' + FOlimpiadas.RutaArchivos +
      '\Olimpiadas.backup');
    Script.Add('');
    Script.Add
      ('pg_dump -h localhost -p 5432 -U postgres -F c -b -v -f %BACKUP_FILE% olimpiadas');

    nombreArchivo := ExtractFilePath(ParamStr(0)) + '\ScriptBackup.bat';
    Script.SaveToFile(nombreArchivo);

    { Ejecutar el Script }
    i := EjecutarEsperar(nombreArchivo, 0);
    escribirMensaje('Valor Exe', IntToStr(i));

    Json.AddPair(JsonRespuesta, 'Archivo creado correctamente');
    Json.AddPair('Ruta', FOlimpiadas.RutaServidor +
      'Archivos/Olimpiadas.backup');

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'DescargarPostgresBackup', '-no data-', E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('GET', 'Nivel: ' + Json.toString);
  Query.Free;
end;

procedure TOlimpiadas.UPDATE(nombreTabla, Identificador, ID: string;
  Query: TFDQuery);
var
  consulta: string;
  i: integer;
begin
  try
    consulta := 'UPDATE ' + nombreTabla + ' SET ';

    for i := 1 to FParametros.Count do
    begin
      consulta := consulta + FParametros[i - 1] + '=:' + FParametros[i - 1];
      if i < FParametros.Count then
        consulta := consulta + ', ';
    end;

    consulta := consulta + ' WHERE ' + Identificador + '=' + ID;

    Query.SQL.Text := consulta;
  except
    on E: Exception do
    begin
      BackupModule.registrarError(TimeToStr(now), DateToString(now), 'UPDATE',
        '- no data -', E.Message);
    end;
  end;
end;

procedure TOlimpiadas.limpiarParametros;
begin
  FParametros.Clear;
end;

function TOlimpiadas.AccesoDenegado: string;
begin
  Result := 'Acceso denegado, por favor refresque el navegador presionando la tecla F5';
end;

procedure TOlimpiadas.agregarParametro(Param: string; tipo: string);
begin
  FParametros.Add(Param);
  FTipo.Add(tipo);
end;

function TOlimpiadas.crearJSON(Query: TFDQuery): TJSONObject;
var
  i: integer;
begin
  try
    Result := TJSONObject.create;

    if Query.RecordCount > 0 then
    begin
      for i := 1 to FParametros.Count do
      begin
        if FTipo[i - 1] = 'String' then
          Result.AddPair(FParametros[i - 1],
            Query.FieldByName(FParametros[i - 1]).AsString);

        if FTipo[i - 1] = 'Memo' then
          Result.AddPair(FParametros[i - 1],
            Query.FieldByName(FParametros[i - 1]).AsString);

        if FTipo[i - 1] = 'Boolean' then
          Result.AddPair(FParametros[i - 1],
            BoolToStringJS(Query.FieldByName(FParametros[i - 1]).AsBoolean));
      end
    end
    else
    begin
      Result.AddPair(JsonRespuesta, 'Consulta con resultado vacio');
    end;
  except
    on E: Exception do
    begin
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'crearJSON', Query.SQL.Text, E.Message);
    end;
  end;
end;

procedure TOlimpiadas.asignarDatos(datos: TJSONObject; Query: TFDQuery);
var
  i: integer;
begin
  try
    for i := 1 to FParametros.Count do
    begin
      if FTipo[i - 1] = 'String' then
        Query.Params.ParamByName(FParametros[i - 1]).Value :=
          datos.GetValue(FParametros[i - 1]).Value;

      if FTipo[i - 1] = 'Memo' then
        Query.Params.ParamByName(FParametros[i - 1]).AsWideMemo :=
          datos.GetValue(FParametros[i - 1]).Value;

      if FTipo[i - 1] = 'Boolean' then
        Query.Params.ParamByName(FParametros[i - 1]).Value :=
          StringToBoolJS(datos.GetValue(FParametros[i - 1]).Value);
    end;
    Query.ExecSQL;
  except
    on E: Exception do
    begin
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'asignarDatos', '- no data -', E.Message);
    end;
  end;
end;

function TOlimpiadas.BoolToStringJS(bb: boolean): string;
begin
  if bb then
    Result := 'true'
  else
    Result := 'false';
end;

function TOlimpiadas.Texto(ss: string): string;
begin
  Result := chr(39) + ss + chr(39);
end;

function TOlimpiadas.updateToken(const datos: TJSONObject): TJSONObject;
var
  i, n, j: integer;
  nombre, Correo, clave: string;
  token: string;
begin
  try
    nombre := datos.GetValue('nombre').Value;
    Correo := datos.GetValue('correo').Value;
    clave := datos.GetValue('clave').Value;

    if (nombre = 'jprincon') and (Correo = 'jarincon@uniquindio.edu.co') and
      (clave = 'Donmatematicas#512519') then
    begin
      token := FOlimpiadas.obtenerToken;
    end
    else
    begin
      token := 'acceso-denegado';
    end;

    Result := TJSONObject.create;
    Result.AddPair('token', token);
  except
    on E: Exception do
    begin
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'updateToken', '- no data -', E.Message);
    end;
  end;
end;

function TOlimpiadas.DateJSToDatePAS(ss: string): Tdate;
var
  yy, mm, dd: string;
  datos: TStringList;
begin
  try
    datos := TStringList.create;
    datos.CommaText := StringReplace(ss, '-', ',', [rfReplaceAll]);

    Result := StrToDate(datos[2] + '/' + datos[1] + '/' + datos[0]);
  except
    on E: Exception do
    begin
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'DateJSToDatePAS', '- no data -', E.Message);
    end;
  end;
end;

function TOlimpiadas.DateToString(fecha: Tdate): string;
begin

end;

function TOlimpiadas.updateDescargarCertificado(const datos: TJSONObject)
  : TJSONObject;
var
  nombre: string;
  Json: TJSONObject;
begin
  try
    Json := TJSONObject.create;

    nombre := FOlimpiadas.RutaCertificados + '\' + datos.GetValue('idusuario')
      .Value + '.pdf';

    FCertificado.ImprimirCertificado(nombre);

    Json.AddPair(JsonRespuesta, 'El Certificado se creo correctamente');
    Json.AddPair('descarga',
      'http://201.185.240.142/downloads/olimpiadasUT/Certificados/' +
      datos.GetValue('idusuario').Value + '.pdf');
  except
    on E: Exception do
    begin
      BackupModule.registrarError(TimeToStr(now), DateToString(now),
        'descargarCertificado', datos.toString, E.Message);
      Json.AddPair(JsonError, E.Message);
    end;
  end;

  Result := Json;
end;

function TOlimpiadas.updateEnviarCorreo(const token: string;
  const datos: TJSONObject): TJSONObject;
var
  Json: TJSONObject;
  correos: TJSONArray;
  Html: TStringList;
  Correo: string;
  i: integer;
begin
  try
    Json := TJSONObject.create;

    if token = FOlimpiadas.obtenerToken then
    begin
      Html := TStringList.create;
      Html.Add('<!doctype html>');
      Html.Add('<html lang="es">');
      Html.Add('  <head>');
      Html.Add('    <meta charset="utf-8">');
      Html.Add('');
      Html.Add('    <title>' + datos.GetValue('titulo').Value + '</title>');
      Html.Add('  </head>');
      Html.Add('  <body>');

      Html.Add('<div style="border: 1px; border-radius: 10px; margin: 100px; -webkit-box-shadow: 10px 10px 15px 1px rgba(0,0,0,0.58); -moz-box-shadow: 10px 10px 15px 1px rgba(0,0,0,0.58); box-shadow: 10px 10px 15px 1px rgba(0,0,0,0.58);">');
      Html.Add('');
      Html.Add('    <div style="background-color: red; color: white;">');
      Html.Add('        <h1 style="margin: 10px; padding: 10px;">' +
        datos.GetValue('titulo').Value + '</h1>');
      Html.Add('    </div>');
      Html.Add('');
      Html.Add('    <div style="margin: 10px; padding: 10px; font-size: 24px;">');
      Html.Add('        <p>' + datos.GetValue('mensaje').Value + '</p>');

      Html.Add('        <div style="height: 30px;"></div>');
      Html.Add('        <p>Atentamente,</p>');
      Html.Add('        <p>El equipo de Olimpiadas Matemáticas</p>');
      Html.Add('    </div>');
      Html.Add('');
      Html.Add('</div>');

      Html.Add('  </body>');
      Html.Add('</html>');

      // correos := TJSONArray.create;
      correos := TJSONObject.ParseJSONValue(datos.GetValue('usuarios').toString)
        as TJSONArray;

      Data.Subject := datos.GetValue('titulo').Value;
      Data.From.Text := 'Olimpiadas@Matematicas.com';
      Data.ContentType := 'text/html';
      Data.CharSet := 'UTF-8';
      Data.Body.Assign(Html);

      for i := 1 to correos.Count do
      begin
        with Data.Recipients.Add do
        begin
          Name := (correos.Get(i - 1) as TJSONObject).GetValue('nombre').Value;
          Address := (correos.Get(i - 1) as TJSONObject)
            .GetValue('correo').Value;
        end;
      end;

      try
        SMTP.Connect;
        SMTP.Authenticate;
        SMTP.Send(Data);
      finally
        SMTP.Disconnect(True);
        Json.AddPair(JsonRespuesta, 'El Correo se envío correctamente');
      end;

    end
    else
    begin
      Json.AddPair(JsonRespuesta, AccesoDenegado);
    end;

  except
    on E: Exception do
    begin
      Json.AddPair(JsonError, E.Message);
      BackupModule.registrarError(TimeToStr(now), DateToStr(now),
        'updateEnviarCorreo', datos.toString, E.Message);
    end;
  end;

  Result := Json;
  escribirMensaje('updateEnviarCorreo', Json.toString);
end;

end.
