import "./../../styles/features.css";
import {
    FaFileAlt,
    FaRoad,
    FaChartLine,
    FaRobot,
    FaBriefcase,
    FaMicrophone,
} from "react-icons/fa";

const features = [
    {
        icon: <FaFileAlt />,
        title: "Resume Analyzer",
        description:
            "Analyze your resume using AI and receive ATS optimization tips.",
    },
    {
        icon: <FaRoad />,
        title: "Learning Roadmaps",
        description:
            "Generate personalized AI learning paths for any career goal.",
    },
    {
        icon: <FaChartLine />,
        title: "Skill Gap Detection",
        description:
            "Discover missing skills required for your dream job.",
    },
    {
        icon: <FaMicrophone />,
        title: "Interview Coach",
        description:
            "Practice technical interviews with AI-generated questions.",
    },
    {
        icon: <FaBriefcase />,
        title: "Job Match Score",
        description:
            "Compare your resume with job descriptions instantly.",
    },
    {
        icon: <FaRobot />,
        title: "AI Mentor",
        description:
            "Ask career questions and receive intelligent guidance.",
    },
];

const Features = () => {
    return (
        <section className="features" id="features">

            <div className="section-title">

                <h2>Why Choose CodeCompass AI?</h2>

                <p>
                    Everything you need to build your AI career in one place.
                </p>

            </div>

            <div className="feature-grid">

                {features.map((feature, index) => (

                    <div className="feature-card" key={index}>

                        <div className="feature-icon">

                            {feature.icon}

                        </div>

                        <h3>{feature.title}</h3>

                        <p>{feature.description}</p>

                    </div>

                ))}

            </div>

        </section>
    );
};

export default Features;