import "../../styles/features.css";

import {
    FaFileAlt,
    FaCheckCircle,
    FaRoad,
    FaChartLine,
    FaMicrophone,
    FaMoneyBillWave
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";


const features = [
    {
        icon: <FaFileAlt />,
        title: "Resume Analyzer",
        description:
            "Analyze your resume with AI and get practical suggestions to improve content, skills and ATS compatibility.",
        path: "/resume-analyzer"
    },
    {
        icon: <FaCheckCircle />,
        title: "ATS Checker",
        description:
            "Compare your resume with a job description and identify matched keywords, missing skills and improvement areas.",
        path: "/ats-checker"
    },
    {
        icon: <FaRoad />,
        title: "Career Roadmap",
        description:
            "Generate a personalized learning roadmap based on your target role, current skills and available study time.",
        path: "/career-roadmap"
    },
    {
        icon: <FaChartLine />,
        title: "Skill Gap Detection",
        description:
            "Identify the important skills you are missing for your target career and discover what to learn next.",
        path: "/skill-gap"
    },
    {
        icon: <FaMicrophone />,
        title: "Interview Coach",
        description:
            "Practice technical, coding, HR and system-design interviews with AI-generated questions and feedback.",
        path: "/interview-coach"
    },
    {
        icon: <FaMoneyBillWave />,
        title: "Salary Predictor",
        description:
            "Get an AI-based salary estimate using your target role, experience, skills, education and location.",
        path: "/salary-predictor"
    }
];


const Features = () => {

    const navigate = useNavigate();


    return (

        <section
            className="features"
            id="features"
        >

            {/* =====================================
                SECTION HEADER
            ===================================== */}

            <div className="section-title">

                <span className="section-badge">
                    CAREER INTELLIGENCE
                </span>

                <h2>
                    Everything You Need to Move Forward
                </h2>

                <p>
                    CodeCompass AI brings the essential tools
                    you need for resume improvement, skill
                    development, interview preparation and
                    career planning into one platform.
                </p>

            </div>


            {/* =====================================
                FEATURE CARDS
            ===================================== */}

            <div className="feature-grid">

                {features.map((feature) => (

                    <article
                        className="feature-card"
                        key={feature.title}
                    >

                        <div className="feature-icon">
                            {feature.icon}
                        </div>


                        <h3>
                            {feature.title}
                        </h3>


                        <p>
                            {feature.description}
                        </p>


                        <button
                            type="button"
                            className="feature-button"
                            onClick={() =>
                                navigate(feature.path)
                            }
                        >
                            Explore Tool
                            <span aria-hidden="true">
                                {" →"}
                            </span>
                        </button>

                    </article>

                ))}

            </div>

        </section>

    );
};


export default Features;