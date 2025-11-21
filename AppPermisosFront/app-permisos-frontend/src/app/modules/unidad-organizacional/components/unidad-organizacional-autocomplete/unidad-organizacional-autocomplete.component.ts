import { Component, inject, input, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoComplete, AutoCompleteModule } from 'primeng/autocomplete';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UnidadOrganizacionalService } from '../../services/unidad-organizacional.service';
import { UnidadOrganizacionalHttpService } from '../../services/unidad-organizacional-http/unidad-organizacional-http.service';
import { UnidadOrganizacional } from '../../models/unidad-organizacional.model';

@Component({
  selector: 'app-unidad-organizacional-autocomplete',
  templateUrl: './unidad-organizacional-autocomplete.component.html',
  styleUrls: ['./unidad-organizacional-autocomplete.component.css'],
  imports: [CommonModule, ReactiveFormsModule, AutoCompleteModule],
  providers: [UnidadOrganizacionalService, UnidadOrganizacionalHttpService],
})
export class UnidadOrganizacionalAutocompleteComponent {
  /**
   * viewChilds
   */
  vcAutoCompleteUnidadOrganizacional = viewChild<AutoComplete>(
    'vcAutoCompleteUnidadOrganizacional'
  );

  /**
   ** Inputs:
   */

  placeholder = input<string>('Buscar unidad organizacional'); // Placeholder del autocomplete
  disabled = input<boolean>(false); // Estado deshabilitado
  formGroup = input.required<FormGroup>(); // El formGroup se recibe desde el padre
  controlName = input.required<string>(); // Nombre del control dentro del formGroup

  /**
   ** Propiedades e inyección de servicios:
   */

  private readonly unidadOrganizacionalService = inject(
    UnidadOrganizacionalService
  );
  public unidadesOrganizacionales = signal<UnidadOrganizacional[]>([]);

  /**
   ** Métodos privados y públicos:
   */

  /**
   * Obtiene el FormControl del formulario padre
   */
  get formControl() {
    return this.formGroup().get(this.controlName()) as any;
  }

  /**
   * Método para marcar el control asociado como tocado
   */
  markControlAsTouched(): void {
    const formGroup = this.formGroup(); // Obtiene el valor actual del signal
    if (formGroup) {
      const control = formGroup.get(this.controlName());
      if (control) {
        control.markAsTouched();
      }
    }
  }

  /**
   * Método para buscar unidades organizacionales basándose en el término de búsqueda.
   * @param event Contiene el término de búsqueda ingresado.
   */
  search(event: any): void {
    this.unidadOrganizacionalService.obtenerTodas().subscribe({
      next: (unidades: UnidadOrganizacional[]) => {
        // Filtrar unidades organizacionales por el término de búsqueda
        const searchTerm = event.query.toLowerCase();
        const filtered = unidades.filter(
          (unidad) =>
            unidad.nombre.toLowerCase().includes(searchTerm) ||
            unidad.tipo?.toLowerCase().includes(searchTerm)
        );
        this.unidadesOrganizacionales.set(filtered);
      },
      error: (error) => {
        console.error('Error al buscar unidades organizacionales:', error);
        this.unidadesOrganizacionales.set([]);
      },
    });
  }
}
