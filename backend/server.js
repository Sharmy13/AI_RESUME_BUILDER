import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app=express();
//app.use(cors({
   // origin:"*"
//}));
// const express = require('express');
const cors = require('cors');
const app = express();

// Allow requests from your frontend domain (e.g., localhost or your production URL)
app.use(cors({ origin: 'http://localhost:5173' })); 


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());
app.post("/generate",async(req,res)=>{
    const {formData}=req.body;
    const prompt=`
    you are a professional career caoch and optimizationnexpert
    Company Name: ${formData.companyname}
Experience Level: ${formData.applyingasa}  (Fresher / Experienced)
Job Description: ${formData.jobDescription}
Current Resume: ${formData.currentResume} 
      `;
            try {
            let response = await fetch(`https://airesumebuilder-production-7fff.up.railway.app/generate`, t);
            
            // Check if the response is successful (status 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            let e = await response.json();
            console.log(`Generated Gemini Data:`, e);
            
            // Use optional chaining to prevent crashing if the path doesn't exist
            const text = e?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
                console.log(`Text:`, text);
                r(text);
            }
        } catch (e) {
            // This will now catch both network 'Failed to fetch' and manual HTTP errors
            console.error("Fetch request failed:", e);
        }
});
const PORT=process.env.PORT ||8080;
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
});
