import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DlgRolComponent } from '../dialogos/dlg-rol/dlg-rol.component';
import { ConfirmacionComponent } from '../dialogos/confirmacion/confirmacion.component';
import { SnackbarComponent } from '../dialogos/snackbar/snackbar.component';
import { DlgGradoComponent } from '../dialogos/dlg-grado/dlg-grado.component';
import { DlgNivelComponent } from '../dialogos/dlg-nivel/dlg-nivel.component';
import { DlgInstitucionComponent } from '../dialogos/dlg-institucion/dlg-institucion.component';
import { DlgRutaComponent } from '../dialogos/dlg-ruta/dlg-ruta.component';
import { DlgUsuarioComponent } from '../dialogos/dlg-usuario/dlg-usuario.component';
import { DlgNoticiaComponent } from '../dialogos/dlg-noticia/dlg-noticia.component';
import { MensajesComponent } from '../dialogos/mensajes/mensajes.component';
import { DlgPreguntaComponent } from '../dialogos/dlg-pregunta/dlg-pregunta.component';
import { DlgOpcionPreguntaComponent } from '../dialogos/dlg-opcion-pregunta/dlg-opcion-pregunta.component';
import { DlgImagenPreguntaComponent } from '../dialogos/dlg-imagen-pregunta/dlg-imagen-pregunta.component';
import { DlgPruebaComponent } from '../dialogos/dlg-prueba/dlg-prueba.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  DlgRol(sAccion: string, id: string) {
    const dialogRef = this.dialog.open(DlgRolComponent, {
      width: '60%',
      data: {accion: sAccion, idrol: id}
    });

    return dialogRef.afterClosed();
  }

  confirmacion(msg: string) {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '60%',
      data: {Msg: msg}
    });

    return dialogRef.afterClosed();
  }

  mostrarSnackBar(titulo: string, msg: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {Titulo: titulo, Mensaje: msg}, duration: 5000
    });
  }

  DlgGrado(sAccion: string, id: string) {
    const dialogRef = this.dialog.open(DlgGradoComponent, {
      width: '60%',
      data: {accion: sAccion, idgrado: id}
    });

    return dialogRef.afterClosed();
  }

  DlgNivel(sAccion: string, id: string) {
    const dialogRef = this.dialog.open(DlgNivelComponent, {
      width: '60%',
      data: {accion: sAccion, idnivel: id}
    });

    return dialogRef.afterClosed();
  }

  DlgInstitucion(sAccion: string, id: string) {
    const dialogRef = this.dialog.open(DlgInstitucionComponent, {
      width: '60%',
      data: {accion: sAccion, idinstitucion: id}
    });

    return dialogRef.afterClosed();
  }

  DlgRuta(sAccion: string, id: string) {
    const dialogRef = this.dialog.open(DlgRutaComponent, {
      width: '60%',
      data: {accion: sAccion, idruta: id}
    });

    return dialogRef.afterClosed();
  }

  DlgUsuario(sAccion: string, id: string, esRegistroEstudiante: boolean, idInstitucion: string) {
    const dialogRef = this.dialog.open(DlgUsuarioComponent, {
      width: '60%', height: '80%',
      data: {accion: sAccion, idusuario: id, esRegistroEstudiante, idInstitucion}
    });

    return dialogRef.afterClosed();
  }

  DlgNoticia(sAccion: string, id: string) {
    const dialogRef = this.dialog.open(DlgNoticiaComponent, {
      width: '60%',
      data: {accion: sAccion, idnoticia: id}
    });

    return dialogRef.afterClosed();
  }

  DlgMensaje(titulo: string, mensaje: string) {
    const dialogRef = this.dialog.open(MensajesComponent, {
      width: '60%',
      data: {Titulo: titulo, Mensaje: mensaje}
    });

    return dialogRef.afterClosed();
  }

  DlgPregunta(sAccion: string, id: string) {
    const dialogRef = this.dialog.open(DlgPreguntaComponent, {
      width: '60%', height: '80%',
      data: {accion: sAccion, idpregunta: id}
    });

    return dialogRef.afterClosed();
  }

  DlgOpcionPregunta(sAccion: string, id: string, idPregunta: string) {
    const dialogRef = this.dialog.open(DlgOpcionPreguntaComponent, {
      width: '60%',
      data: {accion: sAccion, idopcionpregunta: id, IdPregunta: idPregunta}
    });

    return dialogRef.afterClosed();
  }

  DlgImagenPregunta(sAccion: string, id: string, idPregunta: string) {
    const dialogRef = this.dialog.open(DlgImagenPreguntaComponent, {
      width: '60%',
      data: {accion: sAccion, idimagenpregunta: id, IdPregunta: idPregunta}
    });

    return dialogRef.afterClosed();
  }

  DlgPrueba(sAccion: string, id: string) {
    const dialogRef = this.dialog.open(DlgPruebaComponent, {
      width: '60%',
      data: {accion: sAccion, idprueba: id}
    });

    return dialogRef.afterClosed();
  }

}
