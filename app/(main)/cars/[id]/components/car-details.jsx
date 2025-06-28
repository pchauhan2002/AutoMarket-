"use client"
import { toggleSavedCar } from '@/actions/car-listing';
import { Button } from '@/components/ui/button';
import useFetch from '@/hooks/use-fetch';
import { useAuth } from '@clerk/nextjs';
import { Car, Heart, Share2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const CarDetails = ({car,testDriveInfo}) => {
    const router=useRouter();
    const{isSignedIn}=useAuth();
    const [isWishlisted, setIsWishlisted] = useState(car.wishlisted);
    const [currentImageIndex,setCurrentImageIndex]=useState(0);

    const{
      loading:savingCar,
      fn:toggleSavedCarFn,
      data:toggleResult,
      error:toggleError,
    }=useFetch(toggleSavedCar);

    useEffect(() => {
        if (toggleResult?.success && toggleResult.saved !== isSaved) {
        setIsWishlisted(toggleResult.saved);
        toast.success(toggleResult.message);
        }
    }, [toggleResult, isWishlisted]);
    useEffect(() => {
        if (toggleError) {
        toast.error("Failed to update favorites");
        }
    }, [toggleError]);

    const handleSaveCar=async()=>{
        if(!isSignedIn){
            toast.error("please sign in to save cars");
            router.push("/sign-in");
            return;
        }
        if(savingCar)
            return;
        await toggleSavedCarFn(car.id);
    };
  return (
    <div>
      <div className='flex flex-col lg:flex-row gap-8'>
        <div className='w-full lg:w-7/12'>
          <div className='aspect-video rounded-lg overflow-hidden relative mb-4'>
            {car.images && car.images.length>0 ?(
            <Image
            src={car.images[currentImageIndex]}
            alt={`${car.year} ${car.make} ${car.model}`}
            fill
            className='object-cover'
            priority
            />
          ):(
            <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
              <Car className='h-24 w-24 text-gray-400'/>
            </div>
          )}</div>
          {car.images && car.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {car.images.map((image, index) => (
                <div
                  key={index}
                  className={`relative cursor-pointer rounded-md h-20 w-24 flex-shrink-0 transition ${
                    index === currentImageIndex
                      ? "border-2 border-blue-600"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image
                    src={image}
                    alt={`${car.year} ${car.make} ${car.model} - view ${
                      index + 1
                    }`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex mt-4 gap-4">
            <Button
              variant="outline"
              className={`flex items-center gap-2 flex-1 ${
                isWishlisted ? "text-red-500" : ""
              }`}
              onClick={handleSaveCar}
              disabled={savingCar}
            >
              <Heart
                className={`h-5 w-5 ${isWishlisted ? "fill-red-500" : ""}`}
              />
              {isWishlisted ? "Saved" : "Save"}
            </Button>
            
          </div>
        </div>
      </div>
    </div>
  )
}
export default CarDetails;
