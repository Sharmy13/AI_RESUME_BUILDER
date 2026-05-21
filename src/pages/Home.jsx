// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";
function HomePage(){
  const [formData,setFormData]=useState({
    companyname:"",
    applyingasa:"Fresher",
    coverLetterTone:"Formal",
    jobDescription:"",
    currentResume:"",

  })
  const[geminiResponse,setGeminiResponse]=useState("");

  const formatInlineText = (text) => {
    return text.split(/(\*\*[^*]+\*\*)/g).map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={idx}>{part.slice(2, -2)}</strong>;
      }
      return <span key={idx}>{part}</span>;
    });
  };

  const renderResponseContent = () => {
    if (!geminiResponse) {
      return <div className="response-empty">Your response will appear here once generated.</div>;
    }

    const lines = geminiResponse.replace(/\r/g, "").split("\n");
    const items = [];
    let listItems = [];

    const flushList = () => {
      if (listItems.length > 0) {
        items.push(
          <ul className="response-list" key={`list-${items.length}`}>
            {listItems.map((item, index) => (
              <li key={index}>{formatInlineText(item)}</li>
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) {
        flushList();
        items.push(<div className="response-separator" key={`sep-${index}`} />);
        return;
      }

      if (trimmed.startsWith("### ")) {
        flushList();
        items.push(
          <h3 className="response-subheading" key={`h3-${index}`}>
            {trimmed.slice(4)}
          </h3>
        );
        return;
      }

      if (trimmed.startsWith("## ")) {
        flushList();
        items.push(
          <h2 className="response-heading" key={`h2-${index}`}>
            {trimmed.slice(3)}
          </h2>
        );
        return;
      }

      if (trimmed.startsWith("# ")) {
        flushList();
        items.push(
          <h1 className="response-main-heading" key={`h1-${index}`}>
            {trimmed.slice(2)}
          </h1>
        );
        return;
      }

      if (/^(\*|- )\s+/.test(trimmed) || trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
        listItems.push(trimmed.replace(/^(\*|- )\s+/, ""));
        return;
      }

      if (/^\d+\.\s+/.test(trimmed)) {
        flushList();
        items.push(
          <p className="response-step" key={`step-${index}`}>
            {formatInlineText(trimmed)}
          </p>
        );
        return;
      }

      items.push(
        <p className="response-paragraph" key={`p-${index}`}>
          {formatInlineText(trimmed)}
        </p>
      );
    });

    flushList();
    return items;
  };
 async function handleGenerateData(){
    console.log("FormData:",formData);
    const prompt=`
     You are a professional career coach and resume optimization expert. 
Your task is to generate a personalized cover letter, improve the resume content, 
and provide an ATS (Applicant Tracking System) analysis.

Inputs:
Company Name: ${formData.companyname}
Experience Level: ${formData.applyingasa}  (Fresher / Experienced)
Job Description: ${formData.jobDescription}
Current Resume: ${formData.currentResume} (If empty, assume no resume exists and create a draft)
Preferred Tone: ${formData.coverLetterTone}

Output (format clearly in sections):

1. **Tailored Cover Letter**  
Write a professional cover letter addressed to ${formData.companyname}.  
Use the specified tone: ${formData.coverLetterTone}.  
Highlight relevant skills and experiences based on the job description.  

2. Updated Resume Content  
Suggest optimized resume summary, bullet points, and skills tailored to ${formData.jobDescription}.  
Ensure the content is concise, achievement-focused, and ATS-friendly.  

3. Keyword Match Analysis  
Extract the most important keywords from the job description.  
Check if they exist in the provided resume (if given).  
List missing keywords that should be added.  

4. **ATS Score Estimate (0–100) ** 
Provide a rough ATS match score for the current resume against the job description.  
Explain the reasoning briefly (e.g., missing keywords, formatting issues, irrelevant content). 


Ensure the response is structured, clear, and easy to display in a React app.`; 
    const url = "http://localhost:5000/generate";
const options = {
  method: "POST",
  headers: {
    'content-type': 'application/json',
    
  },
  body: JSON.stringify({ formData })
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log("Generated Gemini Data:",data);
  console.log("Generated Gemini Data:",data.candidates[0].content.parts[0].text);
  setGeminiResponse(data.candidates[0].content.parts[0].text);
} catch (error) {
  console.error(error);
}
  }
//AIzaSyDLJtoP_J0KMdrRnYbiuPiBcsvHjMLXrKo
    return (
    <>
      <main className="page-container">
        <header className="page-hero">
          <div>
            <p className="eyebrow">Resume Builder</p>
            <h1>Gemini-powered Cover Letter & Resume Assistant</h1>
            <p className="hero-copy">
              Enter your company, job details, and resume draft to generate a professional,
              ATS-friendly output in one click.
            </p>
          </div>
        </header>

        <section className="home-grid">
          <div className="home-card form-card">
            <div className="section-header">
              <h2>Application details</h2>
              <p>Fill in the job description and resume fields below.</p>
            </div>

            <form className="resume-form">
              <div className="field-group">
                <label htmlFor="companyname">Company name</label>
                <input
                  type="text"
                  id="companyname"
                  placeholder="e.g. Acme Corporation"
                  value={formData.companyname}
                  onChange={(e)=>setFormData({...formData,companyname:e.target.value})}
                />
              </div>

              <div className="form-row">
                <div className="field-group">
                  <label htmlFor="Applying as a">Applying as</label>
                  <select
                    id="Applying as a"
                    value={formData.applyingasa}
                    onChange={(e)=>setFormData({...formData,applyingasa:e.target.value})}
                  >
                    <option value="FRESHER">FRESHER</option>
                    <option value="EXPERNCED">EXPERIENCED</option>
                  </select>
                </div>

                <div className="field-group">
                  <label htmlFor="cover letter tone">Cover letter tone</label>
                  <select
                    id="cover letter tone"
                    value={formData.coverLetterTone}
                    onChange={(e)=>setFormData({...formData,coverLetterTone:e.target.value})}
                  >
                    <option value="Formal">Formal</option>
                    <option value="Informal">Informal</option>
                    <option value="Casual">Casual</option>
                  </select>
                </div>
              </div>

              <div className="field-group">
                <label htmlFor="job description">Job description</label>
                <textarea
                  name="job description"
                  id="job description"
                  rows="6"
                  placeholder="Paste the job posting or description here"
                  value={formData.jobDescription}
                  onChange={(e)=>setFormData({...formData,jobDescription:e.target.value})}
                ></textarea>
              </div>

              <div className="field-group">
                <label htmlFor="Currentresume">Current resume</label>
                <textarea
                  name="Currentresume"
                  id="Currentresume"
                  rows="6"
                  placeholder="Paste your current resume or leave blank for a draft"
                  value={formData.currentResume}
                  onChange={(e)=>setFormData({...formData,currentResume:e.target.value})}
                ></textarea>
              </div>

              <button type="button" className="generate-button" onClick={handleGenerateData}>
                Generate cover letter
              </button>
            </form>
          </div>

          <div className="home-card response-card">
            <div className="section-header">
              <h2>Gemini response</h2>
              <p>The generated content will appear here after you click Generate.</p>
            </div>
            <div className="response-panel response-panel-rich">
              {renderResponseContent()}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
export default HomePage;