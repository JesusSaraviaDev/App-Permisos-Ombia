import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { UnidadOrganizacional } from '../../models/unidad-organizacional.model';

const API_UNIDADES = `${environment.apiUrl}/UnidadesOrganizacionales`;

@Injectable({ providedIn: 'root' })
export class UnidadOrganizacionalHttpService {
  private readonly http = inject(HttpClient);

  /**
   * Crea una nueva unidad organizacional.
   */
  public crearUnidad(
    unidad: UnidadOrganizacional
  ): Observable<UnidadOrganizacional> {
    return this.http
      .post<UnidadOrganizacional>(`${API_UNIDADES}/crear`, unidad)
      .pipe(catchError((err) => throwError(() => err)));
  }

  /**
   * Obtiene una unidad organizacional por su ID.
   */
  public obtenerUnidadPorId(id: number): Observable<UnidadOrganizacional> {
    return this.http
      .get<UnidadOrganizacional>(`${API_UNIDADES}/${id}`)
      .pipe(catchError((err) => throwError(() => err)));
  }

  /**
   * Obtiene todas las unidades organizacionales.
   */
  public obtenerTodas(): Observable<UnidadOrganizacional[]> {
    return this.http
      .get<UnidadOrganizacional[]>(`${API_UNIDADES}/todas`)
      .pipe(catchError((err) => throwError(() => err)));
  }

  /**
   * Obtiene todas las unidades hijas de una unidad específica.
   */
  public obtenerHijas(id: number): Observable<UnidadOrganizacional[]> {
    return this.http
      .get<UnidadOrganizacional[]>(`${API_UNIDADES}/${id}/hijas`)
      .pipe(catchError((err) => throwError(() => err)));
  }
}
