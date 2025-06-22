"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';


const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid", "Plug-in Hybrid"];
const transmissions = ["Automatic", "Manual", "Semi-Automatic"];
const bodyTypes = [
  "SUV",
  "Sedan",
  "Hatchback",
  "Convertible",
  "Coupe",
  "Wagon",
  "Pickup",
];
const carStatuses = ["AVAILABLE", "UNAVAILABLE", "SOLD"];

const AddCarForm = () => {
    const [activeTab,setActiveTab]=useState("ai");
    const carFormSchema = z.object({
    make: z.string().min(1, "Make is required"),
    model: z.string().min(1, "Model is required"),
    year: z.string().refine((val) => {
      const year = parseInt(val);
      return !isNaN(year) && year >= 1900 && year <= new Date().getFullYear() + 1;
    }, "Valid year required"),
    price: z.string().min(1, "Price is required"),
    mileage: z.string().min(1, "Mileage is required"),
    color: z.string().min(1, "Color is required"),
    fuelType: z.string().min(1, "Fuel type is required"),
    transmission: z.string().min(1, "Transmission is required"),
    bodyType: z.string().min(1, "Body type is required"),
    seats: z.string().optional(),
    description: z.string().min(10, "Description must be at least 10 characters"),
    status: z.enum(["AVAILABLE", "UNAVAILABLE", "SOLD"]),
    featured: z.boolean().default(false),
    // Images are handled separately
  });
  const{
    register,
    setValue,
    getValues,
    formState:{errors},
    handleSubmit,
    watch,
  }=useForm({
    resolver:zodResolver(carFormSchema),
    defaultValues: {
      make: "",
      model: "",
      year: "",
      price: "",
      mileage: "",
      color: "",
      fuelType: "",
      transmission: "",
      bodyType: "",
      seats: "",
      description: "",
      status: "AVAILABLE",
      featured: false,
    },
  });

  const onSubmit= async(data)=>{};

  return (
    <div>
      <Tabs
        defaultValue="ai" 
        className="mt-6"
        value={activeTab}
        onValueChange={setActiveTab}
        >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="manual">Manual Entry</TabsTrigger>
        <TabsTrigger value="ai">AI Upload</TabsTrigger>
      </TabsList>
      <TabsContent value="manual" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Car Details</CardTitle>
            <CardDescription>
              Enter Car Info
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form 
              onSubmit={handleSubmit(onSubmit)}
              className='space-y-6'
            >
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                <div className='space-y-2'>
                  <Label htmlFor='make'>Make</Label>
                  <Input 
                    id='make' 
                    {...register("make")}
                    placeholder="e.g Toyata"
                    className={errors.make ? "border-red-500" : ""}
                  />
                  {errors.make && (
                    <p className='text-xs text-red-500'>
                      {errors.make.message}
                    </p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='model'>Make</Label>
                  <Input 
                    id='model' 
                    {...register("model")}
                    placeholder="e.g Camry"
                    className={errors.model ? "border-red-500" : ""}
                  />
                  {errors.model && (
                    <p className='text-xs text-red-500'>
                      {errors.model.message}
                    </p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='year'>Year</Label>
                  <Input 
                    id='year' 
                    {...register("year")}
                    placeholder="e.g 2022"
                    className={errors.year ? "border-red-500" : ""}
                  />
                  {errors.year && (
                    <p className='text-xs text-red-500'>
                      {errors.year.message}
                    </p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='price'>Price</Label>
                  <Input 
                    id='price' 
                    {...register("price")}
                    placeholder="e.g 250000"
                    className={errors.price ? "border-red-500" : ""}
                  />
                  {errors.price && (
                    <p className='text-xs text-red-500'>
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='mileage'>Price</Label>
                  <Input 
                    id='mileage' 
                    {...register("mileage")}
                    placeholder="e.g 250000"
                    className={errors.mileage ? "border-red-500" : ""}
                  />
                  {errors.mileage && (
                    <p className='text-xs text-red-500'>
                      {errors.mileage.message}
                    </p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='color'>Price</Label>
                  <Input 
                    id='color' 
                    {...register("color")}
                    placeholder="e.g 250000"
                    className={errors.color ? "border-red-500" : ""}
                  />
                  {errors.color && (
                    <p className='text-xs text-red-500'>
                      {errors.color.message}
                    </p>
                  )}
                </div>
                
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="ai" className="mt-6">
        Change your password here.
      </TabsContent>
    </Tabs>
    </div>
  )
};

export default AddCarForm;