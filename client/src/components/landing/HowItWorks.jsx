import "../../styles/howItWorks.css";

import {
    FaUserPlus,
    FaFileAlt,
    FaRobot,
    FaChartLine
} from "react-icons/fa";


const steps = [
    {
        icon: <FaUserPlus />,
        title: "Create Your Account",
        description:
            "Create your CodeCompass AI account and set up your career profile."
    },

    {
        icon: <FaFileAlt />,
        title: "Analyze Your Profile",
        description:
            "Use our resume and ATS tools to understand your current strengths and improvement areas."
    },

    {
        icon: <FaRobot />,
        title: "Get AI Guidance",
        description:
            "Receive personalized career roadmaps, skill-gap recommendations and interview feedback."
    },

    {
        icon: <FaChartLine />,
        title: "Improve & Track Progress",
        description:
            "Practice, develop the skills you need and use CodeCompass AI to guide your next career step."
    }
];


const HowItWorks = () => {

    return (

        <section
            className="how-section"
            id="how-it-works"
        >

            {/* =====================================
                SECTION HEADER
            ===================================== */}

            <div className="section-title">

                <span className="section-badge">
                    HOW IT WORKS
                </span>

                <h2>
                    Your Career Journey, Simplified
                </h2>

                <p>
                    Follow a simple process to understand
                    where you are, discover what you need
                    and plan your next career move.
                </p>

            </div>


            {/* =====================================
                TIMELINE
            ===================================== */}

            <div className="timeline">

                {steps.map((step, index) => (

                    <article
                        className="timeline-card"
                        key={step.title}
                    >

                        {/* Step number */}

                        <div className="timeline-number">
                            {index + 1}
                        </div>


                        {/* Icon */}

                        <div className="timeline-icon">
                            {step.icon}
                        </div>


                        {/* Content */}

                        <h3>
                            {step.title}
                        </h3>

                        <p>
                            {step.description}
                        </p>

                    </article>

                ))}

            </div>

        </section>

    );
};


export default HowItWorks;