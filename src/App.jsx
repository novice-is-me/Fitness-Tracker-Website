import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';
import { Container } from 'react-bootstrap';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Workout from './pages/Workout';
import AddWorkouts from './components/AddWorkouts';
import AppNavbar from './components/AppNavbar';
import Logout from './pages/Logout';

export const DataContext = createContext();

function App() {

  const [token, setToken] = useState('');
  
  useEffect(() => {
    setToken(localStorage.getItem('token'));
  },[token]);
  
  return (
    <>
    <Router>
      <DataContext.Provider value={{token, setToken}}>
        <AppNavbar/>
        <Container>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/workouts" element={<Workout/>} />
              <Route path="/add-workouts" element={<AddWorkouts/>} />
              <Route path='/logout' element={<Logout/>}/>
          </Routes>
        </Container>
      </DataContext.Provider>
    </Router>
    </>
  )
}

export default App
