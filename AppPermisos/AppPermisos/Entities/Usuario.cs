namespace AppPermisos.Models
{
    public class Usuario
    {
        /// <summary>
        /// Identificador único del usuario.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Nombres del usuario.
        /// </summary>
        public string Nombres { get; set; } = string.Empty;

        /// <summary>
        /// Apellidos del usuario.
        /// </summary>
        public string Apellidos { get; set; } = string.Empty;

        /// <summary>
        /// Tipo de sangre del usuario.
        /// </summary>
        public string TipoDeSangre { get; set; } = string.Empty;

        /// <summary>
        /// Identificador de la unidad organizacional a la que pertenece el usuario.
        /// </summary>
        public int UnidadOrganizacionalId { get; set; }

        /// <summary>
        /// Datos de la unidad organizacional a la que pertenece el usuario.
        /// </summary>
        public UnidadOrganizacional? UnidadOrganizacional { get; set; }

        /// <summary>
        /// Notificacion 
        /// </summary>
        public List<Notificacion> Notificaciones { get; set; } = new List<Notificacion>();
    }
}
