// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

function HomePage() {
  const [formData, setFormData] = useState({
    companyname: "",
    applyingasa: "Fresher",
    coverLetterTone: "Formal",
    jobDescription: "",
    currentResume: "",
  });

  const [geminiResponse, setGeminiResponse] = useState("");

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

  async function handleGenerateData() {
    console.log("FormData:", formData);

    const prompt = `You are a professional career coach and resume optimization expert.\n\nCompany Name: ${formData.companyname}\nExperience Level: ${formData.applyingasa}\nJob Description: ${formData.jobDescription}\nCurrent Resume: ${formData.currentResume}\nPreferred Tone: ${formData.coverLetterTone}\n`;

    const apiUrl ="https://ai-resume-builder-1-9bb5.onrender.com";
    const endpoint = apiUrl.endsWith("/generate")
      ? apiUrl
      : `${apiUrl.replace(/\/+$/, "")}/generate`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData, prompt }),
    };

    try {
      const response = await fetch(endpoint, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Generated Gemini Data:", data);

      const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ?? data?.text ?? data?.output ?? "";

      setGeminiResponse(text || "");
    } catch (err) {
      console.error("Fetch failed or parsing error:", err);
      setGeminiResponse("Error generating response. Check console for details.");
    }
  }

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
                  <label htmlFor="applyingasa">Applying as</label>
                  <select
                    id="applyingasa"
                    value={formData.applyingasa}
                    onChange={(e) => setFormData({ ...formData, applyingasa: e.target.value })}
                  >
                    <option value="Fresher">Fresher</option>
                    <option value="Experienced">Experienced</option>
                  </select>
                </div>

                <div className="field-group">
                  <label htmlFor="coverLetterTone">Cover letter tone</label>
                  <select
                    id="coverLetterTone"
                    value={formData.coverLetterTone}
                    onChange={(e) => setFormData({ ...formData, coverLetterTone: e.target.value })}
                  >
                    <option value="Formal">Formal</option>
                    <option value="Informal">Informal</option>
                    <option value="Casual">Casual</option>
                  </select>
                </div>
              </div>

              <div className="field-group">
                <label htmlFor="jobDescription">Job description</label>
                <textarea
                  name="jobDescription"
                  id="jobDescription"
                  rows="6"
                  placeholder="Paste the job posting or description here"
                  value={formData.jobDescription}
                  onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                ></textarea>
              </div>

              <div className="field-group">
                <label htmlFor="currentResume">Current resume</label>
                <textarea
                  name="currentResume"
                  id="currentResume"
                  rows="6"
                  placeholder="Paste your current resume or leave blank for a draft"
                  value={formData.currentResume}
                  onChange={(e) => setFormData({ ...formData, currentResume: e.target.value })}
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