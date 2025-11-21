using AppPermisos.Models;
using AppPermisos.Service.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace AppPermisos.Controllers
{
    /// <summary>
    /// Controlador encargado de gestionar las unidades organizacionales
    /// dentro de la estructura jerárquica del sistema.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class UnidadesOrganizacionalesController : ControllerBase
    {
        private readonly IUnidadOrganizacionalService _service;

        /// <summary>
        /// Constructor que recibe el servicio de unidades organizacionales.
        /// </summary>
        /// <param name="service">Servicio de unidades organizacionales.</param>
        public UnidadesOrganizacionalesController(IUnidadOrganizacionalService service)
        {
            _service = service;
        }

        /// <summary>
        /// Crea una nueva unidad organizacional.
        /// </summary>
        /// <param name="unidadOrganizacional">Datos de la unidad organizacional.</param>
        /// <returns>La unidad creada.</returns>
        [HttpPost("crear")]
        public async Task<IActionResult> CrearUnidadAsync([FromBody] UnidadOrganizacional unidadOrganizacional)
        {
            var creada = await _service.CrearUnidadOrganizacionalAsync(unidadOrganizacional);
            return Ok(creada);
        }

        /// <summary>
        /// Obtiene una unidad organizacional por su identificador único.
        /// </summary>
        /// <param name="id">Identificador de la unidad organizacional.</param>
        /// <returns>Datos de la unidad organizacional.</returns>
        [HttpGet("{id:int}")]
        public async Task<IActionResult> ObtenerUnidadPorIdAsync(int id)
        {
            var unidad = await _service.ObtenerUnidadOrganizacionalPorIdAsync(id);

            if (unidad == null)
                return NotFound($"No existe una unidad organizacional con el ID {id}");

            return Ok(unidad);
        }

        /// <summary>
        /// Obtiene todas las unidades organizacionales registradas.
        /// </summary>
        /// <returns>Lista de unidades organizacionales.</returns>
        [HttpGet("todas")]
        public async Task<IActionResult> ObtenerTodasAsync()
        {
            var unidades = await _service.ObtenerTodasAsync();
            return Ok(unidades);
        }

        /// <summary>
        /// Obtiene todas las unidades organizacionales hijas de una unidad específica.
        /// </summary>
        /// <param name="id">Identificador de la unidad padre.</param>
        /// <returns>Lista de unidades hijas.</returns>
        [HttpGet("{id:int}/hijas")]
        public async Task<IActionResult> ObtenerHijasAsync(int id)
        {
            var hijas = await _service.ObtenerHijasAsync(id);
            return Ok(hijas);
        }
    }
}
