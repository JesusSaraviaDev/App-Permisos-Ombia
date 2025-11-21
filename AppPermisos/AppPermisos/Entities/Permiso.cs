namespace AppPermisos.Models
{
    public class Permiso
    {
        /// <summary>
        /// Identificador único del permiso.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Código único del permiso.
        /// </summary>
        public string Codigo { get; set; } = string.Empty; // "CREAR_USUARIO"

        /// <summary>
        /// Nombre del permiso
        /// </summary>s
        public string Nombre { get; set; } = string.Empty; // "Crear usuario"
    }
}
