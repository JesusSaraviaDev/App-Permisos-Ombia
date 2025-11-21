import {
  Component,
  inject,
  input,
  model,
  OnChanges,
  output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioHttpService } from '../../services/usuario-services-http/usuario-http.service';
import { Usuario } from '../../models/usuario.model';
import { UnidadOrganizacionalAutocompleteComponent } from '../../../unidad-organizacional/components/unidad-organizacional-autocomplete/unidad-organizacional-autocomplete.component';

@Component({
  selector: 'app-cambiar-unidad-usuario',
  templateUrl: './cambiar-unidad-usuario.component.html',
  styleUrls: ['./cambiar-unidad-usuario.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    UnidadOrganizacionalAutocompleteComponent,
  ],
  providers: [UsuarioService, UsuarioHttpService],
})
export class CambiarUnidadUsuarioComponent implements OnChanges {
  /**
   ** Inputs y Outputs (usando model para two-way binding):
   */
  visible = model.required<boolean>();
  selectedUsuario = input.required<Usuario | null>();
  reloadUsuarios = output<boolean>();

  /**
   ** Propiedades e inyección de servicios:
   */
  private readonly formBuilder = inject(FormBuilder);
  private readonly usuarioService = inject(UsuarioService);

  public cambiarUnidadForm!: FormGroup;
  public isChanging = signal<boolean>(false);

  constructor() {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && this.visible()) {
      this.resetForm();
    }
  }

  /**
   * Inicializa el formulario con los controles necesarios
   */
  private initializeForm(): void {
    this.cambiarUnidadForm = this.formBuilder.group({
      unidadOrganizacionalId: new FormControl(null, [Validators.required]),
    });
  }

  /**
   * Resetea el formulario a su estado inicial
   */
  private resetForm(): void {
    this.cambiarUnidadForm.reset({
      unidadOrganizacionalId: null,
    });
    this.cambiarUnidadForm.markAsUntouched();
    this.cambiarUnidadForm.markAsPristine();
  }

  /**
   * Cierra el modal
   */
  public closeModal(): void {
    this.visible.set(false);
    this.resetForm();
    this.reloadUsuarios.emit(true);
  }

  /**
   * Cambia la unidad del usuario
   */
  public cambiarUnidad(): void {
    if (this.cambiarUnidadForm.invalid || !this.selectedUsuario()) {
      this.cambiarUnidadForm.markAllAsTouched();
      return;
    }

    this.isChanging.set(true);

    const formValue = this.cambiarUnidadForm.value;
    const usuarioId = this.selectedUsuario()!.id;

    // Extraer el ID de la unidad organizacional si es un objeto
    const nuevaUnidadId =
      formValue.unidadOrganizacionalId?.id || formValue.unidadOrganizacionalId;

    this.usuarioService
      .actualizarUnidadUsuario(usuarioId, nuevaUnidadId)
      .subscribe({
        next: () => {
          this.isChanging.set(false);
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al cambiar unidad del usuario:', error);
          this.isChanging.set(false);
        },
      });
  }

  /**
   * Getter para acceder fácilmente a los controles del formulario
   */
  get f() {
    return this.cambiarUnidadForm.controls;
  }
}
