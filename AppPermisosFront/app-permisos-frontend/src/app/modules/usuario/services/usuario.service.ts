import { inject, Injectable, Signal, signal } from '@angular/core';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { UsuarioHttpService } from './usuario-services-http/usuario-http.service';
import { Usuario } from '../models/usuario.model';
import { Permiso } from '../../permiso/models/permiso.model';
import { UsuarioForManipulationModel } from '../models/usuario-for-manipulation.model';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private readonly usuarioHttp = inject(UsuarioHttpService);

  private readonly _isLoading = signal<boolean>(false);

  public get isLoading(): Signal<boolean> {
    return this._isLoading.asReadonly();
  }

  public getTodos(): Observable<Usuario[]> {
    this._isLoading.set(true);
    return this.usuarioHttp.getTodos().pipe(
      catchError((err) => throwError(() => err)),
      finalize(() => this._isLoading.set(false))
    );
  }

  public getUsuarioById(id: number): Observable<Usuario> {
    this._isLoading.set(true);
    return this.usuarioHttp.getUsuarioById(id).pipe(
      catchError((err) => throwError(() => err)),
      finalize(() => this._isLoading.set(false))
    );
  }

  public createUsuario(
    usuario: UsuarioForManipulationModel
  ): Observable<Usuario> {
    this._isLoading.set(true);
    return this.usuarioHttp.createUsuario(usuario).pipe(
      catchError((err) => throwError(() => err)),
      finalize(() => this._isLoading.set(false))
    );
  }

  public getPermisosUsuario(id: number): Observable<Permiso[]> {
    this._isLoading.set(true);
    return this.usuarioHttp.getPermisosUsuario(id).pipe(
      catchError((err) => throwError(() => err)),
      finalize(() => this._isLoading.set(false))
    );
  }

  public actualizarUnidadUsuario(
    usuarioId: number,
    nuevaUnidadId: number
  ): Observable<Usuario> {
    this._isLoading.set(true);
    return this.usuarioHttp
      .actualizarUnidadUsuario(usuarioId, nuevaUnidadId)
      .pipe(
        catchError((err) => throwError(() => err)),
        finalize(() => this._isLoading.set(false))
      );
  }

  public updateUsuario(
    usuario: UsuarioForManipulationModel
  ): Observable<Usuario> {
    this._isLoading.set(true);
    return this.usuarioHttp.updateUsuario(usuario).pipe(
      catchError((err) => throwError(() => err)),
      finalize(() => this._isLoading.set(false))
    );
  }

  public disableUsuario(id: number): Observable<void> {
    this._isLoading.set(true);
    return this.usuarioHttp.disableUsuario(id).pipe(
      catchError((err) => throwError(() => err)),
      finalize(() => this._isLoading.set(false))
    );
  }
}
