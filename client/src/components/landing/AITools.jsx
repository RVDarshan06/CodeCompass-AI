import "../../styles/aiTools.css";

import {
    FaFileAlt,
    FaCheckCircle,
    FaRobot,
    FaRoad,
    FaChartBar,
    FaMoneyBillWave
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const AITools = () => {
    const navigate = useNavigate();

    const tools = [
        {
            icon: <FaFileAlt />,
            title: "Resume Analyzer",
            description:
                "Upload your resume and receive AI-powered improvement suggestions.",
            path: "/resume-analyzer"
        },
        {
            icon: <FaCheckCircle />,
            title: "ATS Checker",
            description:
                "Check whether your resume passes Applicant Tracking Systems.",
            path: "/ats-checker"
        },
        {
            icon: <FaRobot />,
            title: "Interview Coach",
            description:
                "Practice interviews with AI-generated questions and personalized feedback.",
            path: "/interview-coach"
        },
        {
            icon: <FaRoad />,
            title: "Career Roadmap",
            description:
                "Generate a personalized learning roadmap for your dream career.",
            path: "/career-roadmap"
        },
        {
            icon: <FaChartBar />,
            title: "Skill Gap Detection",
            description:
                "Discover the skills you need to develop for your target job role.",
            path: "/skill-gap"
        },
        {
            icon: <FaMoneyBillWave />,
            title: "Salary Predictor",
            description:
                "Estimate your potential salary based on skills, experience and location.",
            path: "/salary-predictor"
        }
    ];

    const handleToolClick = (path) => {
        navigate(path);
    };

    return (
        <section className="tools-section" id="ai-tools">

            <div className="section-title">
                <span className="section-badge">
                    AI CAREER TOOLS
                </span>

                <h2>
                    Everything You Need to Build Your Career
                </h2>

                <p>
                    Use AI-powered tools to analyze your resume,
                    discover skill gaps, prepare for interviews and
                    plan your career.
                </p>
            </div>

            <div className="tools-grid">

                {tools.map((tool) => (
                    <article
                        className="tool-card"
                        key={tool.title}
                    >

                        <div className="tool-icon">
                            {tool.icon}
                        </div>

                        <h3>
                            {tool.title}
                        </h3>

                        <p>
                            {tool.description}
                        </p>

                        <button
                            type="button"
                            className="tool-button"
                            onClick={() => handleToolClick(tool.path)}
                        >
                            Try Now
                            <span aria-hidden="true"> →</span>
                        </button>

                    </article>
                ))}

            </div>

        </section>
    );
};

export default AITools;