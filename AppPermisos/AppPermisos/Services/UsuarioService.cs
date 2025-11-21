using AppPermisos.Contracts;
using AppPermisos.Data;
using AppPermisos.Models;
using AppPermisos.Service.Contracts;
using Microsoft.EntityFrameworkCore;

namespace AppPermisos.Service
{
    /// <summary>
    /// Servicio encargado de gestionar la lógica de negocio relacionada con los usuarios.
    /// </summary>
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly AppDbContext _context;
        private readonly INotificacionService _notificacionService;
        private readonly IUnidadOrganizacionalRepository _unidadRepository;

        /// <summary>
        /// Constructor que recibe las dependencias necesarias para el servicio.
        /// </summary>
        /// <param name="usuarioRepository">Repositorio de usuarios.</param>
        /// <param name="context">Contexto de base de datos.</param>
        public UsuarioService(IUsuarioRepository usuarioRepository, AppDbContext context, IUnidadOrganizacionalRepository unidadRepo, INotificacionService notificacionService)
        {
            _usuarioRepository = usuarioRepository;
            _context = context;            
            _unidadRepository = unidadRepo;
            _notificacionService = notificacionService;
        }

        /// <summary>
        /// Crea un nuevo usuario en el sistema.
        /// </summary>
        /// <param name="usuario">Datos del usuario a crear.</param>
        /// <returns>El usuario creado.</returns>
        public async Task<Usuario> CrearUsuarioAsync(Usuario usuario)
        {
            return await _usuarioRepository.CrearUsuarioAsync(usuario);
        }

        /// <summary>
        /// Obtiene un usuario por su identificador único.
        /// </summary>
        /// <param name="id">Identificador del usuario.</param>
        /// <returns>El usuario encontrado o null si no existe.</returns>
        public async Task<Usuario?> ObtenerUsuarioPorIdAsync(int id)
        {
            return await _context.Usuarios
                .Include(u => u.UnidadOrganizacional)
                .Include(u => u.Notificaciones)  // ⭐ NUEVO
                .ToListAsync()
                .ContinueWith(t => t.Result.FirstOrDefault(u => u.Id == id));
        }

        /// <summary>
        /// Obtiene todos los usuarios registrados en el sistema.
        /// </summary>
        /// <returns>Lista de usuarios.</returns>
        public async Task<List<Usuario>> ObtenerTodosAsync()
        {
            return await _context.Usuarios
                    .Include(u => u.UnidadOrganizacional)
                    .Include(u => u.Notificaciones)  // ⭐ NUEVO
                    .ToListAsync();
        }

        public async Task<List<Permiso>> ObtenerPermisosUsuarioAsync(int usuarioId)
        {
            var usuario = await _usuarioRepository.ObtenerUsuarioPorIdAsync(usuarioId);

            if (usuario == null)
                return new List<Permiso>();

            // 1. Obtener todos los IDs de unidades hijas + la unidad propia
            var unidadesIds = await ObtenerUnidadesDescendientesAsync(usuario.UnidadOrganizacionalId);

            var permisos = await _context.PermisosUnidadesOrganizacionales
                .Where(pu => unidadesIds.Contains(pu.UnidadOrganizacionalId))
                .Include(pu => pu.Permiso)
                .Select(pu => pu.Permiso!)
                .ToListAsync();

            return permisos
                .GroupBy(p => p.Id)
                .Select(g => g.First())
                .ToList();
        }

        /// <summary>
        /// Obtiene la unidad organizacional y todas sus unidades hijas.
        /// </summary>
        /// <param name="unidadId">Identificador de la unidad organizacional.</param>
        /// <returns>Lista de IDs de unidades organizacionales.</returns>
        private async Task<List<int>> ObtenerUnidadesDescendientesAsync(int unidadId)
        {
            var resultado = new List<int> { unidadId };

            // Obtener hijos directos
            var hijos = await _context.UnidadesOrganizacionales
                .Where(u => u.UnidadPadreId == unidadId)
                .ToListAsync();

            foreach (var hijo in hijos)
            {
                // Agregar hijo
                resultado.Add(hijo.Id);

                // Obtener hijos del hijo (recursión)
                var subHijos = await ObtenerUnidadesDescendientesAsync(hijo.Id);
                resultado.AddRange(subHijos);
            }

            return resultado.Distinct().ToList();
        }

        public async Task<Usuario> ActualizarUnidadOrganizacionalAsync(int usuarioId, int nuevaUnidadId)
        {
            // 1. Actualizar en BD
            await _usuarioRepository.ActualizarUnidadOrganizacionalAsync(usuarioId, nuevaUnidadId);

            // 2. Obtener usuario actualizado
            var usuarioActualizado = await _usuarioRepository.ObtenerUsuarioPorIdAsync(usuarioId);

            if (usuarioActualizado == null)
                throw new Exception("No se pudo recuperar el usuario actualizado.");

            // 3. Crear notificación automática
            await _notificacionService.CrearNotificacionAsync(
                usuarioId,
                $"Tu nivel jerárquico ha sido actualizado. Nueva unidad: {usuarioActualizado.UnidadOrganizacional?.Nombre}"
            );

            // Retornar usuario
            return usuarioActualizado;
        }

    }
}
