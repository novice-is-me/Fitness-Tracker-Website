import React, { useContext } from 'react'
import { DataContext } from '../App'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {

  const { token } = useContext(DataContext);

  return (
    <div className=' py-5'>
      <h1 className=' fs-1 text-center'>Welcome to Fitness Tracker Website</h1>
      <div className=' d-flex justify-content-center my-4'>
        {token ? 
          <Button variant='primary' as={Link} to='/workouts'>My Workouts</Button>
          : 
          <Button variant='primary' as={Link} to='/login'>Login</Button>
        }
      </div>
    </div>
  )
}

export default Home
