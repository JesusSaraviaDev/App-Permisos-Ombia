using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AppPermisos.Migrations
{
    /// <inheritdoc />
    public partial class AddInitialEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Permisos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Codigo = table.Column<string>(type: "TEXT", nullable: false),
                    Nombre = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permisos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UnidadesOrganizacionales",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nombre = table.Column<string>(type: "TEXT", nullable: false),
                    Tipo = table.Column<string>(type: "TEXT", nullable: false),
                    UnidadPadreId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UnidadesOrganizacionales", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UnidadesOrganizacionales_UnidadesOrganizacionales_UnidadPadreId",
                        column: x => x.UnidadPadreId,
                        principalTable: "UnidadesOrganizacionales",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PermisosUnidadesOrganizacionales",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UnidadOrganizacionalId = table.Column<int>(type: "INTEGER", nullable: false),
                    PermisoId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PermisosUnidadesOrganizacionales", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PermisosUnidadesOrganizacionales_Permisos_PermisoId",
                        column: x => x.PermisoId,
                        principalTable: "Permisos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PermisosUnidadesOrganizacionales_UnidadesOrganizacionales_UnidadOrganizacionalId",
                        column: x => x.UnidadOrganizacionalId,
                        principalTable: "UnidadesOrganizacionales",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nombres = table.Column<string>(type: "TEXT", nullable: false),
                    Apellidos = table.Column<string>(type: "TEXT", nullable: false),
                    TipoDeSangre = table.Column<string>(type: "TEXT", nullable: false),
                    UnidadOrganizacionalId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Usuarios_UnidadesOrganizacionales_UnidadOrganizacionalId",
                        column: x => x.UnidadOrganizacionalId,
                        principalTable: "UnidadesOrganizacionales",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Notificaciones",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UsuarioId = table.Column<int>(type: "INTEGER", nullable: false),
                    Mensaje = table.Column<string>(type: "TEXT", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Leida = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notificaciones", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notificaciones_Usuarios_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Notificaciones_UsuarioId",
                table: "Notificaciones",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_PermisosUnidadesOrganizacionales_PermisoId",
                table: "PermisosUnidadesOrganizacionales",
                column: "PermisoId");

            migrationBuilder.CreateIndex(
                name: "IX_PermisosUnidadesOrganizacionales_UnidadOrganizacionalId",
                table: "PermisosUnidadesOrganizacionales",
                column: "UnidadOrganizacionalId");

            migrationBuilder.CreateIndex(
                name: "IX_UnidadesOrganizacionales_UnidadPadreId",
                table: "UnidadesOrganizacionales",
                column: "UnidadPadreId");

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_UnidadOrganizacionalId",
                table: "Usuarios",
                column: "UnidadOrganizacionalId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Notificaciones");

            migrationBuilder.DropTable(
                name: "PermisosUnidadesOrganizacionales");

            migrationBuilder.DropTable(
                name: "Usuarios");

            migrationBuilder.DropTable(
                name: "Permisos");

            migrationBuilder.DropTable(
                name: "UnidadesOrganizacionales");
        }
    }
}
