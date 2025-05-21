const pool = require('../db');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await pool.query('SELECT * FROM users');
    res.json(allUsers.rows);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const existing = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const updatingUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    // Obtener usuario actual
    const current = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (current.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const currentUser = current.rows[0];
    const mensajes = [];

    let hashedPassword = currentUser.password;

    // Verificar qué campos se modificaron
    const nameChanged = name !== currentUser.name;
    const emailChanged = email !== currentUser.email;
    const passwordChanged = password && password.trim() !== '';

    if (nameChanged) mensajes.push("Nombre editado exitosamente.");
    if (emailChanged) mensajes.push("Correo editado exitosamente.");
    if (passwordChanged) {
      hashedPassword = await bcrypt.hash(password, 10);
      mensajes.push("Contraseña editada exitosamente.");
    }

    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
      [name, email, hashedPassword, id]
    );

    const updatedUser = result.rows[0];
    delete updatedUser.password;

    if (mensajes.length === 0) {
      mensajes.push("Usuario actualizado sin cambios visibles.");
    }

    // 🔥 Esta línea es esencial
    return res.json({ user: updatedUser, mensajes });

  } catch (error) {
    console.error("Error updating user:", error);
    next(error);
  }
};

// Asegúrate de tener esta línea al inicio del archivo
const jwt = require('jsonwebtoken'); 
// Para poder acceder a JWT_SECRET
require('dotenv').config(); 


const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generar token JWT
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Puedes ajustar el tiempo de expiración
    );


    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token // Enviamos el token al frontend
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updatingUser,
  loginUser
};
