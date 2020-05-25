object Olimpiadas: TOlimpiadas
  OldCreateOrder = False
  OnCreate = DataModuleCreate
  Height = 430
  Width = 593
  object Conexion: TFDConnection
    Params.Strings = (
      'User_Name=postgres'
      'Password=postgres'
      'Database=olimpiadas'
      'DriverID=PG')
    FetchOptions.AssignedValues = [evMode]
    FetchOptions.Mode = fmAll
    LoginPrompt = False
    Left = 88
    Top = 72
  end
  object SMTP: TIdSMTP
    IOHandler = SSL
    Host = 'smtp.gmail.com'
    Password = 'donmatematicas'
    Port = 587
    SASLMechanisms = <>
    UseTLS = utUseExplicitTLS
    Username = 'jarincon@uniquindio.edu.co'
    Left = 480
    Top = 64
  end
  object SSL: TIdSSLIOHandlerSocketOpenSSL
    Destination = 'smtp.gmail.com:587'
    Host = 'smtp.gmail.com'
    MaxLineAction = maException
    Port = 587
    DefaultPort = 0
    SSLOptions.Mode = sslmUnassigned
    SSLOptions.VerifyMode = []
    SSLOptions.VerifyDepth = 0
    Left = 72
    Top = 216
  end
  object DATA: TIdMessage
    AttachmentEncoding = 'UUE'
    BccList = <>
    CCList = <>
    Encoding = meDefault
    FromList = <
      item
      end>
    Recipients = <>
    ReplyTo = <>
    ConvertPreamble = True
    Left = 256
    Top = 112
  end
  object IdTelnet1: TIdTelnet
    Terminal = 'dumb'
    Left = 136
    Top = 320
  end
end
