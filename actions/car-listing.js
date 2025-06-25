import { db } from "@/lib/prisma";

export async function getCarFilters(){
    try{  
        const makes =await db.car.findMany({
            where:{ status :"AVAILABLE"},
            select:{make:true},
            distinct:["make"],
            orderBy:{make:"asc"},
        });
        const bodyTypes = await db.car.findMany({
            where: { status: "AVAILABLE" },
            select: { bodyType: true },
            distinct: ["bodyType"],
            orderBy: { bodyType: "asc" },
        });
        const fuelTypes = await db.car.findMany({
            where: { status: "AVAILABLE" },
            select: { fuelType: true },
            distinct: ["fuelType"],
            orderBy: { fuelType: "asc" },
        });
        const transmissions = await db.car.findMany({
            where: { status: "AVAILABLE" },
            select: { transmission: true },
            distinct: ["transmission"],
            orderBy: { transmission: "asc" },
        });
        const priceAggregations = await db.car.aggregate({
            where: { status: "AVAILABLE" },
            _min: { price: true },
            _max: { price: true },
        });
     }catch(error){
        
    }
}