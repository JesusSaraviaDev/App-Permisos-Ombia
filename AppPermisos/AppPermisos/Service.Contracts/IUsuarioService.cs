using AppPermisos.Models;

namespace AppPermisos.Service.Contracts
{
    public interface IUsuarioService
    {
        /// <summary>
        /// Crea un nuevo usuario en el sistema.
        /// </summary>
        /// <param name="usuario"> Datos del usuario a crear</param>
        /// <returns>Usuario Creado exitosamente </returns>
        Task<Usuario> CrearUsuarioAsync(Usuario usuario);

        /// <summary>
        /// Obtiene usuario por id
        /// </summary>
        /// <param name="id"> identificador del usuario</param>
        /// <returns>Datos del usuario </returns>
        Task<Usuario?> ObtenerUsuarioPorIdAsync(int id);

        /// <summary>
        /// Obtiene todos los usuarios
        /// </summary>
        /// <returns>Lista de usuario</returns>
        Task<List<Usuario>> ObtenerTodosAsync();

        /// <summary>
        /// Obtiene los permisos asignados a un usuario
        /// </summary>
        /// <param name="usuarioId"> Identificador del usuario</param>
        /// <returns>Lista de permisos del usuario</returns>
        Task<List<Permiso>> ObtenerPermisosUsuarioAsync(int usuarioId);

        /// <summary>
        /// Actualiza la unidad organizacional del usuario.
        /// También genera una notificación.
        /// </summary>
        Task<Usuario> ActualizarUnidadOrganizacionalAsync(int usuarioId, int nuevaUnidadId);

    }
}
