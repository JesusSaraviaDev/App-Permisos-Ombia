using AppPermisos.Contracts;
using AppPermisos.Data;
using AppPermisos.Models;
using Microsoft.EntityFrameworkCore;

namespace AppPermisos.Repository
{
    /// <summary>
    /// Repositorio encargado de gestionar las operaciones de datos
    /// relacionadas con las notificaciones del sistema.
    /// </summary>
    public class NotificacionRepository : INotificacionRepository
    {
        private readonly AppDbContext _context;

        public NotificacionRepository(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Crea una nueva notificación y la almacena en la base de datos.
        /// </summary>
        public async Task<Notificacion> CrearNotificacionAsync(Notificacion notificacion)
        {
            _context.Notificaciones.Add(notificacion);
            await _context.SaveChangesAsync();
            return notificacion;
        }

        /// <summary>
        /// Obtiene todas las notificaciones dirigidas a un usuario.
        /// </summary>
        public async Task<List<Notificacion>> ObtenerPorUsuarioAsync(int usuarioId)
        {
            return await _context.Notificaciones
                .Where(n => n.UsuarioId == usuarioId)
                .OrderByDescending(n => n.FechaCreacion)
                .ToListAsync();
        }

        /// <summary>
        /// Marca una notificación como leída.
        /// </summary>
        public async Task MarcarComoLeidaAsync(int id)
        {
            var notificacion = await _context.Notificaciones.FirstOrDefaultAsync(n => n.Id == id);

            if (notificacion != null)
            {
                notificacion.Leida = true;
                await _context.SaveChangesAsync();
            }
        }
    }
}
