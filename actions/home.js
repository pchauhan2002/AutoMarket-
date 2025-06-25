"use server";
import { serializedCarData } from "@/lib/helper";
import { db } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function getFeaturedCars(limit=3) {
    try{
        const cars=await db.car.findMany({
            where :{
                featured:true,
                status:"AVAILABLE",
            },
            take: limit,
            orderBy:{createdAt:"desc"},
        });
        return cars.map(serializedCarData);
    }catch(error){
        throw new Error("Error fetching featured cars"+ error.message);
    }
}

async function fileToBase64(file){
    const bytes= await file.arrayBuffer();
    const buffer= Buffer.from(bytes);
    return buffer.toString("base64");
}

export async function processImageSearch(file) {
    try{
        if(!process.env.GEMINI_API_KEY){
            throw new Error("Gemini API key is not configured");
        }
        const genAI =new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model=genAI.getGenerativeModel({model : "gemini-1.5-flash"});
        const base64Image =await fileToBase64(file);
        const ImagePart ={
            inlineData:{
                data: base64Image,
                mimeType: file.type,
            },
        };
        const prompt = `
        Analyze this car image and extract the following information for a search query:
        1. Make (manufacturer)
        2. Body type (SUV, Sedan, Hatchback, etc.)
        3. Color

        Format your response as a clean JSON object with these fields:
        {
            "make": "",
            "bodyType": "",
            "color": "",
            "confidence": 0.0
        }

        For confidence, provide a value between 0 and 1 representing how confident you are in your overall identification.
        Only respond with the JSON object, nothing else.
        `;
                    
        const result=await model.generateContent([ImagePart,prompt]);
        const response=await result.response;
        const text=response.text();
        const cleanedText=text.replace(/```(?:json)?\n?/g,"").trim();
        try{
            const carDetails =JSON.parse(cleanedText);
            return{
                success:true,
                data:carDetails,
            };
        }catch(error){
            console.error("Failed to parse AI respose",parseError);
            return{
                success:false,
                error:"Failed to parse AI response",
            };
        }

    }catch(error){
        throw new Error("AI Search error"+error.message);
    }
}