"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';
import Image from 'next/image';
import { Button } from './ui/button';
import { Heart, Loader2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { useRouter } from 'next/navigation';
import useFetch from '@/hooks/use-fetch';
import { toggleSavedCar } from '@/actions/car-listing';
import { useAuth } from '@clerk/nextjs';
import { toast } from 'sonner';
const CarCard = ({car}) => {
    const[isSaved,setIsSaved]=useState(car.wishlisted);
    const{isSignedIn} =useAuth();
    const{
        loading:isToggling,
        fn:toggleSavedCarFn,
        data:toggleResult,
        error:toggleError,
    }=useFetch(toggleSavedCar);

     useEffect(() => {
        if (toggleResult?.success && toggleResult.saved !== isSaved) {
        setIsSaved(toggleResult.saved);
        toast.success(toggleResult.message);
        }
    }, [toggleResult, isSaved]);
    useEffect(() => {
        if (toggleError) {
        toast.error("Failed to update favorites");
        }
    }, [toggleError]);

    
    const handleToggleSave=async(e)=>{
        e.preventDefault();
        e.stopPropagation();
        if(!isSignedIn){
            toast.error("please sign in to save cars");
            router.push("/sign-in");
            return;
        }
        if(isToggling)
            return;
        await toggleSavedCarFn(car.id);
    };
    const router=useRouter()
  return (
  <Card className="overflow-hidden hover:shadow-lg transition group">
    <div className="relative h-48">
        {car.images && car.images.length>0 ? (
            <div className="relative w-full h-full">
    <Image 
        src={car.images[0]} 
        alt={`${car.make} ${car.model}`} 
        fill
        className="object-cover group-hover:scale-105 transition duration-300"
    />
    </div>
        ):(
            <div></div>
        )}
    </div>
    <div>
    <Button 
        variant="ghost" 
        size="icon" 
        className={`${
             isSaved
                ? "text-red-500 hover:text-red-600"
                :"text-gray-600 hover:text-gray-900"
            }`}
        onClick={handleToggleSave}
    >
        {isToggling ?(
            <Loader2 className='h-4 w-4 animate-spin'/>
        ):(
            <Heart className={isSaved ? "fill-current" :""} size={20}/>   
        )}
    </Button>
    </div>
    <CardContent className="p-4">
        <div>
            <h3>{car.make}{car.model}</h3>
            <span className="text-x1 font-boold text-blue-600">
                <span className="text-x1 font-bold text-blue-600">
                {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                }).format(car.price)}
                </span>

            </span>
        </div>

        <div className='text gray-600 mb-2 flex items-center'>
            <span>{car.year}</span>
            <span className="mx-2">.</span>
            <span>{car.transmission}</span>
            <span className="mx-2"></span>
            <span>{car.fuelType}</span>
        </div>
        <div className="flex wrap gap-1 mb-4">
            <Badge variant="outline" className="bg-gray-50">
                {car.bodyType}
            </Badge>
            <Badge variant="outline" className="bg-gray-50">
                {car.mileage.toLocaleString()} miles
            </Badge>
            <Badge variant="outline" className="bg-gray-50">
                {car.color}
            </Badge>
            </div>
            <div className='flex justify-between'>
                <Button 
                    className=""
                    onClick={()=> router.push(`/cars/{${car.id}}`)}
                >
                    View Car
                </Button>
            </div>
    </CardContent>
  </Card>
  );
};

export default CarCard;
