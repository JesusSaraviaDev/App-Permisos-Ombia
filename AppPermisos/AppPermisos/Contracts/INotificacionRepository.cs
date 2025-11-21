using AppPermisos.Models;

namespace AppPermisos.Contracts
{
    /// <summary>
    /// Define las operaciones de acceso a datos relacionadas
    /// con las notificaciones enviadas a los usuarios.
    /// </summary>
    public interface INotificacionRepository
    {
        /// <summary>
        /// Crea una nueva notificación.
        /// </summary>
        /// <param name="notificacion">Entidad de la notificación.</param>
        Task<Notificacion> CrearNotificacionAsync(Notificacion notificacion);

        /// <summary>
        /// Obtiene todas las notificaciones de un usuario.
        /// </summary>
        /// <param name="usuarioId">Identificador del usuario.</param>
        Task<List<Notificacion>> ObtenerPorUsuarioAsync(int usuarioId);

        /// <summary>
        /// Marca una notificación como leída.
        /// </summary>
        /// <param name="id">Identificador de la notificación.</param>
        Task MarcarComoLeidaAsync(int id);
    }
}
