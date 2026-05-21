import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app=express();
app.use(cors({
    origin:"*"
}));


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
    try{
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key":process.env.GEMINI_API_KEY
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt
                  }
                ]
              }
            ]
          })
        });
        const data = await response.json();
        res.json(data);
    }
    catch {
        res.status(500).json({error:"Error generating content"});
    }

});
const PORT=process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
});
