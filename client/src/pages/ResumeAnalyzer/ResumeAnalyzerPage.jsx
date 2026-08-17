import { useState } from "react";
import "../../styles/resumeAnalyzer.css";

const ResumeAnalyzerPage = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const handleFileChange = (event) => {

        const file = event.target.files[0];

        setError("");
        setResult(null);

        if (!file) {
            return;
        }

        // Check file size
        if (file.size > 5 * 1024 * 1024) {

            setError("File size must be less than 5 MB.");

            return;
        }

        // Check file type
        const allowedTypes = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];

        if (!allowedTypes.includes(file.type)) {

            setError("Only PDF and DOCX files are supported.");

            return;
        }

        setSelectedFile(file);
    };


    const handleUpload = async () => {

        if (!selectedFile) {

            setError("Please choose a resume first.");

            return;
        }

        setUploading(true);
        setError("");
        setResult(null);

        try {

            const formData = new FormData();

            formData.append("resume", selectedFile);


            const response = await fetch(
                "http://localhost:5000/api/resume/analyze",
                {
                    method: "POST",
                    body: formData
                }
            );


            const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message || "Resume analysis failed."
                );
            }


            console.log("Resume analysis response:", data);

            setResult(data);


        } catch (error) {

            console.error("Upload error:", error);

            setError(
                error.message || "Failed to analyze resume."
            );

        } finally {

            setUploading(false);

        }
    };


    return (

        <div className="resume-analyzer">

            {/* =========================
                HEADER
            ========================= */}

            <div className="resume-header">

                <div>

                    <h1>
                        📄 Resume Analyzer
                    </h1>

                    <p>
                        Upload your resume and get AI-powered
                        feedback, ATS insights and improvement
                        suggestions.
                    </p>

                </div>


                <button
                    className="back-button"
                    onClick={() =>
                        window.location.href = "/dashboard"
                    }
                >
                    ← Dashboard
                </button>

            </div>


            {/* =========================
                UPLOAD SECTION
            ========================= */}

            <div className="upload-container">

                <div className="upload-box">

                    <div className="upload-icon">
                        📄
                    </div>


                    <h2>
                        Upload Your Resume
                    </h2>


                    <p>
                        Upload your PDF or DOCX resume
                        to begin the analysis.
                    </p>


                    {/* File selector */}

                    <label className="upload-button">

                        Choose Resume

                        <input
                            type="file"
                            accept=".pdf,.docx"
                            onChange={handleFileChange}
                        />

                    </label>


                    {/* Selected file */}

                    {selectedFile && (

                        <p className="selected-file">

                            Selected:

                            <strong>
                                {" "}{selectedFile.name}
                            </strong>

                        </p>

                    )}


                    {/* Upload button */}

                    {selectedFile && (

                        <button
                            className="analyze-button"
                            onClick={handleUpload}
                            disabled={uploading}
                        >

                            {uploading
                                ? "Analyzing Resume..."
                                : "Upload Resume →"
                            }

                        </button>

                    )}


                    {/* Error */}

                    {error && (

                        <p className="error-message">

                            ❌ {error}

                        </p>

                    )}


                    {/* =========================
                        SUCCESS MESSAGE
                    ========================= */}

                    {result && (

                        <div className="result-box">

                            <h3>
                                ✅ Resume Analyzed Successfully
                            </h3>


                            <p>

                                File:

                                <strong>
                                    {" "}{result.fileName}
                                </strong>

                            </p>


                            <p>
                                Resume text extracted and
                                analyzed successfully by AI.
                            </p>

                        </div>

                    )}


                    <p className="file-info">
                        Maximum size: 5 MB
                    </p>

                </div>


                {/* =========================
                    AI ANALYSIS
                ========================= */}

                {result && result.analysis && (

                    <div className="analysis-container">

                        <div className="analysis-header">

                            <h2>
                                🤖 AI Resume Analysis
                            </h2>

                            <p>
                                Personalized feedback generated
                                from your resume.
                            </p>

                        </div>


                        <div className="analysis-content">

                            {result.analysis}

                        </div>

                    </div>

                )}

            </div>

        </div>

    );
};


export default ResumeAnalyzerPage;