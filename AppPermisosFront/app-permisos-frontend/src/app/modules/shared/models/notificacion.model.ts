import type { Usuario } from '../../usuario/models/usuario.model';

export interface Notificacion {
  id: number;
  usuarioId: number;
  usuario?: Usuario | null;
  mensaje: string;
  fechaCreacion: string; // ISO 8601
  leida: boolean;
}
