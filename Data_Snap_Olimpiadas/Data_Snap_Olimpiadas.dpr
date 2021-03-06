program Data_Snap_Olimpiadas;
{$APPTYPE GUI}

{$R *.dres}

uses
  Vcl.Forms,
  Web.WebReq,
  IdHTTPWebBrokerBridge,
  uFOlimpiadas in 'uFOlimpiadas.pas' {FOlimpiadas},
  uMetodosServidor in 'uMetodosServidor.pas' {Olimpiadas: TDataModule},
  uModuloWeb in 'uModuloWeb.pas' {WebModule1: TWebModule},
  uFErrores in 'uFErrores.pas' {FErrores},
  uBackupModule in 'uBackupModule.pas' {BackupModule: TDataModule},
  Utilidades in '..\..\MIS_PROYECTOS\7000_Librerias\Utilidades\Utilidades.pas',
  Teclado in '..\..\MIS_PROYECTOS\7000_Librerias\Windows\Teclado.pas',
  uFCertificado in 'uFCertificado.pas' {FCertificado},
  uFManual in 'uFManual.pas' {Form1};

{$R *.res}

begin
  if WebRequestHandler <> nil then
    WebRequestHandler.WebModuleClass := WebModuleClass;
  Application.Initialize;
  Application.CreateForm(TFOlimpiadas, FOlimpiadas);
  Application.CreateForm(TFErrores, FErrores);
  Application.CreateForm(TBackupModule, BackupModule);
  Application.CreateForm(TFCertificado, FCertificado);
  Application.CreateForm(TForm1, Form1);
  Application.Run;
end.
