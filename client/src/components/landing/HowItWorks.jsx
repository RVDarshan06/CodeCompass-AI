import "./../../styles/howItWorks.css";

import {
    FaUpload,
    FaRobot,
    FaRoad,
    FaBriefcase
} from "react-icons/fa";

const steps = [

    {
        icon: <FaUpload />,
        title: "Upload Resume",
        description:
            "Upload your resume or LinkedIn profile to begin AI analysis."
    },

    {
        icon: <FaRobot />,
        title: "AI Analysis",
        description:
            "Our AI evaluates ATS score, strengths, weaknesses and opportunities."
    },

    {
        icon: <FaRoad />,
        title: "Personalized Roadmap",
        description:
            "Receive a complete learning roadmap tailored to your career goal."
    },

    {
        icon: <FaBriefcase />,
        title: "Land Your Dream Job",
        description:
            "Improve continuously using interview practice and job matching."
    }

];

const HowItWorks = () => {

    return (

        <section className="how-section">

            <div className="section-title">

                <h2>How CodeCompass AI Works</h2>

                <p>
                    Four simple steps to accelerate your AI career.
                </p>

            </div>

            <div className="timeline">

                {

                    steps.map((step, index) => (

                        <div className="timeline-card" key={index}>

                            <div className="timeline-number">

                                {index + 1}

                            </div>

                            <div className="timeline-icon">

                                {step.icon}

                            </div>

                            <h3>

                                {step.title}

                            </h3>

                            <p>

                                {step.description}

                            </p>

                        </div>

                    ))

                }

            </div>

        </section>

    );

};

export default HowItWorks;