import { RegistroPorInstitucionComponent } from './componentes/registro-por-institucion/registro-por-institucion.component';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { MenuPrincipalComponent } from './componentes/menu-principal/menu-principal.component';
import { AuthGuardService } from './Servicios/auth-guard.service';
import { RolesComponent } from './administrador/roles/roles.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { GradosComponent } from './administrador/grados/grados.component';
import { NivelesComponent } from './administrador/niveles/niveles.component';
import { InstitucionesComponent } from './administrador/instituciones/instituciones.component';
import { RutasComponent } from './administrador/rutas/rutas.component';
import { UsuariosComponent } from './administrador/usuarios/usuarios.component';
import { UsuarioComponent } from './administrador/usuario/usuario.component';
import { NoticiasComponent } from './administrador/noticias/noticias.component';
import { VerNoticiaComponent } from './componentes/ver-noticia/ver-noticia.component';
import { RecuperarContraComponent } from './componentes/recuperar-contra/recuperar-contra.component';
import { PerfilUsuarioComponent } from './componentes/perfil-usuario/perfil-usuario.component';
import { PresentarPruebaComponent } from './componentes/presentar-prueba/presentar-prueba.component';
import { PuntajesComponent } from './componentes/puntajes/puntajes.component';
import { EstadisticasComponent } from './componentes/estadisticas/estadisticas.component';
import { PreguntasComponent } from './administrador/preguntas/preguntas.component';
import { VerPreguntaComponent } from './administrador/preguntas/ver-pregunta/ver-pregunta.component';
import { PruebasComponent } from './administrador/pruebas/pruebas.component';
import { VerPruebaComponent } from './administrador/pruebas/ver-prueba/ver-prueba.component';
import { PruebaComponent } from './componentes/prueba/prueba.component';
import { RUTA_ADMIN_ENVIAR_CORREO, RUTA_ADMIN_CONFIGURACION, RUTA_ADMIN_COPIAS_SEGURIDAD, RUTA_ADMIN_EXPORTAR_PREGUNTAS, RUTA_ESTAD_USUARIO, RUTA_ESTAD_PREGUNTAS, RUTA_ESTAD_PRUEBAS } from './config/constantes';
import { CorreoUsuariosComponent } from './administrador/correo-usuarios/correo-usuarios.component';
import { ConfiguracionComponent } from './administrador/configuracion/configuracion.component';
import { RUTA_ADMIN_RUTAS,        RUTA_ADMIN_USUARIOS, RUTA_ADMIN_NOTICIAS, RUTA_ADMIN_PRUEBAS, RUTA_ADMIN_VER_PRUEBA, RUTA_ADMIN_PREGUNTAS,
         RUTA_ADMIN_VER_PREGUNTA, RUTA_ADMIN_USUARIO, RUTA_INICIO, RUTA_MENU_PRINCIPAL, RUTA_VER_NOTICIA, RUTA_RECUPERAR_CONTRA,
         RUTA_PERFIL_USUARIO,     RUTA_PRESENTAR_PRUEBAS, RUTA_PUNTAJES, RUTA_PRUEBA, RUTA_ESTADISTICAS, RUTA_ADMINISTRADOR,
         RUTA_ADMIN_ROLES,        RUTA_ADMIN_GRADOS, RUTA_ADMIN_NIVELES, RUTA_ADMIN_INSTITUCIONES, RUTA_REGISTRO_INSTITUCION } from './config/constantes';
import { CorreosComponent } from './administrador/correos/correos.component';
import { CopiasSeguridadComponent } from './administrador/copias-seguridad/copias-seguridad.component';
import { ExportarPreguntasComponent } from './administrador/preguntas/exportar-preguntas/exportar-preguntas.component';
import { EstPreguntasComponent } from './componentes/estadisticas/est-preguntas/est-preguntas.component';
import { EstUsuarioComponent } from './componentes/estadisticas/est-usuario/est-usuario.component';
import { EstPruebasComponent } from './componentes/estadisticas/est-pruebas/est-pruebas.component';

const routes: Routes = [
  { path: RUTA_INICIO, component: InicioComponent },
  { path: RUTA_MENU_PRINCIPAL, component: MenuPrincipalComponent },
  { path: RUTA_VER_NOTICIA + '/:id', component: VerNoticiaComponent },
  { path: RUTA_RECUPERAR_CONTRA + '/:id/:idUsuario', component: RecuperarContraComponent },
  { path: RUTA_REGISTRO_INSTITUCION, component: RegistroPorInstitucionComponent },

  // Con Seguridad
  { path: RUTA_PERFIL_USUARIO, component: PerfilUsuarioComponent, canActivate: [AuthGuardService] },
  { path: RUTA_PRESENTAR_PRUEBAS, component: PresentarPruebaComponent, canActivate: [AuthGuardService] },
  { path: RUTA_PUNTAJES, component: PuntajesComponent, canActivate: [AuthGuardService] },
  { path: RUTA_PRUEBA + '/:IdPrueba', component: PruebaComponent, canActivate: [AuthGuardService] },
  {path: RUTA_ADMIN_EXPORTAR_PREGUNTAS, component: ExportarPreguntasComponent, canActivate: [AuthGuardService]},

  { path: RUTA_ESTADISTICAS, component: EstadisticasComponent, canActivate: [AuthGuardService],
    children: [
      {path: RUTA_ESTAD_USUARIO, component: EstUsuarioComponent, canActivate: [AuthGuardService]},
      {path: RUTA_ESTAD_PREGUNTAS, component: EstPreguntasComponent, canActivate: [AuthGuardService]},
      {path: RUTA_ESTAD_PRUEBAS, component: EstPruebasComponent, canActivate: [AuthGuardService]},
      { path: '**', pathMatch: 'full', redirectTo: RUTA_ESTAD_USUARIO }
    ]
  },

  // Administrador
  { path: RUTA_ADMINISTRADOR, component: AdministradorComponent, canActivate: [AuthGuardService],
    children: [
      {path: RUTA_ADMIN_ROLES, component: RolesComponent, canActivate: [AuthGuardService]},
      {path: RUTA_ADMIN_GRADOS, component: GradosComponent, canActivate: [AuthGuardService]},
      {path: RUTA_ADMIN_NIVELES, component: NivelesComponent, canActivate: [AuthGuardService]},
      {path: RUTA_ADMIN_INSTITUCIONES, component: InstitucionesComponent, canActivate: [AuthGuardService]},
      {path: RUTA_ADMIN_RUTAS, component: RutasComponent, canActivate: [AuthGuardService]},
      {path: RUTA_ADMIN_USUARIOS, component: UsuariosComponent, canActivate: [AuthGuardService]},
      {path: RUTA_ADMIN_NOTICIAS, component: NoticiasComponent, canActivate: [AuthGuardService]},
      {path: RUTA_ADMIN_PRUEBAS, component: PruebasComponent, canActivate: [AuthGuardService]},
      {path: RUTA_ADMIN_ENVIAR_CORREO, component: CorreosComponent, canActivate: [AuthGuardService]},
      {path: RUTA_ADMIN_CONFIGURACION, component: ConfiguracionComponent, canActivate: [AuthGuardService]},
      {path: RUTA_ADMIN_COPIAS_SEGURIDAD, component: CopiasSeguridadComponent, canActivate: [AuthGuardService]},
      {path: RUTA_ADMIN_VER_PRUEBA + '/:id', component: VerPruebaComponent, canActivate: [AuthGuardService]},
      {path: RUTA_ADMIN_PREGUNTAS, component: PreguntasComponent, canActivate: [AuthGuardService]},
      {path: RUTA_ADMIN_VER_PREGUNTA + '/:id', component: VerPreguntaComponent, canActivate: [AuthGuardService]},
      {path: RUTA_ADMIN_USUARIO + '/:id', component: UsuarioComponent, canActivate: [AuthGuardService]},
      { path: '**', pathMatch: 'full', redirectTo: RUTA_ADMIN_ROLES }
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: RUTA_INICIO }
];

export const routingModule = RouterModule.forRoot(routes, {useHash: true});
