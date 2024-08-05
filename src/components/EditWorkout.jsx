import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

const EditWorkout = ({ fetchData, workout }) => {
    const [name, setName] = useState(workout.name);
    const [duration, setDuration] = useState(workout.duration);

    const [showEdit, setShowEdit] = useState(false);

    const openEdit = () => {
        setShowEdit(true);
    };

    const closeEdit = () => {
        setShowEdit(false);
    };

    const editWorkout = (e) => {
        e.preventDefault();
        fetch(`${import.meta.env.VITE_API_URL}/workouts/updateWorkout/${workout._id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                name: name,
                duration: duration
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === "Workout updated successfully") {
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                    text: 'Workout Successfully updated'
                });
                closeEdit();
                fetchData();
            } else {
                Swal.fire({
                    title: 'Error!',
                    icon: 'error',
                    text: 'Please try again'
                });
                closeEdit();
            }
        });
    };

    return (
        <div>
            <Button variant="primary" size="sm" onClick={openEdit}>Edit</Button>

            <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={editWorkout}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Workout</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="workoutName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="workoutDuration">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={duration}
                                onChange={e => setDuration(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeEdit}>Close</Button>
                        <Button variant="success" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default EditWorkout;
