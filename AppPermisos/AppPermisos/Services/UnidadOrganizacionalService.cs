using AppPermisos.Contracts;
using AppPermisos.Models;
using AppPermisos.Service.Contracts;

namespace AppPermisos.Service
{
    /// <summary>
    /// Servicio encargado de la lógica de negocio
    /// para las unidades organizacionales del sistema.
    /// </summary>
    public class UnidadOrganizacionalService : IUnidadOrganizacionalService
    {
        private readonly IUnidadOrganizacionalRepository _repository;

        /// <summary>
        /// Constructor que recibe el repositorio de unidades organizacionales.
        /// </summary>
        /// <param name="repository">Repositorio de unidades organizacionales.</param>
        public UnidadOrganizacionalService(IUnidadOrganizacionalRepository repository)
        {
            _repository = repository;
        }

        /// <summary>
        /// Crea una nueva unidad organizacional.
        /// </summary>
        /// <param name="unidadOrganizacional">Entidad de la unidad a crear.</param>
        /// <returns>La unidad organizacional creada.</returns>
        public Task<UnidadOrganizacional> CrearUnidadOrganizacionalAsync(UnidadOrganizacional unidadOrganizacional)
        {
            return _repository.CrearUnidadOrganizacionalAsync(unidadOrganizacional);
        }

        /// <summary>
        /// Obtiene una unidad organizacional por su identificador único.
        /// </summary>
        /// <param name="id">Identificador de la unidad organizacional.</param>
        /// <returns>La unidad encontrada o null si no existe.</returns>
        public Task<UnidadOrganizacional?> ObtenerUnidadOrganizacionalPorIdAsync(int id)
        {
            return _repository.ObtenerUnidadOrganizacionalPorIdAsync(id);
        }

        /// <summary>
        /// Obtiene todas las unidades organizacionales del sistema.
        /// </summary>
        /// <returns>Lista de unidades organizacionales.</returns>
        public Task<List<UnidadOrganizacional>> ObtenerTodasAsync()
        {
            return _repository.ObtenerTodasAsync();
        }

        /// <summary>
        /// Obtiene todas las unidades hijas de una unidad padre específica.
        /// </summary>
        /// <param name="unidadPadreId">Identificador de la unidad padre.</param>
        /// <returns>Lista de unidades hijas.</returns>
        public Task<List<UnidadOrganizacional>> ObtenerHijasAsync(int unidadPadreId)
        {
            return _repository.ObtenerHijasAsync(unidadPadreId);
        }
    }
}
