# 📘 Documentación Técnica - Sistema CRUD de Usuarios con Autenticación JWT

## Información General

- **Nombre del Proyecto:** Sistema de Gestión de Usuarios (CRUD + Autenticación JWT)  
- **Autores:** Jaider Ríos Franco, Keith Smith Balaguera

## Tecnologías

- **Frontend:** React + Material UI  
- **Backend:** Node.js + Express  
- **Base de Datos:** PostgreSQL  
- **Autenticación:** JSON Web Tokens (JWT)

---

## 🎯 Objetivo

Diseñar e implementar una aplicación web que permita:

- Registrar, consultar, editar y eliminar usuarios.
- Autenticar y autorizar accesos mediante tokens JWT.
- Garantizar una navegación segura y protegida por sesión.

---

## 🔧 Funcionalidades

### CRUD

- **Crear usuario:** Formulario con validación.
- **Listar usuarios:** Lista con botones de acción.
- **Editar usuario:** Formulario editable.
- **Eliminar usuario:** Acción con confirmación.

### Autenticación y Seguridad

- Registro con validación.
- Login con email y password.
- Protección de rutas mediante token JWT.
- Persistencia de sesión.
- Cierre de sesión con protección del botón "atrás".

---

## ✅ Requisitos No Funcionales

- **Rendimiento:** Respuestas rápidas (<300ms).
- **Seguridad:** Tokens con expiración y contraseñas cifradas.
- **Usabilidad:** Interfaz clara y responsiva.
- **Escalabilidad:** Capacidad de crecimiento a módulos como roles.
- **Mantenibilidad:** Código limpio y modular.

---

## 📁 Arquitectura de Carpetas

/backend
├── controllers/
├── routes/
├── middleware/
├── db/
├── .env
└── index.js

/client
├── src/
│ ├── components/
│ ├── Navbar.js
│ └── App.js
├── .env
└── package.json

yaml
Copiar
Editar

---

## ⚙ Instalación y Ejecución

### Backend

```bash
cd backend
npm init -y
npm i express morgan cors
npm i nodemon -D
npm install pg bcrypt jsonwebtoken
npm install --save-dev jest supertest
node src/index.js
Frontend
bash
Copiar
Editar
cd client
npm install
npm start
🔐 Variables de Entorno
Archivo .env para el backend:

ini
Copiar
Editar
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_DATABASE=usersdb
JWT_SECRET=QxB93$kd!A23Df1s7P
🌐 Endpoints API
Método	Endpoint	Descripción
POST	/api/users	Crear usuario
POST	/api/users/login	Login
GET	/api/users	Obtener todos los usuarios
GET	/api/users/:id	Obtener usuario por ID
PUT	/api/users/:id	Actualizar usuario
DELETE	/api/users/:id	Eliminar usuario

🛡 Seguridad y Sesión
Token JWT incluido en el Authorization Header.

Middleware en el backend para verificar tokens.

El frontend guarda el token y usuario en localStorage.

Logout elimina el token y redirige al login.

Protección de navegación hacia atrás con popstate.

💡 Casos de Uso
CU1: Registrar usuario

CU2: Iniciar sesión

CU3: Listar usuarios

CU4: Editar usuario

CU5: Eliminar usuario

CU6: Cerrar sesión y proteger navegación

📝 Consideraciones Finales
Se permiten nombres repetidos, pero los correos deben ser únicos.

Las contraseñas se cifran con bcrypt.

La navegación hacia atrás está protegida tras cerrar sesión.

Ideal para ampliarse con roles o un dashboard administrativo.

🧪 Pruebas Unitarias
Herramientas Utilizadas
Jest: Framework de pruebas para JavaScript.

Supertest: Librería para pruebas HTTP en Express.

Node.js y Express: Entorno y framework de servidor.

Estructura de las Pruebas
Ubicadas en src/tests/:

user.routes.test.js

login.test.js

deleteUser.test.js

✔ Prueba 1: Registro de Usuario
Archivo: user.routes.test.js
Objetivo: Verificar que un nuevo usuario pueda registrarse correctamente.

Casos:

✔ Registro exitoso con correo único.

✔ Registro fallido con correo ya existente.

✔ Prueba 2: Inicio de Sesión
Archivo: login.test.js
Objetivo: Verificar login válido y manejo de credenciales incorrectas.

Casos:

✔ Login exitoso con credenciales correctas.

✔ Login fallido con contraseña incorrecta.

✔ Prueba 3: Eliminación de Usuario
Archivo: deleteUser.test.js
Objetivo: Asegurar que un usuario puede ser eliminado por ID.

Casos:

✔ Eliminación exitosa con ID válido.

✔ Eliminación fallida con ID inválido.

📊 Resultados
✅ 3 Test Suites ejecutados exitosamente

✅ 6 Tests pasaron sin errores

⏱ Tiempo total de ejecución: ~2.5 segundos

🛠 Configuración de la Base de Datos
Script SQL
sql
Copiar
Editar
CREATE DATABASE usersdb;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(100)
);
🔑 Variables de Entorno de Base de Datos
ini
Copiar
Editar
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_DATABASE=usersdb
JWT_SECRET=QxB93$kd!A23Df1s7P
