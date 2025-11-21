using AppPermisos.Models;

namespace AppPermisos.Service.Contracts
{
    /// <summary>
    /// Define la lógica de negocio relacionada con
    /// las unidades organizacionales del sistema.
    /// </summary>
    public interface IUnidadOrganizacionalService
    {
        /// <summary>
        /// Crea una nueva unidad organizacional.
        /// </summary>
        /// <param name="unidadOrganizacional">Entidad de la unidad a crear.</param>
        /// <returns>La unidad organizacional creada.</returns>
        Task<UnidadOrganizacional> CrearUnidadOrganizacionalAsync(UnidadOrganizacional unidadOrganizacional);

        /// <summary>
        /// Obtiene una unidad organizacional por su identificador único.
        /// </summary>
        /// <param name="id">Identificador de la unidad organizacional.</param>
        /// <returns>La unidad organizacional encontrada o null si no existe.</returns>
        Task<UnidadOrganizacional?> ObtenerUnidadOrganizacionalPorIdAsync(int id);

        /// <summary>
        /// Obtiene todas las unidades organizacionales del sistema.
        /// </summary>
        /// <returns>Lista de unidades organizacionales.</returns>
        Task<List<UnidadOrganizacional>> ObtenerTodasAsync();

        /// <summary>
        /// Obtiene las unidades organizacionales hijas de una unidad padre específica.
        /// </summary>
        /// <param name="unidadPadreId">Identificador de la unidad padre.</param>
        /// <returns>Lista de unidades hijas.</returns>
        Task<List<UnidadOrganizacional>> ObtenerHijasAsync(int unidadPadreId);
    }
}
