import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { UsuarioService } from './services/usuario.service';
import { UsuarioHttpService } from './services/usuario-services-http/usuario-http.service';

import { usuarioRoutes } from './usuario.routes';
import { UsuariosComponent } from './pages/usuarios.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(usuarioRoutes),
    UsuariosComponent,
  ],
  providers: [UsuarioService, UsuarioHttpService, ConfirmationService],
})
export class UsuarioModule {}
