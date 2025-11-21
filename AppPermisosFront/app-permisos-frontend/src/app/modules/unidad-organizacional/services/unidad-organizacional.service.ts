import { inject, Injectable, Signal, signal } from '@angular/core';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { UnidadOrganizacionalHttpService } from './unidad-organizacional-http/unidad-organizacional-http.service';
import { UnidadOrganizacional } from '../models/unidad-organizacional.model';

@Injectable({ providedIn: 'root' })
export class UnidadOrganizacionalService {
  private readonly unidadOrganizacionalHttp = inject(
    UnidadOrganizacionalHttpService
  );

  private readonly _isLoading = signal<boolean>(false);

  public get isLoading(): Signal<boolean> {
    return this._isLoading.asReadonly();
  }

  /**
   * Crea una nueva unidad organizacional.
   */
  public crearUnidad(
    unidad: UnidadOrganizacional
  ): Observable<UnidadOrganizacional> {
    this._isLoading.set(true);
    return this.unidadOrganizacionalHttp.crearUnidad(unidad).pipe(
      catchError((err) => throwError(() => err)),
      finalize(() => this._isLoading.set(false))
    );
  }

  /**
   * Obtiene una unidad organizacional por su ID.
   */
  public obtenerUnidadPorId(id: number): Observable<UnidadOrganizacional> {
    this._isLoading.set(true);
    return this.unidadOrganizacionalHttp.obtenerUnidadPorId(id).pipe(
      catchError((err) => throwError(() => err)),
      finalize(() => this._isLoading.set(false))
    );
  }

  /**
   * Obtiene todas las unidades organizacionales.
   */
  public obtenerTodas(): Observable<UnidadOrganizacional[]> {
    this._isLoading.set(true);
    return this.unidadOrganizacionalHttp.obtenerTodas().pipe(
      catchError((err) => throwError(() => err)),
      finalize(() => this._isLoading.set(false))
    );
  }

  /**
   * Obtiene todas las unidades hijas de una unidad específica.
   */
  public obtenerHijas(id: number): Observable<UnidadOrganizacional[]> {
    this._isLoading.set(true);
    return this.unidadOrganizacionalHttp.obtenerHijas(id).pipe(
      catchError((err) => throwError(() => err)),
      finalize(() => this._isLoading.set(false))
    );
  }
}
