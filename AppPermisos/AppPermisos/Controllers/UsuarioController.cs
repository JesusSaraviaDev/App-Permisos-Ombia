using AppPermisos.Models;
using AppPermisos.Service.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace AppPermisos.Controllers
{
    /// <summary>
    /// Controlador encargado de gestionar los usuarios del sistema.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        /// <summary>
        /// Constructor que recibe el servicio de usuarios.
        /// </summary>
        /// <param name="usuarioService">Servicio de usuarios.</param>
        public UsuariosController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        /// <summary>
        /// Crea un nuevo usuario en el sistema.
        /// </summary>
        /// <param name="usuario">Datos del usuario a crear.</param>
        /// <returns>Usuario creado exitosamente.</returns>
        [HttpPost("crear")]
        public async Task<IActionResult> CrearUsuarioAsync([FromBody] Usuario usuario)
        {
            var creado = await _usuarioService.CrearUsuarioAsync(usuario);
            return Ok(creado);
        }

        /// <summary>
        /// Obtiene un usuario por su identificador.
        /// </summary>
        /// <param name="id">Identificador del usuario.</param>
        /// <returns>Datos del usuario.</returns>
        [HttpGet("{id:int}")]
        public async Task<IActionResult> ObtenerUsuarioPorIdAsync(int id)
        {
            var usuario = await _usuarioService.ObtenerUsuarioPorIdAsync(id);

            if (usuario == null)
                return NotFound($"No existe un usuario con el ID {id}");

            return Ok(usuario);
        }

        /// <summary>
        /// Obtiene todos los usuarios registrados.
        /// </summary>
        /// <returns>Lista de usuarios.</returns>
        [HttpGet("todos")]
        public async Task<IActionResult> ObtenerTodosAsync()
        {
            var usuarios = await _usuarioService.ObtenerTodosAsync();
            return Ok(usuarios);
        }

        /// <summary>
        /// Obtiene los permisos de un usuario, incluyendo los heredados por la jerarquía descendente.
        /// </summary>
        /// <param name="id">Identificador del usuario.</param>
        /// <returns>Lista de permisos del usuario.</returns>
        [HttpGet("{id:int}/permisos")]
        public async Task<IActionResult> ObtenerPermisosUsuarioAsync(int id)
        {
            var permisos = await _usuarioService.ObtenerPermisosUsuarioAsync(id);
            return Ok(permisos);
        }

        /// <summary>
        /// Actualiza la unidad organizacional de un usuario.
        /// Esto genera una notificación automática.
        /// </summary>
        [HttpPut("{usuarioId:int}/actualizar-unidad")]
        public async Task<IActionResult> ActualizarUnidadUsuarioAsync(int usuarioId, int nuevaUnidadId)
        {
            var usuario = await _usuarioService.ActualizarUnidadOrganizacionalAsync(usuarioId, nuevaUnidadId);
            return Ok(usuario);
        }

    }

}

