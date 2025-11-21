// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { UsuariosComponent } from './modules/usuario/pages/usuarios.component';
import { UnidadesOrganizacionalesComponent } from './modules/unidad-organizacional/pages/unidades-organizacionales.component';
import { PermisosComponent } from './modules/permiso/pages/permisos.component';

export const routes: Routes = [
  // ruta por defecto → redirige a /usuarios
  { path: '', redirectTo: 'usuarios', pathMatch: 'full' },

  // página de usuarios
  { path: 'usuarios', component: UsuariosComponent },

  // página de unidades organizacionales
  {
    path: 'unidades-organizacionales',
    component: UnidadesOrganizacionalesComponent,
  },

  // página de permisos
  { path: 'permisos', component: PermisosComponent },

  // wildcard opcional
  { path: '**', redirectTo: 'usuarios' },
];
