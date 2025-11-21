using AppPermisos.Models;

namespace AppPermisos.Service.Contracts
{
    /// <summary>
    /// Define las operaciones de lógica de negocio relacionadas
    /// con la gestión de permisos dentro del sistema.
    /// </summary>
    public interface IPermisoService
    {
        /// <summary>
        /// Crea un nuevo permiso dentro del sistema.
        /// </summary>
        /// <param name="permiso">Entidad del permiso a crear.</param>
        /// <returns>El permiso creado exitosamente.</returns>
        Task<Permiso> CrearPermisoAsync(Permiso permiso);

        /// <summary>
        /// Obtiene la lista completa de permisos registrados en el sistema.
        /// </summary>
        /// <returns>Lista de permisos.</returns>
        Task<List<Permiso>> ObtenerTodosAsync();

        /// <summary>
        /// Asigna un permiso a una unidad organizacional específica.
        /// </summary>
        /// <param name="unidadId">Identificador de la unidad organizacional.</param>
        /// <param name="permisoId">Identificador del permiso.</param>
        Task AsignarPermisoAUnidadAsync(int unidadId, int permisoId);

        /// <summary>
        /// Obtiene los permisos asociados directamente a una unidad organizacional.
        /// No incluye herencia desde niveles superiores o inferiores.
        /// </summary>
        /// <param name="unidadId">Identificador de la unidad organizacional.</param>
        /// <returns>Lista de permisos asignados a la unidad.</returns>
        Task<List<Permiso>> ObtenerPermisosPorUnidadAsync(int unidadId);
    }
}
