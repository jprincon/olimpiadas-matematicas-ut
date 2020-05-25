import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Angular Material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

// Graficos
import { ChartsModule } from 'ng2-charts';

// %%%%%%% Latex para Angular %%%%%%%
import { KatexModule } from 'ng-katex';

import { AppComponent } from './app.component';
import { routingModule } from './app.router';


import { CapitalizadoPipe } from './Pipes/capitalizado.pipe';
import { FiltrarImagenPipe } from './Pipes/filtrar-imagen.pipe';
import { DomSeguroPipe } from './Pipes/dom-seguro.pipe';
import { LongitudTextoPipe } from './Pipes/longitud-texto.pipe';
import { DescargasPipe } from './Pipes/descargas.pipe';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { ImagenBdPipe } from './Pipes/imagen-bd.pipe';
import { TiempoPipe } from './Pipes/tiempo.pipe';
import { NgDropFilesDirective } from './Directivas/ng-drop-files.directive';
import { NoImagenPipe } from './Pipes/no-imagen.pipe';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { MenuPrincipalComponent } from './componentes/menu-principal/menu-principal.component';
import { DlgRolComponent } from './dialogos/dlg-rol/dlg-rol.component';
import { RolesComponent } from './administrador/roles/roles.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { ConfirmacionComponent } from './dialogos/confirmacion/confirmacion.component';
import { SnackbarComponent } from './dialogos/snackbar/snackbar.component';
import { DlgGradoComponent } from './dialogos/dlg-grado/dlg-grado.component';
import { GradosComponent } from './administrador/grados/grados.component';
import { NivelesComponent } from './administrador/niveles/niveles.component';
import { DlgNivelComponent } from './dialogos/dlg-nivel/dlg-nivel.component';
import { InstitucionesComponent } from './administrador/instituciones/instituciones.component';
import { DlgInstitucionComponent } from './dialogos/dlg-institucion/dlg-institucion.component';
import { DlgRutaComponent } from './dialogos/dlg-ruta/dlg-ruta.component';
import { RutasComponent } from './administrador/rutas/rutas.component';
import { DlgUsuarioComponent } from './dialogos/dlg-usuario/dlg-usuario.component';
import { UsuariosComponent } from './administrador/usuarios/usuarios.component';
import { UsuarioComponent } from './administrador/usuario/usuario.component';
import { DlgNoticiaComponent } from './dialogos/dlg-noticia/dlg-noticia.component';
import { NoticiasComponent } from './administrador/noticias/noticias.component';
import { VerNoticiaComponent } from './componentes/ver-noticia/ver-noticia.component';
import { MensajesComponent } from './dialogos/mensajes/mensajes.component';
import { NombrePersonaPipe } from './Pipes/nombre-persona.pipe';
import { RecuperarContraComponent } from './componentes/recuperar-contra/recuperar-contra.component';
import { MostrarCorreoPipe } from './Pipes/mostrar-correo.pipe';
import { PerfilUsuarioComponent } from './componentes/perfil-usuario/perfil-usuario.component';
import { PresentarPruebaComponent } from './componentes/presentar-prueba/presentar-prueba.component';
import { PuntajesComponent } from './componentes/puntajes/puntajes.component';
import { EstadisticasComponent } from './componentes/estadisticas/estadisticas.component';
import { PreguntasComponent } from './administrador/preguntas/preguntas.component';
import { DlgPreguntaComponent } from './dialogos/dlg-pregunta/dlg-pregunta.component';
import { VerPreguntaComponent } from './administrador/preguntas/ver-pregunta/ver-pregunta.component';
import { DlgOpcionPreguntaComponent } from './dialogos/dlg-opcion-pregunta/dlg-opcion-pregunta.component';
import { DlgImagenPreguntaComponent } from './dialogos/dlg-imagen-pregunta/dlg-imagen-pregunta.component';
import { PruebasComponent } from './administrador/pruebas/pruebas.component';
import { DlgPruebaComponent } from './dialogos/dlg-prueba/dlg-prueba.component';
import { VerPruebaComponent } from './administrador/pruebas/ver-prueba/ver-prueba.component';
import { DlgEsperaComponent } from './dialogos/dlg-espera/dlg-espera.component';
import { PruebaComponent } from './componentes/prueba/prueba.component';
import { RegistroPorInstitucionComponent } from './componentes/registro-por-institucion/registro-por-institucion.component';
import { CorreoUsuariosComponent } from './administrador/correo-usuarios/correo-usuarios.component';
import { ConfiguracionComponent } from './administrador/configuracion/configuracion.component';
import { CorreosComponent } from './administrador/correos/correos.component';
import { CopiasSeguridadComponent } from './administrador/copias-seguridad/copias-seguridad.component';
import { ExportarPreguntasComponent } from './administrador/preguntas/exportar-preguntas/exportar-preguntas.component';
import { EstUsuarioComponent } from './componentes/estadisticas/est-usuario/est-usuario.component';
import { EstPreguntasComponent } from './componentes/estadisticas/est-preguntas/est-preguntas.component';
import { EstPruebasComponent } from './componentes/estadisticas/est-pruebas/est-pruebas.component';


@NgModule({
  declarations: [
    AppComponent,
    CapitalizadoPipe,
    DomSeguroPipe,
    FiltrarImagenPipe,
    DomSeguroPipe,
    LongitudTextoPipe,
    DescargasPipe,
    HeaderComponent,
    FooterComponent,
    ImagenBdPipe,
    TiempoPipe,
    NgDropFilesDirective,
    NoImagenPipe,
    InicioComponent,
    MenuPrincipalComponent,
    DlgRolComponent,
    RolesComponent,
    AdministradorComponent,
    ConfirmacionComponent,
    SnackbarComponent,
    DlgGradoComponent,
    GradosComponent,
    NivelesComponent,
    DlgNivelComponent,
    InstitucionesComponent,
    DlgInstitucionComponent,
    DlgRutaComponent,
    RutasComponent,
    DlgUsuarioComponent,
    UsuariosComponent,
    UsuarioComponent,
    DlgNoticiaComponent,
    NoticiasComponent,
    VerNoticiaComponent,
    MensajesComponent,
    NombrePersonaPipe,
    RecuperarContraComponent,
    MostrarCorreoPipe,
    PerfilUsuarioComponent,
    PresentarPruebaComponent,
    PuntajesComponent,
    EstadisticasComponent,
    PreguntasComponent,
    DlgPreguntaComponent,
    VerPreguntaComponent,
    DlgOpcionPreguntaComponent,
    DlgImagenPreguntaComponent,
    PruebasComponent,
    DlgPruebaComponent,
    VerPruebaComponent,
    DlgEsperaComponent,
    PruebaComponent,
    RegistroPorInstitucionComponent,
    CorreoUsuariosComponent,
    ConfiguracionComponent,
    CorreosComponent,
    CopiasSeguridadComponent,
    ExportarPreguntasComponent,
    EstUsuarioComponent,
    EstPreguntasComponent,
    EstPruebasComponent
  ],
  imports: [
    BrowserModule,
    routingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule,
    ChartsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatRadioModule,
    KatexModule,
    MatSlideToggleModule
  ],
  entryComponents: [
    SnackbarComponent,
    DlgRolComponent,
    ConfirmacionComponent,
    DlgGradoComponent,
    DlgNivelComponent,
    DlgInstitucionComponent,
    DlgRutaComponent,
    DlgUsuarioComponent,
    DlgNoticiaComponent,
    MensajesComponent,
    DlgPreguntaComponent,
    DlgOpcionPreguntaComponent,
    DlgImagenPreguntaComponent,
    DlgPruebaComponent,
    DlgEsperaComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
