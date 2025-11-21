export interface UnidadOrganizacional {
  id: number;
  nombre: string;
  tipo: string;
  unidadPadreId?: number | null;
  unidadPadre?: UnidadOrganizacional | null;
  hijos?: UnidadOrganizacional[] | null;
  descripcion?: string;
}
