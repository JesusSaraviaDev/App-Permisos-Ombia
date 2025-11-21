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
import { UnidadOrganizacionalService } from '../services/unidad-organizacional.service';
import { UnidadOrganizacionalHttpService } from '../services/unidad-organizacional-http/unidad-organizacional-http.service';
import { UnidadOrganizacional } from '../models/unidad-organizacional.model';
import { UnidadOrganizacionalManagementComponent } from '../components/unidad-organizacional-management/unidad-organizacional-management.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    UnidadOrganizacionalManagementComponent,
  ],
  templateUrl: './unidades-organizacionales.component.html',
  providers: [
    UnidadOrganizacionalService,
    UnidadOrganizacionalHttpService,
    ConfirmationService,
  ],
})
export class UnidadesOrganizacionalesComponent implements OnInit {
  @ViewChild('unidadesTable') unidadesTable!: Table;

  private readonly unidadOrganizacionalService = inject(
    UnidadOrganizacionalService
  );
  private readonly destroyRef = inject(DestroyRef);

  public unidades = signal<UnidadOrganizacional[]>([]);
  public selectedUnidad = signal<UnidadOrganizacional | null>(null);
  public tableSearchTerm: string | undefined;
  public isLoading: Signal<boolean>;

  // Modal de gestión
  public isUnidadManagementModalVisible = signal<boolean>(false);

  constructor() {
    this.isLoading = this.unidadOrganizacionalService.isLoading;
  }

  ngOnInit(): void {
    this.getUnidades();
  }

  private getUnidades(): void {
    this.unidadOrganizacionalService
      .obtenerTodas()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (unidades: UnidadOrganizacional[]) =>
          this.unidades.set(unidades || []),
        error: (error) => console.error(error),
      });
  }

  public clearFilters(): void {
    this.unidadesTable.clear();
    this.tableSearchTerm = undefined;
  }

  public reloadUnidades(flag: boolean): void {
    if (flag) {
      this.unidades.set([]);
      this.getUnidades();
    }
  }

  public openCreateUnidadModal(): void {
    this.selectedUnidad.set(null);
    this.isUnidadManagementModalVisible.set(true);
  }
}
