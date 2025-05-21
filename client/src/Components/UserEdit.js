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
  const [successMessages, setSuccessMessages] = useState([]);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/users/${id}`);
        const data = await res.json();
        setUser({ name: data.name, email: data.email, password: '' });
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
    setError(null);

    const userToUpdate = {
      name: user.name,
      email: user.email,
    };

    if (user.password.trim() !== '') {
      userToUpdate.password = user.password;
    }

    try {
      const res = await fetch(`http://localhost:4000/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userToUpdate),
      });

      const data = await res.json();
      console.log("🔵 Respuesta del backend:", data);

      if (!res.ok) {
        setLoading(false);
        setError(data.message || "Error al actualizar");
        return;
      }

      if (Array.isArray(data.mensajes)) {
        setSuccessMessages(data.mensajes);
        setTimeout(() => {
          navigate('/User/List');
        }, 3000);
      } else {
        console.warn("⚠️ El backend no devolvió 'mensajes' como array:", data.mensajes);
        setSuccessMessages(["Usuario actualizado."]);
      }

      const currentUser = JSON.parse(localStorage.getItem("user"));
      if (currentUser && currentUser.id === data.user.id) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      setLoading(false);

    } catch (error) {
      console.error("Error al actualizar:", error);
      setError("Error del servidor");
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
              {successMessages.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                  {successMessages.map((msg, index) => (
                    <Typography key={index} color="success.main">
                      ✅ {msg}
                    </Typography>
                  ))}
                </div>
              )}

              {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  ❌ {error}
                </Typography>
              )}

              <TextField
                variant="filled"
                label="Edit your name"
                fullWidth
                sx={{ margin: '.5rem 0' }}
                name="name"
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
                name="email"
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
                name="password"
                type="password"
                value={user.password}
                onChange={handleChange}
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
                  <CircularProgress color="inherit" size={24} />
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
