using AppPermisos.Contracts;
using AppPermisos.Data;
using AppPermisos.Models;
using Microsoft.EntityFrameworkCore;

namespace AppPermisos.Repository
{
    /// <summary>
    /// Implementación del repositorio encargado de las operaciones
    /// de acceso a datos relacionadas con los usuarios.
    /// </summary>
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly AppDbContext _context;

        /// <summary>
        /// Constructor que recibe el contexto de base de datos.
        /// </summary>
        /// <param name="context">Instancia del contexto de la base de datos.</param>
        public UsuarioRepository(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Crea un nuevo usuario en la base de datos.
        /// </summary>
        /// <param name="usuario">Entidad del usuario a crear.</param>
        /// <returns>El usuario creado.</returns>
        public async Task<Usuario> CrearUsuarioAsync(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
            return usuario;
        }

        /// <summary>
        /// Obtiene un usuario por su identificador único.
        /// Incluye su unidad organizacional relacionada.
        /// </summary>
        /// <param name="id">Identificador del usuario.</param>
        /// <returns>El usuario encontrado o null si no existe.</returns>
        public async Task<Usuario?> ObtenerUsuarioPorIdAsync(int id)
        {
            return await _context.Usuarios
                .Include(u => u.UnidadOrganizacional)
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        /// <summary>
        /// Obtiene todos los usuarios registrados en el sistema.
        /// Incluye sus unidades organizacionales relacionadas.
        /// </summary>
        /// <returns>Lista de usuarios.</returns>
        public async Task<List<Usuario>> ObtenerTodosAsync()
        {
            return await _context.Usuarios
                .Include(u => u.UnidadOrganizacional)
                .ToListAsync();
        }

        /// <summary>
        /// Actualiza la unidad organizacional de un usuario.
        /// </summary>
        public async Task ActualizarUnidadOrganizacionalAsync(int usuarioId, int nuevaUnidadId)
        {
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Id == usuarioId);

            if (usuario == null)
                throw new Exception($"Usuario con ID {usuarioId} no encontrado.");

            usuario.UnidadOrganizacionalId = nuevaUnidadId;

            await _context.SaveChangesAsync();
        }

    }
}
