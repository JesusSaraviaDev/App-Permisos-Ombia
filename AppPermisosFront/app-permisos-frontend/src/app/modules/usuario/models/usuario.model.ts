import { UnidadOrganizacional } from '../../unidad-organizacional/models/unidad-organizacional.model';
import { Notificacion } from '../../shared/models/notificacion.model';

export interface Usuario {
  id: number;
  nombres: string;
  apellidos: string;
  tipoDeSangre: string;
  unidadOrganizacionalId: number;
  unidadOrganizacional?: UnidadOrganizacional | null;
  notificaciones?: Notificacion[];
}
