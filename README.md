⚙️ Instalación y Ejecución
▶️ Backend (.NET 8)
1. Restaurar dependencias
cd AppPermisos
dotnet restore

2. Actualizar la cadena de conexión

Editar appsettings.json:

"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=AppPermisosDB;Trusted_Connection=True;TrustServerCertificate=True"
}

3. Ejecutar migraciones
dotnet ef database update

4. Iniciar la API
dotnet run


La API iniciará en:

👉 https://localhost:7204

👉 Swagger: https://localhost:7204/swagger

▶️ Frontend (Angular + PrimeNG)
1. Instalar dependencias
cd AppPermisosFront
npm install

2. Ejecutar Angular
npm start


La aplicación inicia en:

👉 http://localhost:4200

🧪 Cómo Probar el Sistema (Flujo Completo)
1️⃣ Crear Unidades Organizacionales

Ruta: /unidades-organizacionales

Ejemplo sugerido:

Marketing  (Departamento)
 ├─ Meta (Subdepartamento)
 │   ├─ Facebook (Área)
 │   └─ Instagram (Área)
└─ Comercial


Crear varias para probar la estructura jerárquica.

2️⃣ Crear Usuarios

Ruta: /usuarios

Ejemplo:

Nombre: Daniela Romero

Unidad: Instagram

Los usuarios no tienen permisos propios; los heredan desde su unidad.

3️⃣ Crear Permisos

Ruta: /permisos

Ejemplos:

Ver Facebook Insights

Publicar Posts

Ver Estadísticas de Instagram

Administrar Meta Business

4️⃣ Asignar Permisos a Unidades

Desde /permisos seleccionas:

Unidad Organizacional

Permisos asignados

Ejemplo:
Instagram → Ver Estadísticas de Instagram
Meta → Publicar Posts

5️⃣ Ver Permisos Heredados del Usuario

Regresar a /usuarios
Cada usuario mostrará:

Su unidad

Los permisos correspondientes

Notificaciones generadas (si su unidad fue cambiada)

🔔 Sistema de Notificaciones

Cuando un usuario cambia de Unidad Organizacional, el sistema ejecuta:

Actualiza su unidad

Obtiene los nuevos permisos asignados a la unidad

Crea automáticamente una notificación

El frontend muestra todas las notificaciones del usuario

📡 Endpoints Principales
Usuarios
GET /api/Usuarios/todos
POST /api/Usuarios
PUT /api/Usuarios/{id}
GET /api/Usuarios/{id}/permisos

Unidades Organizacionales
GET /api/UnidadesOrganizacionales/todos
POST /api/UnidadesOrganizacionales
PUT /api/UnidadesOrganizacionales/{id}

Permisos
GET /api/Permisos/todos
POST /api/Permisos
POST /api/Permisos/asignar

📦 Tecnologías Utilizadas
Backend

ASP.NET Core 8

Entity Framework Core

SQL Server

AutoMapper

JWT Authentication (opcional)

Frontend

Angular 1


📄 Licencia

MIT – Libre para uso académico y profesional.
