using AppPermisos.Models;
using AppPermisos.Service.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace AppPermisos.Controllers
{
    /// <summary>
    /// Controlador encargado de gestionar los permisos dentro del sistema.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class PermisosController : ControllerBase
    {
        private readonly IPermisoService _service;

        /// <summary>
        /// Constructor que recibe el servicio de permisos.
        /// </summary>
        /// <param name="service">Servicio de permisos.</param>
        public PermisosController(IPermisoService service)
        {
            _service = service;
        }

        /// <summary>
        /// Crea un nuevo permiso.
        /// </summary>
        /// <param name="permiso">Datos del permiso a crear.</param>
        /// <returns>El permiso creado.</returns>
        [HttpPost("crear")]
        public async Task<IActionResult> CrearPermisoAsync([FromBody] Permiso permiso)
        {
            var creado = await _service.CrearPermisoAsync(permiso);
            return Ok(creado);
        }

        /// <summary>
        /// Obtiene todos los permisos registrados en el sistema.
        /// </summary>
        /// <returns>Lista de permisos.</returns>
        [HttpGet("todos")]
        public async Task<IActionResult> ObtenerTodosAsync()
        {
            var permisos = await _service.ObtenerTodosAsync();
            return Ok(permisos);
        }

        /// <summary>
        /// Asigna un permiso a una unidad organizacional.
        /// </summary>
        /// <param name="unidadId">Identificador de la unidad organizacional.</param>
        /// <param name="permisoId">Identificador del permiso.</param>
        /// <returns>Confirmación de asignación exitosa.</returns>
        [HttpPost("asignar")]
        public async Task<IActionResult> AsignarPermisoAUnidadAsync(int unidadId, int permisoId)
        {
            await _service.AsignarPermisoAUnidadAsync(unidadId, permisoId);
            return Ok($"Permiso {permisoId} asignado a la unidad {unidadId}");
        }

        /// <summary>
        /// Obtiene los permisos asignados directamente a una unidad organizacional.
        /// </summary>
        /// <param name="unidadId">Identificador de la unidad organizacional.</param>
        /// <returns>Lista de permisos asignados a la unidad.</returns>
        [HttpGet("{unidadId:int}/permisos")]
        public async Task<IActionResult> ObtenerPermisosPorUnidadAsync(int unidadId)
        {
            var permisos = await _service.ObtenerPermisosPorUnidadAsync(unidadId);
            return Ok(permisos);
        }
    }
}
