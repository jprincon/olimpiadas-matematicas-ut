unit uFOlimpiadas;

interface

uses
  Winapi.Messages, System.SysUtils, System.Variants,
  System.Classes, Vcl.Graphics, Vcl.Controls, Vcl.Forms, Vcl.Dialogs,
  Vcl.AppEvnts, Vcl.StdCtrls, IdHTTPWebBrokerBridge, Web.HTTPApp, Vcl.Buttons,
  Vcl.ExtCtrls, Vcl.ComCtrls, System.ImageList, Vcl.ImgList, SynEditHighlighter,
  SynHighlighterJSON, SynEdit, Vcl.WinXPanels, Vcl.Menus, uFErrores;

type
  TFOlimpiadas = class(TForm)
    ApplicationEvents1: TApplicationEvents;
    MenuPrincipal: TPageControl;
    TanConexion: TTabSheet;
    Panel1: TPanel;
    Panel2: TPanel;
    Panel3: TPanel;
    ButtonStart: TSpeedButton;
    Label2: TLabel;
    Panel4: TPanel;
    ButtonStop: TSpeedButton;
    Label3: TLabel;
    Panel5: TPanel;
    ButtonOpenBrowser: TSpeedButton;
    Label4: TLabel;
    Panel6: TPanel;
    Label5: TLabel;
    EditPort: TEdit;
    menuLateral: TPageControl;
    TabMenu: TTabSheet;
    Contenido: TCardPanel;
    Consola: TCard;
    LvMensajes: TListView;
    GroupBox1: TGroupBox;
    seVistaPrevia: TSynEdit;
    SynJSONSyn1: TSynJSONSyn;
    iconos24: TImageList;
    TrayIcon1: TTrayIcon;
    PopupMenu1: TPopupMenu;
    VerServidor1: TMenuItem;
    LimpiarConsola1: TMenuItem;
    TvMenu: TTreeView;
    Panel7: TPanel;
    Panel8: TPanel;
    Panel9: TPanel;
    sbVerErrores: TSpeedButton;
    Label1: TLabel;
    Configuracion: TCard;
    GroupBox2: TGroupBox;
    edRutaCertificados: TEdit;
    GroupBox3: TGroupBox;
    edRutaArchivos: TEdit;
    GroupBox4: TGroupBox;
    edRutaServidor: TEdit;

    procedure FormCreate(Sender: TObject);

    procedure ApplicationEvents1Idle(Sender: TObject; var Done: Boolean);
    procedure ButtonStartClick(Sender: TObject);
    procedure ButtonStopClick(Sender: TObject);
    procedure ButtonOpenBrowserClick(Sender: TObject);
    procedure LvMensajesClick(Sender: TObject);
    procedure VerServidor1Click(Sender: TObject);
    procedure FormResize(Sender: TObject);
    procedure LimpiarConsola1Click(Sender: TObject);
    procedure TvMenuClick(Sender: TObject);
    procedure sbVerErroresClick(Sender: TObject);
  private
    FServer: TIdHTTPWebBrokerBridge;
    tokenServidor: string;
    letras: array [1 .. 36] of string;

    procedure StartServer;
    procedure WMSysCommand(var Msg: TWMSysCommand); message WM_SYSCOMMAND;
    function getRutaCertificados: string;
    function getRutaArchivos: string;
    function getRutaServidor: string;

  public
    procedure escribirMensaje(tipo: string; Msg: string);

    function obtenerToken: string;
    procedure generarNuevoToken;

    procedure crearMenu;
    procedure agregarMenu(ss: string);

    property RutaCertificados: string read getRutaCertificados;
    property RutaArchivos: string read getRutaArchivos;
    property RutaServidor: string read getRutaServidor;
  end;

const
  MENU_CONSOLA = 'Consola';

var
  FOlimpiadas: TFOlimpiadas;

implementation

{$R *.dfm}

uses
  Winapi.Windows, Winapi.ShellApi, Datasnap.DSSession;

procedure TFOlimpiadas.agregarMenu(ss: string);
begin
  with TvMenu.Items.Add(nil, ss) do
  begin
    ImageIndex := 8;
    SelectedIndex := 8;
  end;
end;

procedure TFOlimpiadas.ApplicationEvents1Idle(Sender: TObject;
  var Done: Boolean);
begin
  ButtonStart.Enabled := not FServer.Active;
  ButtonStop.Enabled := FServer.Active;
  EditPort.Enabled := not FServer.Active;
end;

procedure TFOlimpiadas.ButtonOpenBrowserClick(Sender: TObject);
var
  LURL: string;
begin
  StartServer;
  LURL := Format('http://localhost:%s', [EditPort.Text]);
  ShellExecute(0, nil, PChar(LURL), nil, nil, SW_SHOWNOACTIVATE);
end;

procedure TFOlimpiadas.ButtonStartClick(Sender: TObject);
begin
  StartServer;
end;

procedure TerminateThreads;
begin
  if TDSSessionManager.Instance <> nil then
    TDSSessionManager.Instance.TerminateAllSessions;
end;

procedure TFOlimpiadas.ButtonStopClick(Sender: TObject);
begin
  TerminateThreads;
  FServer.Active := False;
  FServer.Bindings.Clear;
end;

procedure TFOlimpiadas.crearMenu;
begin
  TvMenu.Items.Clear;

  agregarMenu(MENU_CONSOLA);
end;

procedure TFOlimpiadas.escribirMensaje(tipo, Msg: string);
begin
  with LvMensajes.Items.Add.SubItems do
  begin
    Add(IntToStr(LvMensajes.Items.Count));
    Add(DateToStr(now));
    Add(tipo);
    Add(Msg);
  end;
end;

procedure TFOlimpiadas.FormCreate(Sender: TObject);
begin
  FServer := TIdHTTPWebBrokerBridge.Create(Self);

  letras[1] := 'a';
  letras[2] := 'b';
  letras[3] := 'c';
  letras[4] := 'd';
  letras[5] := 'e';
  letras[6] := 'f';
  letras[7] := 'g';
  letras[8] := 'h';
  letras[9] := 'i';
  letras[10] := 'j';
  letras[11] := 'k';
  letras[12] := 'l';
  letras[13] := 'm';
  letras[14] := 'n';
  letras[15] := 'o';
  letras[16] := 'p';
  letras[17] := 'q';
  letras[18] := 'r';
  letras[19] := 's';
  letras[20] := 't';
  letras[21] := 'u';
  letras[22] := 'v';
  letras[23] := 'w';
  letras[24] := 'x';
  letras[25] := 'y';
  letras[26] := 'z';
  letras[27] := '0';
  letras[28] := '1';
  letras[29] := '2';
  letras[30] := '3';
  letras[31] := '4';
  letras[32] := '5';
  letras[33] := '6';
  letras[34] := '7';
  letras[35] := '8';
  letras[36] := '9';

  generarNuevoToken;

  TrayIcon1.Visible := True;

  crearMenu;

  Contenido.ActiveCard := Consola;
end;

procedure TFOlimpiadas.FormResize(Sender: TObject);
begin
  if WindowState = wsMinimized then
    hide;
end;

procedure TFOlimpiadas.LimpiarConsola1Click(Sender: TObject);
begin
  LvMensajes.Items.Clear;
end;

procedure TFOlimpiadas.LvMensajesClick(Sender: TObject);
begin
  if LvMensajes.Selected <> nil then
  begin
    seVistaPrevia.Lines.Clear;
    seVistaPrevia.Lines.Add(LvMensajes.Selected.SubItems[3]);
  end;
end;

procedure TFOlimpiadas.StartServer;
begin
  if not FServer.Active then
  begin
    FServer.Bindings.Clear;
    FServer.DefaultPort := StrToInt(EditPort.Text);
    FServer.Active := True;
  end;
end;

procedure TFOlimpiadas.TvMenuClick(Sender: TObject);
begin
  if TvMenu.Selected <> nil then
  begin
    if TvMenu.Selected.Text = MENU_CONSOLA then
      Contenido.ActiveCard := Consola;
  end;
end;

procedure TFOlimpiadas.VerServidor1Click(Sender: TObject);
begin
  Show;
end;

procedure TFOlimpiadas.WMSysCommand(var Msg: TWMSysCommand);
begin
  { if (Msg.CmdType = SC_MAXIMIZE) then
    .. .else
    if (Msg.CmdType = SC_MINIMIZE) then
    .. .else
    if (Msg.CmdType = SC_RESTORE) then
    .. .else DefaultHandler(Msg); }

  if (Msg.CmdType = SC_MINIMIZE) then
    hide
  else
    DefaultHandler(Msg);
end;

function TFOlimpiadas.obtenerToken: string;
begin
  Result := tokenServidor;
end;

procedure TFOlimpiadas.sbVerErroresClick(Sender: TObject);
begin
  FErrores.Show;
end;

procedure TFOlimpiadas.generarNuevoToken;
var
  token: string;
  i, n: integer;
begin
  token := '';
  for i := 1 to 32 do
  begin
    n := Round(Random(36)) + 1;
    token := token + letras[n];
  end;

  tokenServidor := token;
end;

function TFOlimpiadas.getRutaArchivos: string;
begin
  Result := edRutaArchivos.Text;
end;

function TFOlimpiadas.getRutaCertificados: string;
begin
  Result := edRutaCertificados.Text;
end;

function TFOlimpiadas.getRutaServidor: string;
begin
  Result := edRutaServidor.Text;
end;

end.
