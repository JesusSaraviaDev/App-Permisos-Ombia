import {
  Component,
  inject,
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
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { UnidadOrganizacionalService } from '../../services/unidad-organizacional.service';
import { UnidadOrganizacionalHttpService } from '../../services/unidad-organizacional-http/unidad-organizacional-http.service';
import { UnidadOrganizacional } from '../../models/unidad-organizacional.model';
import { UnidadOrganizacionalAutocompleteComponent } from '../unidad-organizacional-autocomplete/unidad-organizacional-autocomplete.component';

@Component({
  selector: 'app-unidad-organizacional-management',
  templateUrl: './unidad-organizacional-management.component.html',
  styleUrls: ['./unidad-organizacional-management.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    UnidadOrganizacionalAutocompleteComponent,
  ],
  providers: [UnidadOrganizacionalService, UnidadOrganizacionalHttpService],
})
export class UnidadOrganizacionalManagementComponent implements OnChanges {
  /**
   ** Inputs y Outputs (usando model para two-way binding):
   */
  visible = model.required<boolean>();

  /**
   ** Propiedades e inyección de servicios:
   */
  private readonly formBuilder = inject(FormBuilder);
  private readonly unidadOrganizacionalService = inject(
    UnidadOrganizacionalService
  );

  public unidadOrganizacionalForm!: FormGroup;
  public isCreating = signal<boolean>(false);

  // Opciones para el dropdown de tipo
  public tiposUnidad = [
    { label: 'Departamento', value: 'Departamento' },
    { label: 'Subdepartamento', value: 'Subdepartamento' },
    { label: 'Equipo', value: 'Equipo' },
  ];

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
    this.unidadOrganizacionalForm = this.formBuilder.group({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      tipo: new FormControl('', [Validators.required]),
      unidadPadreId: new FormControl(null), // Puede ser null
    });
  }

  /**
   * Resetea el formulario a su estado inicial
   */
  private resetForm(): void {
    this.unidadOrganizacionalForm.reset({
      nombre: '',
      tipo: '',
      unidadPadreId: null,
    });
    this.unidadOrganizacionalForm.markAsUntouched();
    this.unidadOrganizacionalForm.markAsPristine();
  }

  /**
   * Cierra el modal
   */
  public closeModal(): void {
    this.visible.set(false);
    this.resetForm();
  }

  /**
   * Crea una nueva unidad organizacional
   */
  public createUnidadOrganizacional(): void {
    if (this.unidadOrganizacionalForm.invalid) {
      this.unidadOrganizacionalForm.markAllAsTouched();
      return;
    }

    this.isCreating.set(true);

    const formValue = this.unidadOrganizacionalForm.value;

    // Extraer el ID de la unidad padre si es un objeto
    const unidadPadreId =
      formValue.unidadPadreId?.id || formValue.unidadPadreId || null;

    const nuevaUnidad: any = {
      nombre: formValue.nombre,
      tipo: formValue.tipo,
      unidadPadreId: unidadPadreId,
    };

    this.unidadOrganizacionalService.crearUnidad(nuevaUnidad).subscribe({
      next: () => {
        this.isCreating.set(false);
        this.closeModal();
      },
      error: (error) => {
        console.error('Error al crear unidad organizacional:', error);
        this.isCreating.set(false);
      },
    });
  }

  /**
   * Getter para acceder fácilmente a los controles del formulario
   */
  get f() {
    return this.unidadOrganizacionalForm.controls;
  }
}
