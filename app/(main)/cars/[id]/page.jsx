import { getCarById } from '@/actions/car-listing';
import React from 'react'
import CarDetails from './components/car-details';
import NotFound from '@/app/not-found';

export default async function CarPage({ params }) {
  // Fetch car details
  const { id } = await params;
  const result = await getCarById(id);
  console.log('Result from getCarById:', result);

  // If car not found, show 404
  if (!result.success) {
    return <div>dnacjndcjkndwc</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <CarDetails car={result.data}  />
    </div>
  );
}
