import React, { useEffect } from 'react'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import WorkoutView from './WorkoutView'

const AddWorkouts = ({products}) => {

    const [name, setName] = useState('')
    const [duration, setDuration] = useState('');

    const navigate = useNavigate();

    const handleAdd = (e) =>{
        e.preventDefault();

        fetch(`${import.meta.env.VITE_API_URL}/workouts/addWorkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name,
                duration: duration
            })
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            if(data){
                Swal.fire({
                    title: 'Workout Added',
                    icon: 'success',
                    text: 'Workout has been added successfully.'
                })

                navigate ('/workouts')
            }else{
                Swal.fire({
                    title: 'Failed',
                    icon: 'error',
                    text: 'Something went wrong. Please try again later.'
                })
            }
        })
    }

    // useEffect(() =>{
    //     const workoutArray = products.map((product, i) =>{
    //         return (
    //             <WorkoutView productData={product} key={product._id}/>
    //         )
    //     })
    // },[])

  return (
    <div className=' p-5'>
        <h1 className=' text-center'>Adding Workout</h1>
        <Form className=' border p-5' onSubmit={(e) => handleAdd(e)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Workout Name</Form.Label>
                <Form.Control type="text" 
                    placeholder="Add Workout" 
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Duration</Form.Label>
                <Form.Control type='text'
                    placeholder="Duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    />
            </Form.Group>
            <Button type='submit' variant='danger'>Add</Button>
        </Form>
    </div>
  )
}

export default AddWorkouts
