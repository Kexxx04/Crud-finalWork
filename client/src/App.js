import { BrowserRouter, Routes, Route }  from "react-router-dom";
import UserList from "./Components/UserList";
import UserForm from "./Components/UserForm";
import {Container} from "@mui/material";
import Menu from './Components/Navbar';
import LogIn from "./Components/LogIn";
import UserEdit from "./Components/UserEdit";

export default  function App(){
  return (
  <BrowserRouter>
  <Menu />
    <Container>
     <Routes>
      <Route path="/User/LogIn" element={<LogIn />} />
      <Route path="/User/new" element={<UserForm />}/>
      <Route path="/User/List" element={<UserList />}/>
      <Route path="/User/:id/Edit" element={<UserEdit />}/>
    </Routes>
   </Container>
  </BrowserRouter>
  );
}