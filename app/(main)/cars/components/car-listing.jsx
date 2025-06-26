
"use client";
import { getCars } from '@/actions/car-listing';
import CarCard from '@/components/car-card';
import useFetch from '@/hooks/use-fetch';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
export function CarListings() {
    const searchParams=useSearchParams();
    const router=useRouter();
    const[currentPage,setCurrentPage]=useState(1);
    const limit=6;

    const search = searchParams.get("search") || "";
    const make = searchParams.get("make") || "";
    const bodyType = searchParams.get("bodyType") || "";
    const fuelType = searchParams.get("fuelType") || "";
    const transmission = searchParams.get("transmission") || "";
    const minPrice = searchParams.get("minPrice") || 0;
    const maxPrice = searchParams.get("maxPrice") || Number.MAX_SAFE_INTEGER;
    const sortBy = searchParams.get("sortBy") || "newest";
    const page = parseInt(searchParams.get("page") || "1");

    const{loading,fn:fetchCars,data:result,error}=useFetch(getCars);

    useEffect(() => {
        fetchCars({
            search,
            make,
            bodyType,
            fuelType,
            transmission,
            minPrice,
            maxPrice,
            sortBy,
            page,
            limit,
        });
    }, [
        search,
        make,
        bodyType,
        fuelType,
        transmission,
        minPrice,
        maxPrice,
        sortBy,
        page,
    ]);
    if(!result || !result.data){
        return null;
    }
    const { data: cars, pagination } = result;
    if(cars.length==0){
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-8 border rounded-lg bg-gray-50">
                <h3 className="text-lg font-medium mb-2">No cars found</h3>
                <p className="text-gray-500 mb-6 max-w-md">
                    We couldn't find any cars matching your search criteria. Try adjusting
                    your filters or search term.
                </p>
            </div>
        );
    }
    return <div>
        <div className='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  gap-6 w-full'>
            {cars.map((car)=>(
                <CarCard key={car.id} car={car}/>
            ))}
        </div>
    </div>;
};

export default CarListings;