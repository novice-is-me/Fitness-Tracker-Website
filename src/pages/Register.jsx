import React from 'react'
import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isActive, setIsActive] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    if (
      email !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email,password, confirmPassword]);

  const registerUser = (e) => {
    e.preventDefault();
    
    fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.message === "Registered Successfully") {
          setEmail("");
          setPassword("");
          setConfirmPassword("");

          Swal.fire({
            title: "Success",
            text: data.message,
            icon: "success",
            confirmButtonText: "Ok",
          })

          navigate("/login");
        } else {
          Swal.fire({
            title: "Something went wrong.",
            icon: "error",
            text: "Please try again later or contact us for assistance",
          })
        }
    })
  }

  return (
    <>
      <Form onSubmit={(e) => registerUser(e)}>
        <h1 className="my-4 text-center color-secondary">Register</h1>
        <div className=" border p-4">
          <Form.Group className="mb-2">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </Form.Group>
          {isActive ? (
            <Button variant="primary" type="submit" id="submitBtn">
              Submit
            </Button>
          ) : (
            <Button variant="danger" type="submit" id="submitBtn" disabled>
              Submit
            </Button>
          )}
        </div>
    </Form>
    </>
  )
}

export default Register
