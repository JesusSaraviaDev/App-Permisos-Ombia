using AppPermisos.Models;

namespace AppPermisos.Contracts
{
    /// <summary>
    /// Define las operaciones de acceso a datos relacionadas con los usuarios.
    /// </summary>
    public interface IUsuarioRepository
    {
        /// <summary>
        /// Crea un nuevo usuario en la base de datos.
        /// </summary>
        /// <param name="usuario">Entidad del usuario a crear.</param>
        /// <returns>El usuario creado.</returns>
        Task<Usuario> CrearUsuarioAsync(Usuario usuario);

        /// <summary>
        /// Obtiene un usuario por su identificador único.
        /// </summary>
        /// <param name="id">Identificador del usuario.</param>
        /// <returns>El usuario encontrado o null si no existe.</returns>
        Task<Usuario?> ObtenerUsuarioPorIdAsync(int id);

        /// <summary>
        /// Obtiene todos los usuarios registrados en el sistema.
        /// </summary>
        /// <returns>Lista de usuarios.</returns>
        Task<List<Usuario>> ObtenerTodosAsync();

        /// <summary>
        /// Actualiza la unidad organizacional de un usuario.
        /// </summary>
        /// <param name="usuarioId">ID del usuario.</param>
        /// <param name="nuevaUnidadId">ID de la nueva unidad organizacional.</param>
        Task ActualizarUnidadOrganizacionalAsync(int usuarioId, int nuevaUnidadId);
    }
}
