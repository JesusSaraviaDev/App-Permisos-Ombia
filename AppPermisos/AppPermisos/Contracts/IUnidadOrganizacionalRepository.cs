using AppPermisos.Models;

namespace AppPermisos.Contracts
{
    /// <summary>
    /// Contrato para gestionar las unidades organizacionales.
    /// </summary>
    public interface IUnidadOrganizacionalRepository
    {
        /// <summary>
        /// Crea una nueva unidad organizacional.
        /// </summary>
        /// <param name="unidad">Entidad de la unidad a crear.</param>
        /// <returns >La unidad organizacional creada.</returns>
        Task<UnidadOrganizacional> CrearUnidadOrganizacionalAsync(UnidadOrganizacional unidad);

        /// <summary>
        /// Obtiene una unidad por su ID.
        /// </summary>
        /// <param name="id">Identificador de la unidad organizacional.</param>
        /// <returns>La unidad organizacional encontrada o null si no existe.</returns>
        Task<UnidadOrganizacional?> ObtenerUnidadOrganizacionalPorIdAsync(int id);

        /// <summary>
        /// Obtiene todas las unidades organizacionales.
        /// </summary>
        /// <returns>Lista de unidades organizacionales.</returns>
        Task<List<UnidadOrganizacional>> ObtenerTodasAsync();

        /// <summary>
        /// Obtiene las unidades hijas de una unidad padre.
        /// </summary>
        /// <param name="unidadPadreId" >Identificador de la unidad organizacional padre.</param>
        /// <returns>Lista de unidades hijas.</returns> 
        Task<List<UnidadOrganizacional>> ObtenerHijasAsync(int unidadPadreId);

    }
}
