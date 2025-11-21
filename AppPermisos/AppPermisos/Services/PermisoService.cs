using AppPermisos.Contracts;
using AppPermisos.Models;
using AppPermisos.Service.Contracts;

namespace AppPermisos.Service
{
    /// <summary>
    /// Servicio encargado de la lógica de negocio para la gestión
    /// de permisos dentro de la aplicación.
    /// </summary>
    public class PermisoService : IPermisoService
    {
        private readonly IPermisoRepository _repository;

        /// <summary>
        /// Constructor que recibe el repositorio de permisos.
        /// </summary>
        /// <param name="repository">Repositorio encargado del acceso a datos de permisos.</param>
        public PermisoService(IPermisoRepository repository)
        {
            _repository = repository;
        }

        /// <summary>
        /// Crea un nuevo permiso dentro del sistema.
        /// </summary>
        /// <param name="permiso">Entidad del permiso a crear.</param>
        /// <returns>El permiso creado exitosamente.</returns>
        public Task<Permiso> CrearPermisoAsync(Permiso permiso)
        {
            return _repository.CrearPermisoAsync(permiso);
        }

        /// <summary>
        /// Obtiene la lista completa de permisos registrados.
        /// </summary>
        /// <returns>Lista de permisos.</returns>
        public Task<List<Permiso>> ObtenerTodosAsync()
        {
            return _repository.ObtenerTodosAsync();
        }

        /// <summary>
        /// Asigna un permiso a una unidad organizacional.
        /// </summary>
        /// <param name="unidadId">Identificador de la unidad organizacional.</param>
        /// <param name="permisoId">Identificador del permiso.</param>
        /// <returns>Tarea completada cuando la asignación finaliza.</returns>
        public Task AsignarPermisoAUnidadAsync(int unidadId, int permisoId)
        {
            return _repository.AsignarPermisoAUnidadAsync(unidadId, permisoId);
        }

        /// <summary>
        /// Obtiene los permisos asignados directamente a una unidad organizacional.
        /// No considera permisos heredados a otros niveles jerárquicos.
        /// </summary>
        /// <param name="unidadId">Identificador de la unidad organizacional.</param>
        /// <returns>Lista de permisos asignados a la unidad.</returns>
        public Task<List<Permiso>> ObtenerPermisosPorUnidadAsync(int unidadId)
        {
            return _repository.ObtenerPermisosPorUnidadAsync(unidadId);
        }
    }
}
