import React from 'react'
import CarsList from './components/car-list';


const CarsPage = () => {
  return (
    <div>
        <h1 className="text-2xl font-bold mb-6">Cars Management</h1>
        <CarsList/>
    </div>
  )
};

export default CarsPage;
