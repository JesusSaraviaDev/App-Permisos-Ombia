import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Permiso } from '../../models/permiso.model';

const API_PERMISOS = `${environment.apiUrl}/Permisos`;

@Injectable({ providedIn: 'root' })
export class PermisoHttpService {
  private readonly http = inject(HttpClient);

  /**
   * Crea un nuevo permiso.
   */
  public crearPermiso(permiso: Permiso): Observable<Permiso> {
    return this.http
      .post<Permiso>(`${API_PERMISOS}/crear`, permiso)
      .pipe(catchError((err) => throwError(() => err)));
  }

  /**
   * Obtiene todos los permisos registrados en el sistema.
   */
  public obtenerTodos(): Observable<Permiso[]> {
    return this.http
      .get<Permiso[]>(`${API_PERMISOS}/todos`)
      .pipe(catchError((err) => throwError(() => err)));
  }

  /**
   * Asigna un permiso a una unidad organizacional.
   */
  public asignarPermisoAUnidad(
    unidadId: number,
    permisoId: number
  ): Observable<string> {
    return this.http
      .post(
        `${API_PERMISOS}/asignar?unidadId=${unidadId}&permisoId=${permisoId}`,
        null,
        { responseType: 'text' }
      )
      .pipe(catchError((err) => throwError(() => err)));
  }

  /**
   * Obtiene los permisos asignados directamente a una unidad organizacional.
   */
  public obtenerPermisosPorUnidad(unidadId: number): Observable<Permiso[]> {
    return this.http
      .get<Permiso[]>(`${API_PERMISOS}/${unidadId}/permisos`)
      .pipe(catchError((err) => throwError(() => err)));
  }
}
