import React from 'react';
import { useState, useEffect, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../App'

const Login = () => {

  const { setToken } = useContext(DataContext);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isActive, setIsActive] = useState(false)

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(res => res.json())
    .then(data => {
      console.log(data)
      if(data){
        setEmail('')
        setPassword('')
        localStorage.setItem('token', data.access);
        setToken(data.access);
        
        Swal.fire({
          title: 'Login Successful',
          text: "You're now logged in",
          icon: 'success'
        })

        navigate('/workouts') 
      }else{
        Swal.fire({
          title: 'Login Failed',
          text: 'Invalid email or password',
          icon: 'error'
        })
      }
    })
  }

  useEffect(() => {
    if(email !== '' && password !== ''){
        setIsActive(true);
    }else{
        setIsActive(false);
    }

  }, [email, password]);

  return (  
    <>
    <h1 className="my-5 text-center color-secondary">Login</h1>
    <Form onSubmit={(e) => handleLogin(e)} className='border p-3'>
      <Form.Group>
        <Form.Label>Email address</Form.Label>
        <Form.Control 
        type="email" 
        placeholder="Enter email" 
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        type="password" 
        placeholder="Password" 
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      
      { isActive ? 
        <Button variant="primary" type="submit" id="loginBtn">
        Login
        </Button>
        : 
        <Button variant="danger" type="submit" id="loginBtn" disabled>
        Login
        </Button>
      }
    </Form> 
    </>
  )
}

export default Login
