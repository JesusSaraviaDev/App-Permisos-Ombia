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
import { PermisoService } from '../../services/permiso.service';
import { PermisoHttpService } from '../../services/permiso-http/permiso-http.service';
import { Permiso } from '../../models/permiso.model';

@Component({
  selector: 'app-permiso-management',
  templateUrl: './permiso-management.component.html',
  styleUrls: ['./permiso-management.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
  ],
  providers: [PermisoService, PermisoHttpService],
})
export class PermisoManagementComponent implements OnChanges {
  /**
   ** Inputs y Outputs (usando model para two-way binding):
   */
  visible = model.required<boolean>();

  /**
   ** Propiedades e inyección de servicios:
   */
  private readonly formBuilder = inject(FormBuilder);
  private readonly permisoService = inject(PermisoService);

  public permisoForm!: FormGroup;
  public isCreating = signal<boolean>(false);

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
    this.permisoForm = this.formBuilder.group({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
    });
  }

  /**
   * Resetea el formulario a su estado inicial
   */
  private resetForm(): void {
    this.permisoForm.reset({
      nombre: '',
    });
    this.permisoForm.markAsUntouched();
    this.permisoForm.markAsPristine();
  }

  /**
   * Cierra el modal
   */
  public closeModal(): void {
    this.visible.set(false);
    this.resetForm();
  }

  /**
   * Crea un nuevo permiso
   */
  public createPermiso(): void {
    if (this.permisoForm.invalid) {
      this.permisoForm.markAllAsTouched();
      return;
    }

    this.isCreating.set(true);

    const formValue = this.permisoForm.value;

    const nuevoPermiso: any = {
      nombre: formValue.nombre,
    };

    this.permisoService.crearPermiso(nuevoPermiso).subscribe({
      next: () => {
        this.isCreating.set(false);
        this.closeModal();
      },
      error: (error) => {
        console.error('Error al crear permiso:', error);
        this.isCreating.set(false);
      },
    });
  }

  /**
   * Getter para acceder fácilmente a los controles del formulario
   */
  get f() {
    return this.permisoForm.controls;
  }
}
