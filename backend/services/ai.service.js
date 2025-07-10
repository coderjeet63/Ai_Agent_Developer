import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  // You can also pass generationConfig/systemInstruction if needed
});

export const generateResult = async (prompt) => {
    const result = await model.generateContent(prompt) ;

    const response = await result.response;
    return await response.text();
  
};

