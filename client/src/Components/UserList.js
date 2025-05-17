import { useEffect, useState } from "react"
import {Button, Card, CardContent, Typography} from '@mui/material'
import {useNavigate} from 'react-router-dom'

export default  function UserList(){
  
  const [users, setUsers] = useState([])
  const navigate = useNavigate();

  const loadUsers = async () => {
    const response = await fetch('http://localhost:4000/users')
    const data = await response.json()
    setUsers(data)
  };

  const handleDelete = async (id) => {
  try {
      const res = await fetch(`http://localhost:4000/users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("Error deleting user");
        return;
      }

      // Eliminar el usuario de la lista visual
      setUsers(users.filter(user => user.id !== id));

      // Verificar si es el usuario logueado
      const loggedUser = JSON.parse(localStorage.getItem("user"));

      if (loggedUser && loggedUser.id === id) {
        localStorage.removeItem("user");
        navigate("/User/LogIn");
      }

    } catch (error) {
      console.log(error);
      alert("Error del servidor al eliminar el usuario.");
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  return (
    <>
      <h1>User List</h1>
      {
        users.map((user) => (
          <Card style={{
            marginBottom: ".7rem",
            backgroundColor: '#1e272e'
          }}
          key={user.id}
          >
           <CardContent style={{
             display: 'flex',
             justifyContent: 'space-between'
           }}>
            <div style={{color: 'white'}}>
                <Typography>name: {user.name}</Typography>
                <Typography>email: {user.email}</Typography>
                <Typography>password: {user.password}</Typography>
            </div>
          
            <div>
                 <Button variant="contained" color='inherit' onClick={() => navigate(`/User/${user.id}/Edit`)}>
                    Edit
                  </Button>
                  <Button variant="contained" 
                    color='warning' 
                    onClick={() => handleDelete(user.id)}
                    style={{ marginLeft: ".5rem"}}>
                    Delete
                  </Button>
            </div>
           
           </CardContent>
          </Card>
        ))}
    </>
  );
}