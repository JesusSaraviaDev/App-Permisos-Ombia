import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { PermisoHttpService } from './permiso-http/permiso-http.service';
import { Permiso } from '../models/permiso.model';

@Injectable({ providedIn: 'root' })
export class PermisoService {
  private readonly permisoHttpService = inject(PermisoHttpService);
  private readonly _isLoading = signal<boolean>(false);

  public readonly isLoading = this._isLoading.asReadonly();

  /**
   * Crea un nuevo permiso.
   */
  public crearPermiso(permiso: Permiso): Observable<Permiso> {
    this._isLoading.set(true);
    return this.permisoHttpService.crearPermiso(permiso).pipe(
      catchError((error) => {
        console.error('Error al crear permiso:', error);
        return throwError(() => error);
      }),
      finalize(() => this._isLoading.set(false))
    );
  }

  /**
   * Obtiene todos los permisos registrados en el sistema.
   */
  public obtenerTodos(): Observable<Permiso[]> {
    this._isLoading.set(true);
    return this.permisoHttpService.obtenerTodos().pipe(
      catchError((error) => {
        console.error('Error al obtener permisos:', error);
        return throwError(() => error);
      }),
      finalize(() => this._isLoading.set(false))
    );
  }

  /**
   * Asigna un permiso a una unidad organizacional.
   */
  public asignarPermisoAUnidad(
    unidadId: number,
    permisoId: number
  ): Observable<string> {
    this._isLoading.set(true);
    return this.permisoHttpService
      .asignarPermisoAUnidad(unidadId, permisoId)
      .pipe(finalize(() => this._isLoading.set(false)));
  }

  /**
   * Obtiene los permisos asignados directamente a una unidad organizacional.
   */
  public obtenerPermisosPorUnidad(unidadId: number): Observable<Permiso[]> {
    this._isLoading.set(true);
    return this.permisoHttpService.obtenerPermisosPorUnidad(unidadId).pipe(
      catchError((error) => {
        console.error('Error al obtener permisos por unidad:', error);
        return throwError(() => error);
      }),
      finalize(() => this._isLoading.set(false))
    );
  }
}
