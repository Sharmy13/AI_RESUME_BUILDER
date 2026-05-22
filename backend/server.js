import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, "../dist");

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(express.static(distPath));

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
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              
            },
            body: JSON.stringify({
              prompt: {
                text: prompt,
              },
            }),
          }
        );

        if (!response.ok) {
          const errorBody = await response.text();
          console.error("Google API error response:", response.status, errorBody);
          return res.status(response.status).json({
            error: "Google API request failed",
            status: response.status,
            details: errorBody,
          });
        }

        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error('Error generating content:', err);
        res.status(500).json({ error: "Error generating content", details: err?.message });
    }

});

app.get("/", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);

});

