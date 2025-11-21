import {
  Component,
  inject,
  input,
  model,
  OnChanges,
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
import { PermisoService } from '../../services/permiso.service';
import { PermisoHttpService } from '../../services/permiso-http/permiso-http.service';
import { Permiso } from '../../models/permiso.model';
import { UnidadOrganizacionalAutocompleteComponent } from '../../../unidad-organizacional/components/unidad-organizacional-autocomplete/unidad-organizacional-autocomplete.component';

@Component({
  selector: 'app-asignar-permiso',
  templateUrl: './asignar-permiso.component.html',
  styleUrls: ['./asignar-permiso.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    UnidadOrganizacionalAutocompleteComponent,
  ],
  providers: [PermisoService, PermisoHttpService],
})
export class AsignarPermisoComponent implements OnChanges {
  /**
   ** Inputs y Outputs (usando model para two-way binding):
   */
  visible = model.required<boolean>();
  selectedPermiso = input.required<Permiso | null>();

  /**
   ** Propiedades e inyección de servicios:
   */
  private readonly formBuilder = inject(FormBuilder);
  private readonly permisoService = inject(PermisoService);

  public asignarForm!: FormGroup;
  public isAssigning = signal<boolean>(false);

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
    this.asignarForm = this.formBuilder.group({
      unidadOrganizacionalId: new FormControl(null, [Validators.required]),
    });
  }

  /**
   * Resetea el formulario a su estado inicial
   */
  private resetForm(): void {
    this.asignarForm.reset({
      unidadOrganizacionalId: null,
    });
    this.asignarForm.markAsUntouched();
    this.asignarForm.markAsPristine();
  }

  /**
   * Cierra el modal
   */
  public closeModal(): void {
    this.visible.set(false);
    this.resetForm();
  }

  /**
   * Asigna el permiso a la unidad organizacional seleccionada
   */
  public asignarPermiso(): void {
    if (this.asignarForm.invalid || !this.selectedPermiso()) {
      this.asignarForm.markAllAsTouched();
      return;
    }

    this.isAssigning.set(true);

    const formValue = this.asignarForm.value;
    const permisoId = this.selectedPermiso()!.id;

    // Extraer el ID de la unidad organizacional si es un objeto
    const unidadId =
      formValue.unidadOrganizacionalId?.id || formValue.unidadOrganizacionalId;

    this.permisoService.asignarPermisoAUnidad(unidadId, permisoId).subscribe({
      next: (response) => {
        console.log('Permiso asignado correctamente:', response);
        this.isAssigning.set(false);
        this.closeModal();
      },
      error: (error) => {
        console.error('Error al asignar permiso:', error);
        this.isAssigning.set(false);
      },
    });
  }

  /**
   * Getter para acceder fácilmente a los controles del formulario
   */
  get f() {
    return this.asignarForm.controls;
  }
}
