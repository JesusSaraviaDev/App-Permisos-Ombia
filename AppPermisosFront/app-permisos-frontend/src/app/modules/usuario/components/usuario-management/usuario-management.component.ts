import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  input,
  model,
  OnChanges,
  OnInit,
  output,
  Signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { Usuario } from '../../models/usuario.model';
import { UsuarioForManipulationModel } from '../../models/usuario-for-manipulation.model';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioHttpService } from '../../services/usuario-services-http/usuario-http.service';
import { UnidadOrganizacional } from '../../../unidad-organizacional/models/unidad-organizacional.model';
import { UnidadOrganizacionalAutocompleteComponent } from '../../../unidad-organizacional/components/unidad-organizacional-autocomplete/unidad-organizacional-autocomplete.component';

export enum ModalType {
  SIN_SELECCIONAR = 0,
  CREAR = 1,
  ACTUALIZAR = 2,
  VISUALIZAR = 3,
  ELIMINAR = 4,
}

@Component({
  selector: 'app-usuario-management',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    ConfirmDialogModule,
    DropdownModule,
    UnidadOrganizacionalAutocompleteComponent,
  ],
  templateUrl: './usuario-management.component.html',
  styleUrls: ['./usuario-management.component.css'],
  providers: [ConfirmationService, UsuarioService, UsuarioHttpService],
})
export class UsuarioManagementComponent implements OnInit, OnChanges {
  /**
   ** Inputs y Outputs:
   */
  isUsuarioManagementModalVisible = model.required<boolean>();
  usuarioManagementModalFormType = model.required<ModalType>();
  selectedUsuario = input.required<Usuario | null>();
  reloadUsuarios = output<boolean>();

  /**
   ** Propiedades e inyección de servicios:
   */
  private readonly fb = inject(FormBuilder);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly usuarioService = inject(UsuarioService);
  private readonly destroyRef = inject(DestroyRef);

  public isLoadingUsuarioService: Signal<boolean>;
  public modalFormTypes = ModalType;
  public usuarioForm!: FormGroup;
  public unidadesOrganizacionales: UnidadOrganizacional[] = [];

  constructor() {
    this.initForm();
    this.isLoadingUsuarioService = this.usuarioService.isLoading;
  }

  /**
   * Inicializa el formulario del usuario.
   */
  private initForm(): void {
    this.usuarioForm = this.fb.group({
      nombres: new FormControl<string | null>(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ]),
      apellidos: new FormControl<string | null>(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ]),
      tipoDeSangre: new FormControl<string | null>(null, [Validators.required]),
      unidadOrganizacionalId: new FormControl<number | null>(null, [
        Validators.required,
      ]),
    });
  }

  ngOnInit(): void {
    // Aquí podrías cargar las unidades organizacionales disponibles
    // this.loadUnidadesOrganizacionales();
  }

  ngOnChanges(): void {
    if (!this.isUsuarioManagementModalVisible()) {
      return;
    }

    const modalFormTypeValue = this.usuarioManagementModalFormType();
    const selectedUsuarioValue = this.selectedUsuario();

    this.clearDialog();

    this.updateFormState(modalFormTypeValue);

    if (!this.isUsuarioSelectionValid(selectedUsuarioValue)) {
      this.clearDialog();
      return;
    }

    this.getUsuarioById(selectedUsuarioValue.id);
  }

  /**
   * Método para cerrar este modal.
   */
  public closeUsuarioManagement(): void {
    this.reloadUsuarios.emit(true);
    this.clearDialog();
    this.isUsuarioManagementModalVisible.set(false);
  }

  /**
   * Limpia el formulario.
   */
  private clearDialog(): void {
    if (this.usuarioForm) {
      this.usuarioForm.reset();
    }
  }

  handleDialogClose(): void {
    this.clearDialog();
  }

  /**
   * Actualiza el estado del formulario basado en el tipo de formulario del modal.
   */
  private updateFormState(modalFormTypeValue: ModalType): void {
    if (modalFormTypeValue === ModalType.CREAR) {
      this.usuarioForm.enable();
    }
    if (modalFormTypeValue === ModalType.ACTUALIZAR) {
      this.usuarioForm.enable();
    }
    if (
      modalFormTypeValue === ModalType.VISUALIZAR ||
      modalFormTypeValue === ModalType.ELIMINAR
    ) {
      this.usuarioForm.disable();
    }
  }

  /**
   * Método de tipo (type guard) para validar si el objeto usuario seleccionado es válido.
   */
  private isUsuarioSelectionValid(
    selectedUsuarioValue: Usuario | null
  ): selectedUsuarioValue is Usuario {
    return (
      selectedUsuarioValue !== null &&
      typeof selectedUsuarioValue.id === 'number' &&
      !isNaN(selectedUsuarioValue.id)
    );
  }

  /**
   * Método para crear, actualizar o eliminar un usuario.
   */
  public submit(): void {
    if (
      this.usuarioManagementModalFormType() !== this.modalFormTypes.VISUALIZAR
    ) {
      if (this.usuarioManagementModalFormType() === this.modalFormTypes.CREAR) {
        this.createUsuario();
        return;
      }
      if (
        this.selectedUsuario() &&
        this.usuarioManagementModalFormType() === this.modalFormTypes.ACTUALIZAR
      ) {
        this.updateUsuario();
        return;
      }
      if (
        this.selectedUsuario() &&
        this.usuarioManagementModalFormType() === this.modalFormTypes.ELIMINAR
      ) {
        this.disableUsuario();
        return;
      }
    }
  }

  /**
   * Método para acceder más rápido a las propiedades del formulario.
   */
  public get usuarioFormControls() {
    return this.usuarioForm.controls;
  }

  /**
   * Método para crear un nuevo usuario.
   */
  public createUsuario(): void {
    if (this.usuarioForm.invalid) {
      this.showError('Por favor, complete el formulario correctamente');
      return;
    }

    this.confirmationService.confirm({
      message: '¿Está seguro de que desea crear este usuario?',
      header: 'CONFIRMACIÓN',
      icon: 'pi pi-exclamation-triangle',
      key: 'confirmUsuarioDialog',
      accept: () => {
        const unidadOrganizacionalId = this.usuarioForm.get(
          'unidadOrganizacionalId'
        )?.value;

        const usuario: UsuarioForManipulationModel = {
          usuarioId: 0,
          nombres: this.usuarioForm.get('nombres')?.value,
          apellidos: this.usuarioForm.get('apellidos')?.value,
          tipoDeSangre: this.usuarioForm.get('tipoDeSangre')?.value,
          unidadOrganizacionalId: unidadOrganizacionalId?.id,
        };

        this.usuarioService
          .createUsuario(usuario)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.showSuccess('Usuario creado correctamente');
              this.closeUsuarioManagement();
            },
            error: (error) => {
              this.handleError(error);
            },
          });
      },
      reject: () => {
        this.showInfo('Operación cancelada');
      },
    });
  }

  /**
   * Método que se encarga de actualizar un usuario.
   */
  public updateUsuario(): void {
    if (this.usuarioForm.invalid) {
      this.showError('Por favor, complete el formulario correctamente');
      return;
    }

    this.confirmationService.confirm({
      message: '¿Está seguro de que desea actualizar este usuario?',
      header: 'CONFIRMACIÓN',
      icon: 'pi pi-exclamation-triangle',
      key: 'confirmUsuarioDialog',
      accept: () => {
        const unidadOrganizacionalId = this.usuarioForm.get(
          'unidadOrganizacionalId'
        )?.value;
        const usuario: UsuarioForManipulationModel = {
          usuarioId: this.selectedUsuario()!.id,
          nombres: this.usuarioForm.get('nombres')?.value,
          apellidos: this.usuarioForm.get('apellidos')?.value,
          tipoDeSangre: this.usuarioForm.get('tipoDeSangre')?.value,
          unidadOrganizacionalId: unidadOrganizacionalId?.id,
        };

        this.usuarioService
          .updateUsuario(usuario)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.showSuccess('Usuario actualizado correctamente');
              this.closeUsuarioManagement();
            },
            error: (error) => {
              this.handleError(error);
            },
          });
      },
      reject: () => {
        this.showInfo('Operación cancelada');
      },
    });
  }

  /**
   * Método para deshabilitar un usuario.
   */
  public disableUsuario(): void {
    if (!this.selectedUsuario()) {
      this.showError('No se ha seleccionado un usuario');
      return;
    }

    this.confirmationService.confirm({
      message: '¿Está seguro de que desea deshabilitar este usuario?',
      header: 'CONFIRMACIÓN',
      icon: 'pi pi-exclamation-triangle',
      key: 'confirmUsuarioDialog',
      accept: () => {
        this.usuarioService
          .disableUsuario(this.selectedUsuario()!.id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.showSuccess('Usuario deshabilitado correctamente');
              this.closeUsuarioManagement();
            },
            error: (error) => {
              this.handleError(error);
            },
          });
      },
      reject: () => {
        this.showInfo('Operación cancelada');
      },
    });
  }

  /**
   * Método que obtiene un usuario por su id
   */
  public getUsuarioById(id: number): void {
    this.usuarioService
      .getUsuarioById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (usuario: Usuario) => {
          this.handleUsuarioResponse(usuario);
        },
        error: (error) => {
          this.handleError(error);
        },
      });
  }

  /**
   * Maneja la respuesta de la solicitud del usuario.
   */
  private handleUsuarioResponse(usuario: Usuario): void {
    if (!usuario) {
      this.showErrorAndClose('No se encontró el usuario solicitado');
      return;
    }
    this.populateUsuarioForm(usuario);
  }

  /**
   * Muestra un mensaje de error y cierra el modal de gestión de usuario.
   */
  private showErrorAndClose(message: string): void {
    this.showError(message);
    this.closeUsuarioManagement();
  }

  /**
   * Llena el formulario del usuario con los datos proporcionados.
   */
  private populateUsuarioForm(usuario: Usuario): void {
    this.usuarioForm.patchValue({
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      tipoDeSangre: usuario.tipoDeSangre,
      unidadOrganizacionalId: usuario.unidadOrganizacional?.id,
    });
  }

  // Métodos helper para mostrar mensajes
  private showSuccess(message: string): void {
    console.log('✓ ' + message);
    // Implementar con MessageToastService cuando esté disponible
  }

  private showError(message: string): void {
    console.error('✗ ' + message);
    // Implementar con MessageToastService cuando esté disponible
  }

  private showInfo(message: string): void {
    console.info('ℹ ' + message);
    // Implementar con MessageToastService cuando esté disponible
  }

  private handleError(error: any): void {
    console.error('Error:', error);
    this.showError(error?.message || 'Ha ocurrido un error');
    // Implementar con ErrorHandlingService cuando esté disponible
  }
}
