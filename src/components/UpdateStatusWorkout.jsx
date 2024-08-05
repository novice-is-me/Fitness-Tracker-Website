import React from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const UpdateStatusWorkout = ({ fetchData, workout }) => {
    const markAsCompleted = () => {
        fetch(`${import.meta.env.VITE_API_URL}/workouts/completeWorkoutStatus/${workout._id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                status: 'completed'
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log('Response data:', data); 
            if (data.message === "Workout status updated successfully") {
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                    text: 'Workout status successfully updated'
                });
                fetchData();
            } else {
                Swal.fire({
                    title: 'Error!',
                    icon: 'error',
                    text: 'Please try again'
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error!',
                icon: 'error',
                text: 'An unexpected error occurred. Please try again.'
            });
        });
    };

    return (
        <Button variant="warning" size="sm" onClick={markAsCompleted}>
            Mark as Complete
        </Button>
    );
};

export default UpdateStatusWorkout;
