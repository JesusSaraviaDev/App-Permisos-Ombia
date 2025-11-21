namespace AppPermisos.Models
{
    public class UnidadOrganizacional
    {
        /// <summary>
        /// Identificador único de la unidad organizacional.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Nombre de la unidad organizacional.
        /// </summary>
        public string Nombre { get; set; } = string.Empty;

        /// <summary>
        /// Tipo de unidad organizacional.  (Departamento, Subdepartamento, Equipo...)
        /// </summary>
        public string Tipo { get; set; } = string.Empty;

        /// <summary>
        /// Id de la unidad padre.
        /// </summary>
        public int? UnidadPadreId { get; set; }

        /// <summary>
        /// DAtos de la unidad padre.
        /// </summary>
        public UnidadOrganizacional? UnidadPadre { get; set; }

        /// <summary>
        /// Lista de unidades hijas.
        /// </summary>
        public ICollection<UnidadOrganizacional>? Hijos { get; set; }
    }
}
