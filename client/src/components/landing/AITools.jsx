import "./../../styles/aiTools.css";

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
                "Practice interviews with AI-generated questions and feedback.",
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
                "Discover missing skills required for your target job role.",
            path: "/skill-gap"
        },

        {
            icon: <FaMoneyBillWave />,
            title: "Salary Predictor",
            description:
                "Estimate salary based on your skills, experience and location.",
            path: "/salary-predictor"
        }

    ];


    return (

        <section className="tools-section">

            <div className="section-title">

                <h2>
                    Explore AI Tools
                </h2>

                <p>
                    Everything you need to become industry ready.
                </p>

            </div>


            <div className="tools-grid">

                {tools.map((tool, index) => (

                    <div
                        className="tool-card"
                        key={index}
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
                            onClick={() => navigate(tool.path)}
                        >

                            Try Now →

                        </button>

                    </div>

                ))}

            </div>

        </section>

    );
};


export default AITools;