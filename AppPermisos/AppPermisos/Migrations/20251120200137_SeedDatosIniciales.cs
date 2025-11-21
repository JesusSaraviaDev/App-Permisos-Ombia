using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AppPermisos.Migrations
{
    /// <inheritdoc />
    public partial class SeedDatosIniciales : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Permisos",
                columns: new[] { "Id", "Codigo", "Nombre" },
                values: new object[,]
                {
                    { 1, "VER_META", "Ver módulo Meta" },
                    { 2, "VER_INSTAGRAM", "Ver módulo Instagram" },
                    { 3, "VER_FACEBOOK", "Ver módulo Facebook" }
                });

            migrationBuilder.InsertData(
                table: "UnidadesOrganizacionales",
                columns: new[] { "Id", "Nombre", "Tipo", "UnidadPadreId" },
                values: new object[] { 1, "Marketing", "Departamento", null });

            migrationBuilder.InsertData(
                table: "PermisosUnidadesOrganizacionales",
                columns: new[] { "Id", "PermisoId", "UnidadOrganizacionalId" },
                values: new object[,]
                {
                    { 1, 1, 1 },
                    { 2, 2, 1 },
                    { 3, 3, 1 }
                });

            migrationBuilder.InsertData(
                table: "UnidadesOrganizacionales",
                columns: new[] { "Id", "Nombre", "Tipo", "UnidadPadreId" },
                values: new object[] { 2, "Meta", "Subdepartamento", 1 });

            migrationBuilder.InsertData(
                table: "PermisosUnidadesOrganizacionales",
                columns: new[] { "Id", "PermisoId", "UnidadOrganizacionalId" },
                values: new object[,]
                {
                    { 4, 2, 2 },
                    { 5, 3, 2 }
                });

            migrationBuilder.InsertData(
                table: "UnidadesOrganizacionales",
                columns: new[] { "Id", "Nombre", "Tipo", "UnidadPadreId" },
                values: new object[,]
                {
                    { 3, "Instagram", "Equipo", 2 },
                    { 4, "Facebook", "Equipo", 2 }
                });

            migrationBuilder.InsertData(
                table: "PermisosUnidadesOrganizacionales",
                columns: new[] { "Id", "PermisoId", "UnidadOrganizacionalId" },
                values: new object[,]
                {
                    { 6, 2, 3 },
                    { 7, 3, 4 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "PermisosUnidadesOrganizacionales",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "PermisosUnidadesOrganizacionales",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "PermisosUnidadesOrganizacionales",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "PermisosUnidadesOrganizacionales",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "PermisosUnidadesOrganizacionales",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "PermisosUnidadesOrganizacionales",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "PermisosUnidadesOrganizacionales",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Permisos",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Permisos",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Permisos",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "UnidadesOrganizacionales",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "UnidadesOrganizacionales",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "UnidadesOrganizacionales",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "UnidadesOrganizacionales",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
