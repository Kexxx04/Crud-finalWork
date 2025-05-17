const pool = require('../db')
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res, next) => {
    try{
     const allUsers = await pool.query('SELECT * FROM users');
     res.json(allUsers.rows);
    }catch (error) {
        next(error);
    }
};

const getUser = async (req, res, next) => {
    try{
        const {id} = req.params

        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id])
    
        if(result.rows.length === 0) return res.status(404).json({message: 'User not found',});

        res.json(result.rows[0]);
    }catch (error){
        next(error)
    }
};

const createUser = async (req, res, next) => {
    const {name, email, password} = req.body
    try {
        const existing = await pool.query(
       'SELECT * FROM users WHERE name = $1 OR email = $2',
        [name, email]
        );
        if (existing.rows.length > 0) {
        return res.status(404).json({ message: 'Credential existing' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [
        name,
        email,
        hashedPassword
    ]);
     res.json(result.rows[0]);
    }catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {

    try{
        const {id} = req.params;

            const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id])

            if (result.rowCount === 0) return res.status(404).json({message: 'User not found',});

        return res.sendStatus(204);
    }catch{
        next(error);
    }

}

const updatingUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

   
    let hashedPassword;
    if (password && password.trim() !== '') {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    
    const queryText = password && password.trim() !== ''
      ? 'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *'
      : 'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *';

    const queryParams = password && password.trim() !== ''
      ? [name, email, hashedPassword, id]
      : [name, email, id];

    const result = await pool.query(queryText, queryParams);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    const updatedUser = result.rows[0];
    delete updatedUser.password;

    return res.json({ user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    next(error);
  }
};

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

    
    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      }
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
}