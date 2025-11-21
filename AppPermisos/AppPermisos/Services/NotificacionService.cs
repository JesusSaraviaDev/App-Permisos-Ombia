using AppPermisos.Contracts;
using AppPermisos.Models;
using AppPermisos.Service.Contracts;

namespace AppPermisos.Service
{
    /// <summary>
    /// Servicio encargado de la lógica de negocio relacionada
    /// con la creación, consulta y actualización de notificaciones.
    /// </summary>
    public class NotificacionService : INotificacionService
    {
        private readonly INotificacionRepository _repository;

        /// <summary>
        /// Constructor que recibe el repositorio de notificaciones.
        /// </summary>
        /// <param name="repository">Repositorio encargado del acceso a datos de notificaciones.</param>
        public NotificacionService(INotificacionRepository repository)
        {
            _repository = repository;
        }

        /// <summary>
        /// Crea una nueva notificación para un usuario.
        /// </summary>
        /// <param name="usuarioId">Identificador del usuario que recibirá la notificación.</param>
        /// <param name="mensaje">Contenido de la notificación.</param>
        /// <returns>La notificación creada.</returns>
        public async Task<Notificacion> CrearNotificacionAsync(int usuarioId, string mensaje)
        {
            var notificacion = new Notificacion
            {
                UsuarioId = usuarioId,
                Mensaje = mensaje,
                FechaCreacion = DateTime.UtcNow,
                Leida = false
            };

            return await _repository.CrearNotificacionAsync(notificacion);
        }

        /// <summary>
        /// Obtiene todas las notificaciones registradas para un usuario.
        /// </summary>
        /// <param name="usuarioId">Identificador del usuario.</param>
        /// <returns>Lista de notificaciones del usuario.</returns>
        public Task<List<Notificacion>> ObtenerNotificacionesUsuarioAsync(int usuarioId)
        {
            return _repository.ObtenerPorUsuarioAsync(usuarioId);
        }

        /// <summary>
        /// Marca una notificación como leída.
        /// </summary>
        /// <param name="notificacionId">Identificador de la notificación que se actualizará.</param>
        public Task MarcarComoLeidaAsync(int notificacionId)
        {
            return _repository.MarcarComoLeidaAsync(notificacionId);
        }
    }
}
