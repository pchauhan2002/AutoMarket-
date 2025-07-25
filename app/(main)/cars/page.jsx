import { getCarFilters } from '@/actions/car-listing';
import React from 'react'
import CarFilter from './components/car-filter';
import CarListin from './components/car-listing';
import CarListings from './components/car-listing';

const CarsPage = async() => {
    const filtersData = await getCarFilters();
    return (
        <div className='container mx-auto px-4 py-12'>
            <h1 className='text-6xl mb-4 gradient-title'>Browse Cars</h1>
            <div className='flex flex-col lg:flex-row gap-8'>
                <div className='w-full lg:w-80 flex-shrink-0'>
                    {/*filters*/}
                    <CarFilter filters={filtersData.data}/>
                </div>
                <div>
                    {/*listing*/}
                    <CarListings />
                </div>
            </div>
        </div>
    );
}

export default CarsPage;
