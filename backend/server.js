import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});



app.post("/generate", async (req, res) => {
  try {
    const { formData } = req.body;

    if (!formData) {
      return res.status(400).json({
        error: "Missing formData",
      });
    }

    const prompt = `
You are a professional career coach and resume optimization expert.

Company Name: ${formData.companyname}
Experience Level: ${formData.applyingasa}
Job Description: ${formData.jobDescription}
Current Resume: ${formData.currentResume}

Generate a professional cover letter and resume suggestions.
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log("Google API Response:", data);
    res.json(data);

    if (!response.ok) {
      console.error("Google API Error:", data);

      return res.status(response.status).json({
        error: "Google API request failed",
        details: data,
      });
    }

    return res.json(data);
  } catch (err) {
    console.error("Server Error:", err);

    return res.status(500).json({
      error: "Internal Server Error",
      details: err.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});