import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Usuario } from '../../models/usuario.model';
import { Permiso } from '../../../permiso/models/permiso.model';
import { UsuarioForManipulationModel } from '../../models/usuario-for-manipulation.model';

const API_USUARIOS = `${environment.apiUrl}/Usuarios`;

@Injectable({ providedIn: 'root' })
export class UsuarioHttpService {
  private readonly http = inject(HttpClient);

  public getTodos(): Observable<Usuario[]> {
    return this.http
      .get<Usuario[]>(`${API_USUARIOS}/todos`)
      .pipe(catchError((err) => throwError(() => err)));
  }

  public getUsuarioById(id: number): Observable<Usuario> {
    return this.http
      .get<Usuario>(`${API_USUARIOS}/${id}`)
      .pipe(catchError((err) => throwError(() => err)));
  }

  public createUsuario(
    usuario: UsuarioForManipulationModel
  ): Observable<Usuario> {
    return this.http
      .post<Usuario>(`${API_USUARIOS}/crear`, usuario)
      .pipe(catchError((err) => throwError(() => err)));
  }

  public getPermisosUsuario(id: number): Observable<Permiso[]> {
    return this.http
      .get<Permiso[]>(`${API_USUARIOS}/${id}/permisos`)
      .pipe(catchError((err) => throwError(() => err)));
  }

  public actualizarUnidadUsuario(
    usuarioId: number,
    nuevaUnidadId: number
  ): Observable<Usuario> {
    // Pasar nuevaUnidadId como query param para mantener la firma simple
    return this.http
      .put<Usuario>(
        `${API_USUARIOS}/${usuarioId}/actualizar-unidad?nuevaUnidadId=${nuevaUnidadId}`,
        null
      )
      .pipe(catchError((err) => throwError(() => err)));
  }

  public updateUsuario(
    usuario: UsuarioForManipulationModel
  ): Observable<Usuario> {
    return this.http
      .put<Usuario>(`${API_USUARIOS}/${usuario.usuarioId}`, usuario)
      .pipe(catchError((err) => throwError(() => err)));
  }

  public disableUsuario(id: number): Observable<void> {
    return this.http
      .delete<void>(`${API_USUARIOS}/${id}`)
      .pipe(catchError((err) => throwError(() => err)));
  }
}
