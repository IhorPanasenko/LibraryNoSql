
import './App.css';
import LoginPage from './pages/loginPage/LoginPage';
import HomePage from './pages/homePage/HomePage';
import CreatePage from './pages/createPage/CreatePage';
import UpdatePage from './pages/updatePage/UpdatePage';
import RegisterPage from './pages/registerPage/RegisterPage';
import UserHomePage from './pages/userHomePage/UserHomePage';
import UserProfile from './pages/MyProfile/UserProfile';
import EditProfile from './pages/editProfilePage/EditProfile';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path ="/Home" element={<HomePage/>}/>
        <Route path ="/CreateBook" element={<CreatePage/>}/>
        <Route path ="/UpdatePage/:id" element={<UpdatePage/>}/>
        <Route path = '/UserHome' element ={<UserHomePage/>}/>
        <Route path= '/UserProfile' element = {<UserProfile/>}/>
        <Route path ='/EditProfile' element = {<EditProfile/>}/>
        {/* Default Router */}
				<Route path="/" element={<Navigate to="/Login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
