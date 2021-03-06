unit uBackupModule;

interface

uses
  System.SysUtils, System.Classes, FireDAC.Stan.Intf, FireDAC.Stan.Option,
  FireDAC.Stan.Error, FireDAC.UI.Intf, FireDAC.Phys.Intf, FireDAC.Stan.Def,
  FireDAC.Stan.Pool, FireDAC.Stan.Async, FireDAC.Phys, FireDAC.VCLUI.Wait,
  Data.DB, FireDAC.Comp.Client, FireDAC.Stan.Param, FireDAC.DatS,
  FireDAC.DApt.Intf, FireDAC.DApt, FireDAC.Comp.DataSet, WinApi.Windows,
  Utilidades, FireDAC.Phys.MSAcc, FireDAC.Phys.MSAccDef;

type
  TBackupModule = class(TDataModule)
    Conexion: TFDConnection;
    Query: TFDQuery;
    procedure DataModuleCreate(Sender: TObject);
  private
    FRutaBD: string;
  public
    procedure ActualizarBD;
    procedure registrarError(hora, fecha, procedimiento, datos, Error: string);
  end;

var
  BackupModule: TBackupModule;

implementation

{%CLASSGROUP 'Vcl.Controls.TControl'}
{$R *.dfm}
{$R BD.Res}

procedure TBackupModule.ActualizarBD;
var
  Tablas: TStrings;
begin
  Tablas := TStrings.Create;

  Tablas := TStringList.Create;
  Conexion.GetTableNames('', '', '', Tablas, [osMy], [tkTable], True);

  if Tablas.IndexOf('Usuarios') = -1 then
  begin
    Query.Close;
    Query.SQL.Clear;
    Query.SQL.Add('CREATE TABLE Usuarios (');
    Query.SQL.Add('IdUsuario String(255) primary key not null,');
    Query.SQL.Add('Nombre String(255));');

    Query.ExecSQL;
  end;

  if Tablas.IndexOf('Consultas') = -1 then
  begin
    Query.Close;
    Query.SQL.Clear;
    Query.SQL.Add('CREATE TABLE Consultas (');
    Query.SQL.Add('IdConsulta String(255) primary key not null,');
    Query.SQL.Add('Consulta text,');
    Query.SQL.Add('Tipo String(255),');
    Query.SQL.Add('Fecha String(255),');
    Query.SQL.Add('Hora String(255),');
    Query.SQL.Add('IpCliente String(255),');
    Query.SQL.Add('IdUsuario String(255) references Usuarios(IdUsuario));');

    Query.ExecSQL;
  end;

  if Tablas.IndexOf('Errores') = -1 then
  begin
    Query.Close;
    Query.SQL.Clear;
    Query.SQL.Add('CREATE TABLE Errores (');
    Query.SQL.Add('IdError String(255) primary key not null,');
    Query.SQL.Add('Error text,');
    Query.SQL.Add('Procedimiento String(255),');
    Query.SQL.Add('Datos Text,');
    Query.SQL.Add('Fecha String(255),');
    Query.SQL.Add('Hora String(255));');

    Query.ExecSQL;
  end;

end;

procedure TBackupModule.DataModuleCreate(Sender: TObject);
var
  Recursos: TResourceStream;
begin
  FRutaBD := ExtractFilePath(ParamStr(0)) + 'Backup';
  if not DirectoryExists(FRutaBD) then
    CreateDir(FRutaBD);

  if not FileExists(FRutaBD + '\BDBackup.mdb') then
  begin
    Recursos := TResourceStream.Create(HInstance, 'BD', RT_RCDATA);
    Recursos.SaveToFile(FRutaBD + '\BDBackup.mdb');
    Recursos.Free;
  end;

  Conexion.Params.Database := FRutaBD + '\BDBackup.mdb';
  Conexion.Params.DriverID := 'MSAcc';
  Conexion.Connected := True;

  ActualizarBD;
end;

procedure TBackupModule.registrarError(hora, fecha, procedimiento, datos,
  Error: string);
begin
  Query.Close;
  Query.SQL.Text := 'INSERT INTO Errores (IdError,Hora,Fecha,Procedimiento' +
    ',Datos,Error) VALUES (:IdError,:Hora,:Fecha,:Procedimiento,:Datos,:Error)';

  Query.Params.ParamByName('IdError').Value := generarID;
  Query.Params.ParamByName('Hora').Value := hora;
  Query.Params.ParamByName('Fecha').Value := fecha;
  Query.Params.ParamByName('Procedimiento').Value := procedimiento;
  Query.Params.ParamByName('Datos').AsWideMemo := datos;
  Query.Params.ParamByName('Error').AsWideMemo := Error;

  Query.ExecSQL;
end;

end.
