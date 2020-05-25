unit uFCertificado;

interface

uses
  Winapi.Windows, Winapi.Messages, System.SysUtils, System.Variants,
  System.Classes, Vcl.Graphics,
  Vcl.Controls, Vcl.Forms, Vcl.Dialogs, PReport, PRJpegImage, Vcl.ExtCtrls,
  PdfDoc;

type
  TFCertificado = class(TForm)
    ScrollBox1: TScrollBox;
    PRPage1: TPRPage;
    pr1: TPRLayoutPanel;
    prImg: TPRJpegImage;
    PRLabel1: TPRLabel;
    Impresora: TPReport;
  private
    { Private declarations }
  public
    procedure ImprimirCertificado(nombre: string);
  end;

var
  FCertificado: TFCertificado;

implementation

{$R *.dfm}
{ TFCertificado }

procedure TFCertificado.ImprimirCertificado(nombre: string);
begin
  Impresora.FileName := nombre;

  Impresora.BeginDoc;
  Impresora.Print(PRPage1);
  Impresora.EndDoc;
end;

end.
