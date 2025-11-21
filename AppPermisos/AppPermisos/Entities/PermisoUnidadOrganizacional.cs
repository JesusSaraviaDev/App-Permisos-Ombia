namespace AppPermisos.Models
{
    public class PermisoUnidadOrganizacional
    {
        /// <summary>
        /// Identificador único de la relación entre permiso y unidad organizacional.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Identificador de la unidad organizacional.
        /// </summary>
        public int UnidadOrganizacionalId { get; set; }

        /// <summary>
        /// Datos de la unidad organizacional.
        /// </summary>
        public UnidadOrganizacional? UnidadOrganizacional { get; set; }

        /// <summary>
        /// Identificador del permiso.
        /// </summary>
        public int PermisoId { get; set; }

        /// <summary>
        /// Datos del permiso.
        /// </summary>
        public Permiso? Permiso { get; set; }
    }
}
