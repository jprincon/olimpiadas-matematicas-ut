unit uFErrores;

interface

uses
  Winapi.Windows, Winapi.Messages, System.SysUtils, System.Variants,
  System.Classes, Vcl.Graphics, teclado,
  Vcl.Controls, Vcl.Forms, Vcl.Dialogs, SynEdit, Vcl.Buttons, Vcl.ComCtrls,
  Vcl.ExtCtrls, SynEditHighlighter, SynHighlighterGeneral, uBackupModule,
  FireDAC.Stan.Intf, FireDAC.Stan.Option, FireDAC.Stan.Param,
  FireDAC.Stan.Error, FireDAC.DatS, FireDAC.Phys.Intf, FireDAC.DApt.Intf,
  FireDAC.Stan.Async, FireDAC.DApt, Data.DB, FireDAC.Comp.DataSet,
  FireDAC.Comp.Client;

type
  TFErrores = class(TForm)
    LvErrores: TListView;
    Panel1: TPanel;
    PageControl1: TPageControl;
    TabSheet1: TTabSheet;
    Panel2: TPanel;
    Panel3: TPanel;
    snLeerErrores: TSpeedButton;
    sbBorrar: TSpeedButton;
    seError: TSynEdit;
    SynGeneralSyn1: TSynGeneralSyn;
    Query: TFDQuery;
    procedure FormCreate(Sender: TObject);
    procedure LvErroresClick(Sender: TObject);
    procedure snLeerErroresClick(Sender: TObject);
    procedure sbBorrarClick(Sender: TObject);
    procedure FormShow(Sender: TObject);
    procedure LvErroresKeyDown(Sender: TObject; var Key: Word;
      Shift: TShiftState);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  FErrores: TFErrores;

implementation

{$R *.dfm}

procedure TFErrores.FormCreate(Sender: TObject);
begin
  Height := 768;
  Width := round(1.618 * Height);

  seError.Lines.Clear;
end;

procedure TFErrores.FormShow(Sender: TObject);
begin
  snLeerErroresClick(Self);
end;

procedure TFErrores.LvErroresClick(Sender: TObject);
begin
  if LvErrores.Selected <> nil then
  begin
    seError.Lines.Clear;
    seError.Lines.Add(LvErrores.Selected.SubItems[5]);
    seError.Lines.Add('');
    seError.Lines.Add(LvErrores.Selected.SubItems[6]);
  end;
end;

procedure TFErrores.LvErroresKeyDown(Sender: TObject; var Key: Word;
  Shift: TShiftState);
begin
  if Key = TECLA_SUPR then
  begin
    sbBorrarClick(Self);
  end;
end;

procedure TFErrores.snLeerErroresClick(Sender: TObject);
var
  i: integer;
begin
  Query.Close;
  Query.SQL.Text := 'SELECT * FROM Errores';
  Query.Open;

  LvErrores.Items.Clear;

  for i := 1 to Query.RecordCount do
  begin
    with LvErrores.Items.Add.SubItems do
    begin
      Add(IntToStr(i));
      Add(Query.FieldByName('IdError').AsString);
      Add(Query.FieldByName('Hora').AsString);
      Add(Query.FieldByName('Fecha').AsString);
      Add(Query.FieldByName('Procedimiento').AsString);
      Add(Query.FieldByName('Datos').AsString);
      Add(Query.FieldByName('Error').AsString);
    end;

    Query.Next;
  end;
end;

procedure TFErrores.sbBorrarClick(Sender: TObject);
begin
  if LvErrores.Selected <> nil then
  begin
    Query.Close;
    Query.SQL.Text := 'DELETE FROM Errores WHERE IdError=' + #39 +
      LvErrores.Selected.SubItems[1] + #39;
    Query.ExecSQL;

    ShowMessage('Error eliminado');

    snLeerErroresClick(Self);

    LvErrores.Items[LvErrores.Selected.Index + 1].Selected := true;
  end;
end;

end.
