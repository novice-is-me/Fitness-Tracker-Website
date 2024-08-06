import React from 'react';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import EditWorkout from '../components/EditWorkout';
import UpdateStatusWorkout from '../components/UpdateStatusWorkout';
import DeleteWorkout from '../components/DeleteWorkout';

const Workout = () => {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true); 

    const data = localStorage.getItem('token');

    const fetchData = () => {
        fetch(`${import.meta.env.VITE_API_URL}/workouts/getMyWorkouts`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.message === "No Workouts found.") {
                setWorkouts([]);
            } else {
                setWorkouts(data.workouts);
            }
            setLoading(false); 
        }).catch(error => {
            console.error('Error fetching workouts:', error);
            setLoading(false); 
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>; 
    }

    return (
        <>
            {data ?
             <>
                 <h1 className='text-center my-4'>Your Workouts</h1>
                 <div className='d-flex mb-5 justify-content-center gap-4'>
                    <Link to='/add-workouts' className='btn btn-info'>Add Workout</Link>
                 </div>
                 <Table striped bordered hover responsive>
                    <thead>
                        <tr className="text-center">
                            <th>ID</th>
                            <th>Name</th>
                            <th>Duration</th>
                            <th>Status</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workouts.length > 0 ? workouts.map((workout) => (
                            <tr key={workout._id}>
                                <td>{workout._id}</td>
                                <td>{workout.name}</td>
                                <td>{workout.duration}</td>
                                <td className={workout.status === 'completed' ? "text-success" : "text-danger"}>
                                    {workout.status === 'completed' ? "Completed" : "Pending"}
                                </td>
                                <td className="text-center d-flex gap-2">
                                    <EditWorkout workout={workout} fetchData={fetchData} />
                                    <UpdateStatusWorkout workout={workout} fetchData={fetchData} />
                                    <DeleteWorkout workoutId={workout._id} fetchData={fetchData} />
                                </td>
                            </tr>
                        )) : 
                        <tr>
                            <td colSpan="6" className="text-center">No workouts found.</td>
                        </tr>}
                    </tbody>
                </Table>
            </> :
            <>
                <Navigate to='/login'/>
            </> }
        </>
    );
};

export default Workout;
