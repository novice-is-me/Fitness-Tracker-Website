import React from 'react'
import { useEffect } from 'react'

const WorkoutView = ({workoutsData}) => {

    useEffect(() =>{
        const workoutArray = products.map((product, i) =>{
            return (
                <WorkoutView productData={product} key={product._id}/>
            )
        })
    },[])

  return (
    <>
        {workoutArray}
    </>
  )
}

export default WorkoutView
