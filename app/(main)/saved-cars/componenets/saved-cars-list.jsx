import CarCard from '@/components/car-card';
import React from 'react'

const SavedCarsList = ({initialData}) => {
    if(!initialData?.data || initialData?.data.length===0){
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-8 border rounded-lg bg-gray-50">
                <h3 className="text-lg font-medium mb-2">No Saved Cars</h3>
                <p className="text-gray-500 mb-6 max-w-md">
                    You haven't saved any cars yet. Browse our listings and click the
                    heart icon to save cars for later.
                </p>
            </div>
        );
    } 
    return(
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  gap-6 w-full'>
                {initialData.data?.map((car)=>(
                    <CarCard key={car.id} car={car}/>
                ))}
            </div>
        </div>
    );
}

export default SavedCarsList;
