import { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const loadUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:4000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("No autorizado");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("🔴 Error de autenticación:", error);
      localStorage.removeItem("token");
      navigate("/User/LogIn");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("Error deleting user");
        return;
      }

      setUsers(users.filter((user) => user.id !== id));

      const loggedUser = JSON.parse(localStorage.getItem("user"));
      if (loggedUser && loggedUser.id === id) {
        localStorage.removeItem("user");
        navigate("/User/LogIn");
      }
    } catch (error) {
      console.log(error);
      alert("Error del servidor al eliminar el usuario.");
    }
  };

  // ✅ Ejecutar verificación de token y carga
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/User/LogIn");
    } else {
      loadUsers();
    }
  }, []);

  // ✅ Prevenir navegación atrás sin confirmar
  useEffect(() => {
    const handlePopState = () => {
      const confirmExit = window.confirm("¿Deseas volver al login y cerrar sesión?");
      if (confirmExit) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/User/LogIn");
      } else {
        window.history.pushState(null, null, window.location.pathname);
      }
    };

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  return (
    <>
      <h1>User List</h1>
      {users.map((user) => (
        <Card
          key={user.id}
          style={{
            marginBottom: ".7rem",
            backgroundColor: "#1e272e",
          }}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ color: "white" }}>
              <Typography>name: {user.name}</Typography>
              <Typography>email: {user.email}</Typography>
              <Typography>password: {user.password}</Typography>
            </div>

            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate(`/User/${user.id}/Edit`)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleDelete(user.id)}
                style={{ marginLeft: ".5rem" }}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
