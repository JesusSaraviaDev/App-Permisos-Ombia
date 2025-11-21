using AppPermisos.Contracts;
using AppPermisos.Data;
using AppPermisos.Models;
using Microsoft.EntityFrameworkCore;

namespace AppPermisos.Repository
{
    /// <summary>
    /// Repositorio encargado de gestionar las operaciones de datos
    /// relacionadas con los permisos del sistema.
    /// </summary>
    public class PermisoRepository : IPermisoRepository
    {
        private readonly AppDbContext _context;

        public PermisoRepository(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Crea un nuevo permiso.
        /// </summary>
        public async Task<Permiso> CrearPermisoAsync(Permiso permiso)
        {
            _context.Permisos.Add(permiso);
            await _context.SaveChangesAsync();
            return permiso;
        }

        /// <summary>
        /// Obtiene todos los permisos registrados.
        /// </summary>
        public async Task<List<Permiso>> ObtenerTodosAsync()
        {
            return await _context.Permisos.ToListAsync();
        }

        /// <summary>
        /// Asocia un permiso a una unidad organizacional.
        /// </summary>
        public async Task AsignarPermisoAUnidadAsync(int unidadId, int permisoId)
        {
            var relacion = new PermisoUnidadOrganizacional
            {
                UnidadOrganizacionalId = unidadId,
                PermisoId = permisoId
            };

            _context.PermisosUnidadesOrganizacionales.Add(relacion);
            await _context.SaveChangesAsync();
        }

        /// <summary>
        /// Obtiene los permisos asignados a una unidad organizacional.
        /// </summary>
        public async Task<List<Permiso>> ObtenerPermisosPorUnidadAsync(int unidadId)
        {
            return await _context.PermisosUnidadesOrganizacionales
                .Where(x => x.UnidadOrganizacionalId == unidadId)
                .Include(x => x.Permiso)
                .Where(x => x.Permiso != null) 
                .Select(x => x.Permiso!)
                .ToListAsync();
        }

    }
}
