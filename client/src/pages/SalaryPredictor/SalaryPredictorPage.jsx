import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/SalaryPredictorPage.css";

const API_URL = "http://localhost:5000/api/salary/predict";

function SalaryPredictorPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        targetRole: "",
        experience: "Fresher",
        skills: "",
        education: "",
        location: ""
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // =====================================================
    // HANDLE INPUT CHANGE
    // =====================================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

        // Remove old error when user starts correcting input
        if (error) {
            setError("");
        }
    };

    // =====================================================
    // SAFE RESPONSE READER
    // =====================================================

    const readResponseSafely = async (response) => {
        const rawText = await response.text();

        if (!rawText.trim()) {
            throw new Error(
                `Server returned an empty response (HTTP ${response.status}).`
            );
        }

        try {
            return JSON.parse(rawText);
        } catch (parseError) {
            console.error("Invalid JSON response:", rawText);

            throw new Error(
                `Server returned invalid JSON (HTTP ${response.status}).`
            );
        }
    };

    // =====================================================
    // VALIDATE FORM
    // =====================================================

    const validateForm = () => {
        if (!formData.targetRole.trim()) {
            return "Please enter your target job role.";
        }

        if (!formData.experience.trim()) {
            return "Please select your experience level.";
        }

        if (!formData.skills.trim()) {
            return "Please enter your technical skills.";
        }

        if (!formData.education.trim()) {
            return "Please enter your education.";
        }

        if (!formData.location.trim()) {
            return "Please enter your location.";
        }

        return "";
    };

    // =====================================================
    // SUBMIT FORM
    // =====================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setResult(null);

        const validationError = validateForm();

        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            setLoading(true);

            console.log("=================================");
            console.log("Salary Prediction Request");
            console.log("=================================");
            console.log(formData);

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    targetRole: formData.targetRole.trim(),
                    experience: formData.experience.trim(),
                    skills: formData.skills.trim(),
                    education: formData.education.trim(),
                    location: formData.location.trim()
                })
            });

            const data = await readResponseSafely(response);

            console.log("Salary API response:", data);

            if (!response.ok) {
                throw new Error(
                    data?.message ||
                    data?.error ||
                    "Failed to generate salary prediction."
                );
            }

            // Backend response:
            // {
            //     message: "...",
            //     prediction: {...}
            // }

            const prediction = data?.prediction || data;

            if (
                !prediction ||
                prediction.minimumSalary === undefined ||
                prediction.maximumSalary === undefined
            ) {
                console.error("Invalid prediction object:", prediction);

                throw new Error(
                    "The server response did not contain valid salary prediction data."
                );
            }

            setResult(prediction);

            // Scroll smoothly to result
            setTimeout(() => {
                const resultElement =
                    document.querySelector(".salary-results");

                if (resultElement) {
                    resultElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }, 100);

        } catch (err) {
            console.error("Salary prediction error:", err);

            setError(
                err?.message ||
                "Unable to generate salary prediction. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    // =====================================================
    // FORMAT SALARY
    // =====================================================

    const formatSalary = (value) => {
        if (
            value === undefined ||
            value === null ||
            value === ""
        ) {
            return "—";
        }

        const number = Number(value);

        if (Number.isNaN(number)) {
            return value;
        }

        return `₹${number.toLocaleString("en-IN")}`;
    };

    // =====================================================
    // CALCULATE MIDPOINT
    // =====================================================

    const calculateAverage = () => {
        if (!result) {
            return 0;
        }

        const minimum = Number(result.minimumSalary) || 0;
        const maximum = Number(result.maximumSalary) || 0;

        if (maximum <= minimum) {
            return minimum;
        }

        if (result.averageSalary !== undefined) {
            return Number(result.averageSalary);
        }

        return Math.round((minimum + maximum) / 2);
    };

    // =====================================================
    // CALCULATE PROGRESS
    // =====================================================

    const calculateProgress = () => {
        if (!result) {
            return 50;
        }

        const minimum = Number(result.minimumSalary) || 0;
        const maximum = Number(result.maximumSalary) || 0;
        const average = Number(calculateAverage()) || 0;

        if (maximum <= minimum) {
            return 50;
        }

        const percentage =
            ((average - minimum) / (maximum - minimum)) * 100;

        return Math.min(
            100,
            Math.max(0, percentage)
        );
    };

    // =====================================================
    // CREATE ANOTHER PREDICTION
    // =====================================================

    const createAnotherPrediction = () => {
        setResult(null);
        setError("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // =====================================================
    // RENDER
    // =====================================================

    return (
        <div className="salary-page">

            {/* =================================================
                BACKGROUND
            ================================================= */}

            <div className="salary-bg-orb orb-one"></div>
            <div className="salary-bg-orb orb-two"></div>
            <div className="salary-grid-bg"></div>

            {/* =================================================
                NAVBAR
            ================================================= */}

            <header className="salary-navbar">

                <button
                    className="salary-back-button"
                    onClick={() => navigate("/dashboard")}
                    type="button"
                >
                    <span>←</span>
                    Dashboard
                </button>

                <div className="salary-brand">

                    <div className="salary-brand-icon">
                        💰
                    </div>

                    <div>
                        <span>CodeCompass</span>
                        <strong> AI</strong>
                    </div>

                </div>

                <div className="salary-nav-badge">
                    AI Career Tool
                </div>

            </header>

            {/* =================================================
                MAIN
            ================================================= */}

            <main className="salary-container">

                {/* =================================================
                    HERO
                ================================================= */}

                {!result && (
                    <section className="salary-hero">

                        <div className="hero-content">

                            <div className="salary-badge">
                                ✨ AI-POWERED CAREER INSIGHT
                            </div>

                            <h1>
                                Know Your
                                <span> Market Value.</span>
                            </h1>

                            <p>
                                Get an AI-powered estimate of your expected
                                salary based on your role, skills, experience,
                                education and location.
                            </p>

                            <div className="hero-points">
                                <span>✓ Personalized</span>
                                <span>✓ Market-based</span>
                                <span>✓ Career-focused</span>
                            </div>

                        </div>

                        <div className="hero-visual">

                            <div className="salary-orbit">

                                <div className="orbit-center">
                                    💰
                                </div>

                                <span className="orbit-item orbit-item-one">
                                    ₹
                                </span>

                                <span className="orbit-item orbit-item-two">
                                    📈
                                </span>

                                <span className="orbit-item orbit-item-three">
                                    💼
                                </span>

                            </div>

                        </div>

                    </section>
                )}

                {/* =================================================
                    FORM CARD
                ================================================= */}

                {!result && (
                    <section className="salary-card">

                        <div className="salary-card-heading">

                            <div className="heading-icon">
                                🎯
                            </div>

                            <div>

                                <span className="section-kicker">
                                    STEP 01
                                </span>

                                <h2>
                                    Tell us about yourself
                                </h2>

                                <p>
                                    Enter your career information to generate
                                    a personalized salary estimate.
                                </p>

                            </div>

                        </div>

                        <form onSubmit={handleSubmit}>

                            <div className="salary-form-grid">

                                {/* =====================================
                                    TARGET ROLE
                                ====================================== */}

                                <div className="salary-field salary-field-full">

                                    <label>
                                        Target Job Role
                                        <span>*</span>
                                    </label>

                                    <div className="salary-input-wrapper">

                                        <span className="input-icon">
                                            💼
                                        </span>

                                        <input
                                            type="text"
                                            name="targetRole"
                                            value={formData.targetRole}
                                            onChange={handleChange}
                                            placeholder="Full Stack Developer"
                                            autoComplete="off"
                                        />

                                    </div>

                                </div>

                                {/* =====================================
                                    EXPERIENCE
                                ====================================== */}

                                <div className="salary-field">

                                    <label>
                                        Experience Level
                                        <span>*</span>
                                    </label>

                                    <div className="salary-input-wrapper">

                                        <span className="input-icon">
                                            📈
                                        </span>

                                        <select
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleChange}
                                        >

                                            <option value="Fresher">
                                                Fresher
                                            </option>

                                            <option value="Student">
                                                Student
                                            </option>

                                            <option value="Entry Level">
                                                Entry Level
                                            </option>

                                            <option value="1-2 Years">
                                                1-2 Years
                                            </option>

                                            <option value="3-5 Years">
                                                3-5 Years
                                            </option>

                                            <option value="5+ Years">
                                                5+ Years
                                            </option>

                                        </select>

                                    </div>

                                </div>

                                {/* =====================================
                                    LOCATION
                                ====================================== */}

                                <div className="salary-field">

                                    <label>
                                        Location
                                        <span>*</span>
                                    </label>

                                    <div className="salary-input-wrapper">

                                        <span className="input-icon">
                                            📍
                                        </span>

                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            placeholder="Bengaluru, Karnataka"
                                            autoComplete="off"
                                        />

                                    </div>

                                </div>

                                {/* =====================================
                                    SKILLS
                                ====================================== */}

                                <div className="salary-field salary-field-full">

                                    <label>
                                        Technical Skills
                                        <span>*</span>
                                    </label>

                                    <div className="salary-textarea-wrapper">

                                        <span className="textarea-icon">
                                            🛠️
                                        </span>

                                        <textarea
                                            name="skills"
                                            value={formData.skills}
                                            onChange={handleChange}
                                            placeholder="Java, Spring Boot, React, MongoDB, SQL"
                                            rows="5"
                                        />

                                    </div>

                                    <small>
                                        💡 Separate multiple skills using commas.
                                    </small>

                                </div>

                                {/* =====================================
                                    EDUCATION
                                ====================================== */}

                                <div className="salary-field salary-field-full">

                                    <label>
                                        Education
                                        <span>*</span>
                                    </label>

                                    <div className="salary-input-wrapper">

                                        <span className="input-icon">
                                            🎓
                                        </span>

                                        <input
                                            type="text"
                                            name="education"
                                            value={formData.education}
                                            onChange={handleChange}
                                            placeholder="B.E. Computer Science"
                                            autoComplete="off"
                                        />

                                    </div>

                                </div>

                            </div>

                            {/* =========================================
                                ERROR
                            ========================================== */}

                            {error && (
                                <div className="salary-error">

                                    <div className="error-icon">
                                        !
                                    </div>

                                    <div>

                                        <strong>
                                            Prediction failed
                                        </strong>

                                        <p>
                                            {error}
                                        </p>

                                    </div>

                                </div>
                            )}

                            {/* =========================================
                                SUBMIT
                            ========================================== */}

                            <button
                                type="submit"
                                className="salary-submit-button"
                                disabled={loading}
                            >

                                {loading ? (
                                    <>
                                        <span className="salary-spinner"></span>

                                        <span>
                                            AI is analyzing your profile...
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span>
                                            💰
                                        </span>

                                        Predict My Salary

                                        <span className="button-arrow">
                                            →
                                        </span>
                                    </>
                                )}

                            </button>

                            <p className="salary-disclaimer">
                                🔒 Your information is used only to generate
                                this career estimate.
                            </p>

                        </form>

                    </section>
                )}

                {/* =================================================
                    RESULTS
                ================================================= */}

                {result && (
                    <section className="salary-results">

                        {/* =============================================
                            RESULT HEADER
                        ============================================== */}

                        <div className="results-header">

                            <div>

                                <div className="salary-badge result-badge">
                                    ✓ AI ANALYSIS COMPLETE
                                </div>

                                <h2>
                                    Your Salary Outlook
                                </h2>

                                <p>
                                    Based on your profile and target role.
                                </p>

                            </div>

                            <div className="result-success">

                                <span>
                                    ✓
                                </span>

                                Prediction Ready

                            </div>

                        </div>

                        {/* =============================================
                            SALARY STAT CARDS
                        ============================================== */}

                        <div className="salary-stat-grid">

                            {/* MINIMUM */}

                            <div className="salary-stat-card">

                                <div className="stat-top">

                                    <div className="stat-icon">
                                        📉
                                    </div>

                                    <span>
                                        MINIMUM
                                    </span>

                                </div>

                                <strong>
                                    {formatSalary(
                                        result.minimumSalary
                                    )}
                                </strong>

                                <small>
                                    Estimated annual salary
                                </small>

                            </div>

                            {/* EXPECTED RANGE */}

                            <div className="salary-stat-card featured">

                                <div className="featured-label">
                                    MOST LIKELY RANGE
                                </div>

                                <div className="stat-top">

                                    <div className="stat-icon">
                                        📊
                                    </div>

                                    <span>
                                        EXPECTED RANGE
                                    </span>

                                </div>

                                <strong>

                                    {formatSalary(
                                        result.minimumSalary
                                    )}

                                    <span className="range-dash">
                                        —
                                    </span>

                                    {formatSalary(
                                        result.maximumSalary
                                    )}

                                </strong>

                                <small>
                                    Estimated market range
                                </small>

                            </div>

                            {/* MONTHLY */}

                            <div className="salary-stat-card">

                                <div className="stat-top">

                                    <div className="stat-icon">
                                        📅
                                    </div>

                                    <span>
                                        MONTHLY
                                    </span>

                                </div>

                                <strong>
                                    {formatSalary(
                                        result.monthlyEstimate
                                    )}
                                </strong>

                                <small>
                                    Approximate monthly salary
                                </small>

                            </div>

                        </div>

                        {/* =============================================
                            AVERAGE SALARY
                        ============================================== */}

                        <div className="average-salary-card">

                            <div>

                                <span>
                                    Average Expected Salary
                                </span>

                                <strong>
                                    {formatSalary(
                                        calculateAverage()
                                    )}

                                    <small>
                                        / year
                                    </small>
                                </strong>

                            </div>

                            <div className="average-progress">

                                <div className="progress-labels">

                                    <span>
                                        {formatSalary(
                                            result.minimumSalary
                                        )}
                                    </span>

                                    <span>
                                        Market midpoint
                                    </span>

                                    <span>
                                        {formatSalary(
                                            result.maximumSalary
                                        )}
                                    </span>

                                </div>

                                <div className="progress-track">

                                    <div
                                        className="progress-fill"
                                        style={{
                                            width: `${calculateProgress()}%`
                                        }}
                                    ></div>

                                </div>

                            </div>

                        </div>

                        {/* =============================================
                            MARKET DEMAND
                        ============================================== */}

                        <div className="market-demand-card">

                            <div className="market-left">

                                <div className="market-icon">
                                    📈
                                </div>

                                <div>

                                    <span className="section-kicker">
                                        CURRENT MARKET
                                    </span>

                                    <h3>
                                        Market Demand
                                    </h3>

                                    <p>
                                        Demand for your target role
                                    </p>

                                </div>

                            </div>

                            <div className="market-value">
                                {result.marketDemand || "High"}
                            </div>

                        </div>

                        {/* =============================================
                            SALARY FACTORS
                        ============================================== */}

                        {Array.isArray(result.factors) &&
                            result.factors.length > 0 && (

                                <div className="analysis-section">

                                    <div className="analysis-heading">

                                        <div className="analysis-icon">
                                            🔍
                                        </div>

                                        <div>

                                            <span className="section-kicker">
                                                AI INSIGHT
                                            </span>

                                            <h3>
                                                Salary Factors
                                            </h3>

                                            <p>
                                                Key factors influencing your
                                                estimated salary.
                                            </p>

                                        </div>

                                    </div>

                                    <div className="analysis-list">

                                        {result.factors.map(
                                            (factor, index) => (

                                                <div
                                                    className="analysis-item"
                                                    key={index}
                                                >

                                                    <div className="check-icon">
                                                        ✓
                                                    </div>

                                                    <p>
                                                        {factor}
                                                    </p>

                                                </div>

                                            )
                                        )}

                                    </div>

                                </div>
                            )}

                        {/* =============================================
                            RECOMMENDATIONS
                        ============================================== */}

                        {Array.isArray(result.recommendations) &&
                            result.recommendations.length > 0 && (

                                <div className="analysis-section improvement-section">

                                    <div className="analysis-heading">

                                        <div className="analysis-icon">
                                            🚀
                                        </div>

                                        <div>

                                            <span className="section-kicker">
                                                CAREER GROWTH
                                            </span>

                                            <h3>
                                                How to Increase Your Salary
                                            </h3>

                                            <p>
                                                Practical steps to improve
                                                your earning potential.
                                            </p>

                                        </div>

                                    </div>

                                    <div className="analysis-list">

                                        {result.recommendations.map(
                                            (recommendation, index) => (

                                                <div
                                                    className="analysis-item"
                                                    key={index}
                                                >

                                                    <div className="tip-number">
                                                        {index + 1}
                                                    </div>

                                                    <p>
                                                        {recommendation}
                                                    </p>

                                                </div>

                                            )
                                        )}

                                    </div>

                                </div>
                            )}

                        {/* =============================================
                            ACTION BUTTONS
                        ============================================== */}

                        <div className="salary-result-actions">

                            <button
                                className="secondary-action"
                                onClick={createAnotherPrediction}
                                type="button"
                            >
                                ← Create Another Prediction
                            </button>

                            <button
                                className="primary-action"
                                onClick={() =>
                                    navigate("/dashboard")
                                }
                                type="button"
                            >
                                Dashboard

                                <span>
                                    →
                                </span>

                            </button>

                        </div>

                        {/* =============================================
                            DISCLAIMER
                        ============================================== */}

                        <p className="salary-disclaimer result-disclaimer">
                            💡 This estimate is generated using the
                            information you provide and should be used as a
                            career-planning reference.
                        </p>

                    </section>
                )}

            </main>

        </div>
    );
}

export default SalaryPredictorPage;