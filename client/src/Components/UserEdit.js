import {
  Grid,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  CircularProgress
} from '@mui/material';

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function UserEdit() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Cargar datos del usuario sin mostrar la contraseña
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch(`http://localhost:4000/users/${id}`);
        const data = await res.json();
        setUser({ name: data.name, email: data.email, password: '' }); // ¡No mostrar la contraseña hasheada!
      } catch (error) {
        console.error("Error al cargar el usuario:", error);
      }
    };

    if (id) loadUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Clonamos el objeto
    const userToUpdate = {
      name: user.name,
      email: user.email
    };

    // Solo enviamos la contraseña si se digitó
    if (user.password.trim() !== '') {
      userToUpdate.password = user.password;
    }

    try {
      const res = await fetch(`http://localhost:4000/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userToUpdate),
      });

      const data = await res.json();

      // Asegúrate que el backend esté devolviendo { user: {...} }
      localStorage.setItem("user", JSON.stringify(data.user));
      setLoading(false);
      navigate('/User/List');
    } catch (error) {
      console.error("Error al actualizar:", error);
      setLoading(false);
    }
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '80vh' }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card
          sx={{
            mt: 5,
            backgroundColor: '#1e272e',
            padding: '1rem'
          }}
        >
          <Typography variant="h5" textAlign="center" color="white">
            Edit User
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Edit your name"
                fullWidth
                sx={{ margin: '.5rem 0' }}
                name='name'
                value={user.name}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant="filled"
                label="Edit your email"
                fullWidth
                sx={{ margin: '.5rem 0' }}
                name='email'
                value={user.email}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant="filled"
                label="New password (optional)"
                fullWidth
                sx={{ margin: '.5rem 0' }}
                name='password'
                value={user.password}
                onChange={handleChange}
                type="password"
                placeholder="Leave blank to keep current password"
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                fullWidth
                disabled={!user.name || !user.email} 
              >
                {loading ? (
                  <CircularProgress color='inherit' size={24} />
                ) : (
                  'Update'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
