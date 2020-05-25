object FCertificado: TFCertificado
  Left = 0
  Top = 0
  Caption = 'Certificados'
  ClientHeight = 822
  ClientWidth = 1224
  Color = clWhite
  Font.Charset = DEFAULT_CHARSET
  Font.Color = clWindowText
  Font.Height = -11
  Font.Name = 'Tahoma'
  Font.Style = []
  OldCreateOrder = False
  PixelsPerInch = 96
  TextHeight = 13
  object ScrollBox1: TScrollBox
    Left = 0
    Top = 0
    Width = 1224
    Height = 822
    Align = alClient
    TabOrder = 0
    object PRPage1: TPRPage
      AlignWithMargins = True
      Left = 10
      Top = 10
      Width = 1056
      Height = 816
      MarginTop = 32
      MarginLeft = 32
      MarginRight = 32
      MarginBottom = 32
      object pr1: TPRLayoutPanel
        Left = 33
        Top = 33
        Width = 990
        Height = 750
        Align = alClient
        ExplicitLeft = 512
        ExplicitTop = 320
        ExplicitWidth = 201
        ExplicitHeight = 137
        object prImg: TPRJpegImage
          Left = 0
          Top = 0
          Width = 990
          Height = 750
          Align = alClient
          SharedImage = True
          ExplicitLeft = 376
          ExplicitTop = 216
          ExplicitWidth = 201
          ExplicitHeight = 153
        end
        object PRLabel1: TPRLabel
          Left = 32
          Top = 24
          Width = 385
          Height = 57
          FontName = fnArial
          FontSize = 36.000000000000000000
          Caption = 'Nombre de la Etiqueta'
        end
      end
    end
  end
  object Impresora: TPReport
    FileName = 'default.pdf'
    CreationDate = 43963.021536180550000000
    UseOutlines = False
    ViewerPreference = []
    Left = 1096
    Top = 88
  end
end
