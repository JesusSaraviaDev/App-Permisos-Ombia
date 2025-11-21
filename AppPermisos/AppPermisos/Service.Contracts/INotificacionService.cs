using AppPermisos.Models;

namespace AppPermisos.Service.Contracts
{
    /// <summary>
    /// Define las operaciones de lógica de negocio relacionadas
    /// con la gestión y consulta de notificaciones para los usuarios.
    /// </summary>
    public interface INotificacionService
    {
        /// <summary>
        /// Crea una nueva notificación dirigida a un usuario específico.
        /// </summary>
        /// <param name="usuarioId">Identificador del usuario al que se enviará la notificación.</param>
        /// <param name="mensaje">Mensaje de la notificación.</param>
        /// <returns>La notificación creada exitosamente.</returns>
        Task<Notificacion> CrearNotificacionAsync(int usuarioId, string mensaje);

        /// <summary>
        /// Obtiene todas las notificaciones asociadas a un usuario.
        /// Se devuelven ordenadas desde la más reciente a la más antigua.
        /// </summary>
        /// <param name="usuarioId">Identificador del usuario.</param>
        /// <returns>Lista de notificaciones del usuario.</returns>
        Task<List<Notificacion>> ObtenerNotificacionesUsuarioAsync(int usuarioId);

        /// <summary>
        /// Marca una notificación como leída.
        /// </summary>
        /// <param name="notificacionId">Identificador de la notificación a actualizar.</param>
        /// <returns>Tarea completada cuando la notificación haya sido marcada como leída.</returns>
        Task MarcarComoLeidaAsync(int notificacionId);
    }
}
