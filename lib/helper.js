export const serializedCarData=(car,wishlisted=false) => {
    return{
        ...car,
        price:car.price ? parseFloat(car.price.toString()) : 0,
        createdAt:car.createdAt ?.toISOString(),
        updatedAt: car.updatedAt ?.toISOString(),
        wishlisted: wishlisted,
    };
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0, // Optional: removes ".00"
  }).format(amount);
};

