import './App.css';
import LoginPage from './pages/loginPage/LoginPage';
import HomePage from './pages/homePage/HomePage';
import CreatePage from './pages/createPage/CreatePage';
import UpdatePage from './pages/updatePage/UpdatePage';
import RegisterPage from './pages/registerPage/RegisterPage';
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
        {/* Default Router */}
				<Route path="/" element={<Navigate to="/Login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
