import { Grid, Typography, Card, CardContent, TextField, Button, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogIn() {

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); 

    try {
      const res = await fetch('http://localhost:4000/users/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Login exitoso
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate('/User/List');

    } catch (error) {
      setLoading(false);
      setError("Error de conexión con el servidor.");
      console.error(error);
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
            Log in
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
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
                disabled={!user.email || !user.password || loading}
              >
                {loading ? <CircularProgress color='inherit' size={24} /> : 'Log in'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
