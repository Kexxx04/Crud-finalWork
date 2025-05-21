import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Recuperar datos del usuario y token
  let user = null;
  

  try {
    const rawUser = localStorage.getItem("user");
    

    if (rawUser && rawUser !== "undefined") {
      user = JSON.parse(rawUser);
    }

    
  } catch (e) {
    console.error("Error leyendo localStorage:", e);
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    navigate("/User/LogIn");
  };

  const isEditingUser = /^\/User\/\d+\/Edit$/.test(location.pathname);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, color: '#eee' }}>
              {user ? `Welcome, ${user.name}` : 'My Crudd'}
            </Typography>

            {isEditingUser && (
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => navigate('/User/List')}
                sx={{ mr: 1 }}
              >
                return
              </Button>
            )}

            {user  ? (
              <Button
                variant="contained"
                color="error"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate("/User/LogIn")}
                  sx={{ mr: 1 }}
                >
                  Log in
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate("/User/new")}
                >
                  New User
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
