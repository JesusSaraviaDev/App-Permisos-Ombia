// Data/AppDbContext.cs
using AppPermisos.Models;
using Microsoft.EntityFrameworkCore;

namespace AppPermisos.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<UnidadOrganizacional> UnidadesOrganizacionales { get; set; }
        public DbSet<Permiso> Permisos { get; set; }
        public DbSet<PermisoUnidadOrganizacional> PermisosUnidadesOrganizacionales { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Notificacion> Notificaciones { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Jerarquía
            modelBuilder.Entity<UnidadOrganizacional>().HasData(
                new UnidadOrganizacional { Id = 1, Nombre = "Marketing", Tipo = "Departamento", UnidadPadreId = null },
                new UnidadOrganizacional { Id = 2, Nombre = "Meta", Tipo = "Subdepartamento", UnidadPadreId = 1 },
                new UnidadOrganizacional { Id = 3, Nombre = "Instagram", Tipo = "Equipo", UnidadPadreId = 2 },
                new UnidadOrganizacional { Id = 4, Nombre = "Facebook", Tipo = "Equipo", UnidadPadreId = 2 }
            );

            // Permisos
            modelBuilder.Entity<Permiso>().HasData(
                new Permiso { Id = 1, Codigo = "VER_META", Nombre = "Ver módulo Meta" },
                new Permiso { Id = 2, Codigo = "VER_INSTAGRAM", Nombre = "Ver módulo Instagram" },
                new Permiso { Id = 3, Codigo = "VER_FACEBOOK", Nombre = "Ver módulo Facebook" }
            );

            // Asignación permisos–unidad
            modelBuilder.Entity<PermisoUnidadOrganizacional>().HasData(
                new PermisoUnidadOrganizacional { Id = 1, UnidadOrganizacionalId = 1, PermisoId = 1 },
                new PermisoUnidadOrganizacional { Id = 2, UnidadOrganizacionalId = 1, PermisoId = 2 },
                new PermisoUnidadOrganizacional { Id = 3, UnidadOrganizacionalId = 1, PermisoId = 3 },

                new PermisoUnidadOrganizacional { Id = 4, UnidadOrganizacionalId = 2, PermisoId = 2 },
                new PermisoUnidadOrganizacional { Id = 5, UnidadOrganizacionalId = 2, PermisoId = 3 },

                new PermisoUnidadOrganizacional { Id = 6, UnidadOrganizacionalId = 3, PermisoId = 2 },
                new PermisoUnidadOrganizacional { Id = 7, UnidadOrganizacionalId = 4, PermisoId = 3 }
            );
        }
    }
}
