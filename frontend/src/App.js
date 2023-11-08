import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link, Router } from "react-router-dom";
import Login from './authService/login';
import Register from './authService/register';

function App() {
  return (
      <div>
        <Routes>
              <Route exact path="/login" element={<Login /> } />
              <Route exact path="/register" element={<Register />} />
        </Routes>
      </div>
  );
}

export default App;
