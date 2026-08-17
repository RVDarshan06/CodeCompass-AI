import { useState } from "react";
import "../../styles/atsChecker.css";

const ATSCheckerPage = () => {

    const [jobDescription, setJobDescription] = useState("");
    const [checking, setChecking] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const handleCheckATS = async () => {

        // Check job description
        if (!jobDescription.trim()) {
            setError("Please enter a job description.");
            return;
        }

        setChecking(true);
        setError("");
        setResult(null);

        try {

            const response = await fetch(
                "http://localhost:5000/api/ats/check",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        jobDescription: jobDescription
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "ATS check failed."
                );
            }

            setResult(data);

        } catch (error) {

            console.error("ATS check error:", error);

            setError(
                error.message || "Failed to check ATS compatibility."
            );

        } finally {

            setChecking(false);

        }
    };


    return (

        <div className="ats-checker">

            {/* ================= HEADER ================= */}

            <div className="ats-header">

                <div>

                    <h1>
                        📊 ATS Checker
                    </h1>

                    <p>
                        Compare your resume with a job description
                        and find out how well it matches.
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


            {/* ================= MAIN ================= */}

            <div className="ats-container">

                <div className="ats-card">

                    <h2>
                        Job Description
                    </h2>

                    <p className="ats-description">

                        Paste the job description below.
                        Your latest uploaded resume will
                        automatically be used for comparison.

                    </p>


                    {/* ================= TEXTAREA ================= */}

                    <textarea
                        className="job-description-input"
                        placeholder="Paste the job description here..."
                        value={jobDescription}
                        onChange={(event) =>
                            setJobDescription(event.target.value)
                        }
                    />


                    {/* ================= BUTTON ================= */}

                    <button
                        className="ats-button"
                        onClick={handleCheckATS}
                        disabled={checking}
                    >

                        {checking
                            ? "Analyzing..."
                            : "Check ATS Score →"
                        }

                    </button>


                    {/* ================= ERROR ================= */}

                    {error && (

                        <div className="ats-error">

                            ❌ {error}

                        </div>

                    )}


                    {/* ================= RESULT ================= */}

                    {result && (

                        <div className="ats-result">

                            <div className="result-header">

                                <h2>
                                    🤖 ATS Analysis
                                </h2>

                                <p>
                                    Analysis for:
                                    <strong>
                                        {" "}{result.fileName}
                                    </strong>
                                </p>

                            </div>


                            <div className="analysis-content">

                                {result.analysis}

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </div>

    );
};


export default ATSCheckerPage;