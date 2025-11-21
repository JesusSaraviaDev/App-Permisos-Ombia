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
import { Table, TableModule } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { PermisoService } from '../services/permiso.service';
import { PermisoHttpService } from '../services/permiso-http/permiso-http.service';
import { Permiso } from '../models/permiso.model';
import { PermisoManagementComponent } from '../components/permiso-management/permiso-management.component';
import { AsignarPermisoComponent } from '../components/asignar-permiso/asignar-permiso.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    PermisoManagementComponent,
    AsignarPermisoComponent,
  ],
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css'],
  providers: [PermisoService, PermisoHttpService, ConfirmationService],
})
export class PermisosComponent implements OnInit {
  @ViewChild('permisosTable') permisosTable!: Table;

  private readonly permisoService = inject(PermisoService);
  private readonly destroyRef = inject(DestroyRef);

  public permisos = signal<Permiso[]>([]);
  public selectedPermiso = signal<Permiso | null>(null);
  public tableSearchTerm: string | undefined;
  public isLoading: Signal<boolean>;

  // Modal de gestión
  public isPermisoManagementModalVisible = signal<boolean>(false);

  // Modal de asignar permiso
  public isAsignarPermisoModalVisible = signal<boolean>(false);

  constructor() {
    this.isLoading = this.permisoService.isLoading;
  }

  ngOnInit(): void {
    this.getPermisos();
  }

  private getPermisos(): void {
    this.permisoService
      .obtenerTodos()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (permisos: Permiso[]) => this.permisos.set(permisos || []),
        error: (error) => console.error(error),
      });
  }

  public clearFilters(): void {
    this.permisosTable.clear();
    this.tableSearchTerm = undefined;
  }

  public reloadPermisos(flag: boolean): void {
    if (flag) {
      this.permisos.set([]);
      this.getPermisos();
    }
  }

  public openCreatePermisoModal(): void {
    this.selectedPermiso.set(null);
    this.isPermisoManagementModalVisible.set(true);
  }

  public openAsignarPermisoModal(permiso: Permiso): void {
    this.selectedPermiso.set(permiso);
    this.isAsignarPermisoModalVisible.set(true);
  }
}
