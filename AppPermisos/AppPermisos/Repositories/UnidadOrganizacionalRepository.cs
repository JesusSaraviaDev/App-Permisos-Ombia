using AppPermisos.Contracts;
using AppPermisos.Data;
using AppPermisos.Models;
using Microsoft.EntityFrameworkCore;

namespace AppPermisos.Repository
{
    /// <summary>
    /// Repositorio encargado de las operaciones de acceso a datos
    /// relacionadas con las unidades organizacionales.
    /// </summary>
    public class UnidadOrganizacionalRepository : IUnidadOrganizacionalRepository
    {
        private readonly AppDbContext _context;

        /// <summary>
        /// Constructor que recibe el contexto de base de datos.
        /// </summary>
        /// <param name="context">Instancia del contexto de la base de datos.</param>
        public UnidadOrganizacionalRepository(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Crea una nueva unidad organizacional en la base de datos.
        /// </summary>
        /// <param name="unidadOrganizacional">Entidad de la unidad organizacional a crear.</param>
        /// <returns>La unidad organizacional creada.</returns>
        public async Task<UnidadOrganizacional> CrearUnidadOrganizacionalAsync(UnidadOrganizacional unidadOrganizacional)
        {
            _context.UnidadesOrganizacionales.Add(unidadOrganizacional);
            await _context.SaveChangesAsync();
            return unidadOrganizacional;
        }

        /// <summary>
        /// Obtiene una unidad organizacional por su identificador único.
        /// Incluye la referencia a su unidad padre.
        /// </summary>
        /// <param name="id">Identificador de la unidad organizacional.</param>
        /// <returns>
        /// La unidad organizacional encontrada o null si no existe.
        /// </returns>
        public async Task<UnidadOrganizacional?> ObtenerUnidadOrganizacionalPorIdAsync(int id)
        {
            return await _context.UnidadesOrganizacionales
                .Include(u => u.UnidadPadre)
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        /// <summary>
        /// Obtiene todas las unidades organizacionales registradas.
        /// Incluye la referencia a sus unidades padre.
        /// </summary>
        /// <returns>Lista de unidades organizacionales.</returns>
        public async Task<List<UnidadOrganizacional>> ObtenerTodasAsync()
        {
            return await _context.UnidadesOrganizacionales
                .Include(u => u.UnidadPadre)
                .ToListAsync();
        }

        /// <summary>
        /// Obtiene todas las unidades organizacionales hijas
        /// de una unidad padre específica.
        /// </summary>
        /// <param name="unidadPadreId">Identificador de la unidad padre.</param>
        /// <returns>Lista de unidades organizacionales hijas.</returns>
        public async Task<List<UnidadOrganizacional>> ObtenerHijasAsync(int unidadPadreId)
        {
            return await _context.UnidadesOrganizacionales
                .Where(u => u.UnidadPadreId == unidadPadreId)
                .ToListAsync();
        }
    }
}
