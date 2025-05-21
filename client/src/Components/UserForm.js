import { Grid, Typography, Card, CardContent, TextField, Button, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // estado para errores

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // limpiar errores anteriores

    try {
      const res = await fetch('http://localhost:4000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Ocurrió un error');
        setLoading(false);
        return;
      }

      // Usuario creado exitosamente
      navigate('/User/LogIn');
    } catch (err) {
      setError('Error de red o el servidor no está disponible');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
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
            Create User
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Write your name"
                fullWidth
                sx={{ margin: '.5rem 0' }}
                name='name'
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant="filled"
                type="email"
                label="Write your email"
                fullWidth
                sx={{ margin: '.5rem 0' }}
                name='email'
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField
                variant="filled"
                label="Write your password"
                type="password"
                fullWidth
                sx={{ margin: '.5rem 0' }}
                name='password'
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}

              <Button
                variant="contained"
                color="secondary"
                type="submit"
                fullWidth
                disabled={!user.name || !user.email || !user.password || loading}
              >
                {loading ? (
                  <CircularProgress color='inherit' size={24} />
                ) : 'Create'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
