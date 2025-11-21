namespace AppPermisos.Models
{
    public class Notificacion
    {
        /// <summary>
        /// Identificador único de la notificación.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Identificador del usuario al que se le envía la notificación.
        /// </summary>
        public int UsuarioId { get; set; }

        /// <summary>
        /// Datos del usuario al que se le envía la notificación.
        /// </summary>
        public Usuario? Usuario { get; set; }

        /// <summary>
        /// Mensaje de la notificación.
        /// </summary>
        public string Mensaje { get; set; } = string.Empty;

        /// <summary>
        /// Fecha de creación de la notificación.
        /// </summary>
        public DateTime FechaCreacion { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// Indica si la notificación ha sido leída.
        /// </summary>
        public bool Leida { get; set; } = false;
    }
}
