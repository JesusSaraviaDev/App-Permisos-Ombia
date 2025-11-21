import {
  Component,
  DestroyRef,
  inject,
  input,
  model,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioHttpService } from '../../services/usuario-services-http/usuario-http.service';
import { Usuario } from '../../models/usuario.model';
import { Permiso } from '../../../permiso/models/permiso.model';

@Component({
  selector: 'app-permisos-usuario',
  templateUrl: './permisos-usuario.component.html',
  styleUrls: ['./permisos-usuario.component.css'],
  imports: [CommonModule, DialogModule, ButtonModule, TableModule],
  providers: [UsuarioService, UsuarioHttpService],
})
export class PermisosUsuarioComponent implements OnChanges {
  /**
   ** Inputs y Outputs (usando model para two-way binding):
   */
  visible = model.required<boolean>();
  selectedUsuario = input.required<Usuario | null>();

  /**
   ** Propiedades e inyección de servicios:
   */
  private readonly usuarioService = inject(UsuarioService);
  private readonly destroyRef = inject(DestroyRef);

  public permisos = signal<Permiso[]>([]);
  public isLoading = signal<boolean>(false);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && this.visible() && this.selectedUsuario()) {
      this.loadPermisos();
    }
  }

  /**
   * Carga los permisos del usuario seleccionado
   */
  private loadPermisos(): void {
    const usuario = this.selectedUsuario();
    if (!usuario) {
      return;
    }

    this.isLoading.set(true);
    this.usuarioService
      .getPermisosUsuario(usuario.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (permisos: Permiso[]) => {
          this.permisos.set(permisos || []);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error al cargar permisos del usuario:', error);
          this.permisos.set([]);
          this.isLoading.set(false);
        },
      });
  }

  /**
   * Cierra el modal
   */
  public closeModal(): void {
    this.visible.set(false);
    this.permisos.set([]);
  }
}
