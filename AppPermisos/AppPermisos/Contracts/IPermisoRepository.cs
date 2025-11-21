using AppPermisos.Models;

namespace AppPermisos.Contracts
{
    /// <summary>
    /// Define las operaciones de acceso a datos relacionadas
    /// con los permisos del sistema.
    /// </summary>
    public interface IPermisoRepository
    {
        /// <summary>
        /// Crea un nuevo permiso.
        /// </summary>
        Task<Permiso> CrearPermisoAsync(Permiso permiso);

        /// <summary>
        /// Obtiene todos los permisos registrados.
        /// </summary>
        Task<List<Permiso>> ObtenerTodosAsync();

        /// <summary>
        /// Asocia un permiso a una unidad organizacional.
        /// </summary>
        Task AsignarPermisoAUnidadAsync(int unidadId, int permisoId);

        /// <summary>
        /// Obtiene los permisos asignados a una unidad organizacional.
        /// </summary>
        Task<List<Permiso>> ObtenerPermisosPorUnidadAsync(int unidadId);
    }
}
