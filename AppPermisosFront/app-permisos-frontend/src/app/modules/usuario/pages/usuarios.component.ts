import {
  Component,
  DestroyRef,
  OnInit,
  Signal,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Table } from 'primeng/table';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioHttpService } from '../services/usuario-services-http/usuario-http.service';
import { Usuario } from '../models/usuario.model';
import {
  UsuarioManagementComponent,
  ModalType,
} from '../components/usuario-management/usuario-management.component';
import { CambiarUnidadUsuarioComponent } from '../components/cambiar-unidad-usuario/cambiar-unidad-usuario.component';
import { PermisosUsuarioComponent } from '../components/permisos-usuario/permisos-usuario.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    UsuarioManagementComponent,
    CambiarUnidadUsuarioComponent,
    PermisosUsuarioComponent,
  ],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [UsuarioService, UsuarioHttpService, ConfirmationService],
})
export class UsuariosComponent implements OnInit {
  @ViewChild('usuariosTable') usuariosTable!: Table;

  private readonly usuarioService = inject(UsuarioService);
  private readonly destroyRef = inject(DestroyRef);

  public usuarios = signal<Usuario[]>([]);
  public selectedUsuario = signal<Usuario | null>(null);
  public tableSearchTerm: string | undefined;
  public isLoading: Signal<boolean>;
  public actionButtons: MenuItem[] | undefined;

  // Modal de gestión
  public isUsuarioManagementModalVisible = signal<boolean>(false);
  public usuarioManagementModalFormType = signal<ModalType>(
    ModalType.SIN_SELECCIONAR
  );
  public modalFormTypes = ModalType;

  // Modal de cambiar unidad
  public isCambiarUnidadModalVisible = signal<boolean>(false);

  // Modal de permisos del usuario
  public isPermisosUsuarioModalVisible = signal<boolean>(false);

  constructor() {
    this.isLoading = this.usuarioService.isLoading;
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  private getUsuarios(): void {
    this.usuarioService
      .getTodos()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (usuarios: Usuario[]) => this.usuarios.set(usuarios || []),
        error: (error) => console.error(error),
      });
  }

  public clearFilters(): void {
    this.usuariosTable.clear();
    this.tableSearchTerm = undefined;
  }

  public reloadUsuarios(flag: boolean): void {
    if (flag) {
      this.usuarios.set([]);
      this.getUsuarios();
    }
  }

  public openCreateUsuarioModal(): void {
    this.selectedUsuario.set(null);
    this.usuarioManagementModalFormType.set(ModalType.CREAR);
    this.isUsuarioManagementModalVisible.set(true);
  }

  public openCambiarUnidadModal(usuario: Usuario): void {
    this.selectedUsuario.set(usuario);
    this.isCambiarUnidadModalVisible.set(true);
  }

  public openPermisosUsuarioModal(usuario: Usuario): void {
    this.selectedUsuario.set(usuario);
    this.isPermisosUsuarioModalVisible.set(true);
  }
}
