const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config(); // necesario para acceder a JWT_SECRET en pruebas

const userRoutes = require('./routes/users.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api', userRoutes);

// Ruta de prueba (opcional)
app.get('/', (req, res) => {
  res.send('🚀 API funcionando correctamente');
});

// Middleware de errores
app.use((err, req, res, next) => {
  return res.status(500).json({
    message: err.message
  });
});

// ✅ Solo iniciar el servidor si no estamos en modo test
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
  });
}

// Exportar la app para pruebas
module.exports = app;
