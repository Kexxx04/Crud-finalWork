Documentación Técnica - Sistema CRUD de Usuarios con Autenticación JWT

# 1. Información General
- Nombre del Proyecto: Sistema de Gestión de Usuarios (CRUD + Autenticación JWT)
- Autores: Jaider Ríos Franco, Keith Smith Balaguera
- Tecnologías:
  - Frontend: React + Material UI
  - Backend: Node.js + Express
  - Base de Datos: PostgreSQL
  - Autenticación: JSON Web Tokens (JWT)
    
# 2. Objetivo
Diseñar e implementar una aplicación web que permita:
- Registrar, consultar, editar y eliminar usuarios.
- Autenticar y autorizar accesos mediante tokens JWT.
- Garantizar una navegación segura y protegida por sesión.

  
# 3. Funcionalidades

## CRUD:
- Crear usuario: Formulario con validación.
- Listar usuarios: Lista con botones de acción.
- Editar usuario: Formulario editable.
- Eliminar usuario: Acción con confirmación.

## Autenticación y Seguridad:
- Registro con validación.
- Login con email y password.
- Protección de rutas mediante token JWT.
- Persistencia de sesión.
- Cierre de sesión con protección del botón "atrás".
  
# 4. Requisitos No Funcionales
- Rendimiento: Respuestas rápidas (<300ms).
- Seguridad: Tokens con expiración y contraseñas cifradas.
- Usabilidad: Interfaz clara y responsiva.
- Escalabilidad: Capacidad de crecimiento a módulos como roles.
- Mantenibilidad: Código limpio y modular.
  
# 5. Arquitectura de Carpetas
/backend
├── controllers/
├── routes/
├── middleware/
├── db/
├── .env
└── index.js

/client
├── src/
│   ├── components/
│   ├── Navbar.js
│   └── App.js
├──. env
└── package. Json



# 6. Instalación y Ejecución
Instalaciones
$comando de node --- npm init -y (describe el proyecto)
$paquetes backend --- npm i express mogan cors  
$paquete nodemon --- npm i nodemon -D
$dependencia pg --- npm install pg
$dependencia bcrypt --- npm install bcrypt
$manejo y asignación de tokens --- npm install jsonwebtoken
$pruebas unitarias --- npm install --save-dev jest supertest
Backend:

$ cd backend
$ npm install
$ node src/index.js
Frontend:
$ cd client
$ npm install
$ npm start

# 7. Variables de Entorno
Backend (.env):
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=#####
DB_DATABASE=userdb
JWT_SECRET=######

# 8. Endpoints API
POST   /api/users         -> Crear usuario
POST   /api/users/login   -> Login
GET    /api/users         -> Obtener todos
GET    /api/users/:id     -> Obtener por ID
PUT    /api/users/:id     -> Actualizar usuario
DELETE /api/users/:id     -> Eliminar usuario

# 9. Seguridad y Sesión
- Token JWT incluido en Authorization Header.
- Middleware en el backend para verificar tokens.
- Frontend guarda token y usuario en localStorage.
- Logout elimina token y redirige al login.
- Navegación protegida tras logout (prevención con popstate).
  
# 10. Casos de Uso
CU1 - Registrar usuario
CU2 - Iniciar sesión
CU3 - Listar usuarios
CU4 - Editar usuario
CU5 - Eliminar usuario
CU6 - Cerrar sesión y proteger navegación

# 11. Consideraciones Finales
- Nombres repetidos permitidos, correos únicos.
- Contraseñas cifradas con bcrypt.
- Protección contra navegación hacia atrás tras logout.
- Ideal para ampliarse con roles o dashboard administrativo.

# 12.Pruebas unitarias
Este documento describe las pruebas unitarias realizadas para el backend del proyecto CRUD. Las pruebas se llevaron a cabo utilizando Jest y Supertest sobre una API desarrollada con Node.js y Express.
Herramientas Utilizadas
- Jest: Framework de pruebas para JavaScript.
- Suertes: Librería para pruebas HTTP en endpoints Express.
- Node.js y Express: Entorno y framework de servidor.
  
## Estructura de las Pruebas
Las pruebas fueron organizadas en archivos individuales dentro de la carpeta src/tests/:
- user.routes.test.js
- login.test.js
- deleteUser.test.js
  
## Prueba 1: Registro de Usuario
Archivo: user.routes.test.js

## Objetivo: Verificar que un nuevo usuario pueda registrarse correctamente y que no se permita registrar otro con el mismo correo.

Casos probados:
✔ Registro exitoso con un correo único.
✔ Registro fallido con un correo ya existente.
Prueba 2: Inicio de Sesión
Archivo: login.test.js

## Objetivo: Verificar que un usuario pueda iniciar sesión correctamente y se detecten credenciales inválidas.

Casos probados:
✔ Login exitoso con credenciales correctas.
✔ Login fallido con contraseña incorrecta.
Prueba 3: Eliminación de Usuario
Archivo: deleteUser.test.js

## Objetivo: Asegurar que un usuario puede ser eliminado correctamente mediante su ID.

Casos probados:
✔ Eliminación exitosa con ID válido.
✔ Intento de eliminación fallido con ID inválido.
Resultados de las Pruebas
✅ 3 Test Suites ejecutados exitosamente.
✅ 6 Tests pasaron sin errores.
⏱ Tiempo total de ejecución: ~2.5 segundos.
