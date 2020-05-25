object BackupModule: TBackupModule
  OldCreateOrder = False
  OnCreate = DataModuleCreate
  Height = 322
  Width = 450
  object Conexion: TFDConnection
    Params.Strings = (
      'DriverID=MSAcc')
    FetchOptions.AssignedValues = [evMode]
    FetchOptions.Mode = fmAll
    Left = 112
    Top = 48
  end
  object Query: TFDQuery
    Connection = Conexion
    Left = 272
    Top = 144
  end
end
