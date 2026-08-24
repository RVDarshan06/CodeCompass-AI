import "../../styles/pricing.css";

import { FaCheckCircle, FaArrowRight } from "react-icons/fa";

import { useNavigate } from "react-router-dom";


const plan = {
    title: "CodeCompass AI",
    price: "Free",
    duration: "while the platform is in development",

    features: [
        "Resume Analyzer",
        "ATS Checker",
        "Career Roadmap",
        "Skill Gap Detection",
        "Interview Coach",
        "Salary Predictor"
    ]
};


const Pricing = () => {

    const navigate = useNavigate();


    const handleGetStarted = () => {
        navigate("/register");
    };


    return (

        <section
            className="pricing-section"
            id="pricing"
        >

            {/* =====================================
                HEADER
            ===================================== */}

            <div className="section-title">

                <span className="section-badge">
                    PRICING
                </span>

                <h2>
                    Simple and Transparent
                </h2>

                <p>
                    CodeCompass AI is currently available
                    as a free career platform while the
                    project continues to evolve.
                </p>

            </div>


            {/* =====================================
                PRICING CARD
            ===================================== */}

            <div className="pricing-grid">

                <div className="price-card active">

                    <div className="pricing-label">
                        CURRENT PLAN
                    </div>


                    <h3>
                        {plan.title}
                    </h3>


                    <h1>
                        {plan.price}

                        <span>
                            {plan.duration}
                        </span>
                    </h1>


                    <p className="pricing-description">
                        Access the available CodeCompass AI
                        career tools from one platform.
                    </p>


                    <div className="pricing-features">

                        {plan.features.map((feature) => (

                            <div
                                className="feature"
                                key={feature}
                            >

                                <FaCheckCircle />

                                <span>
                                    {feature}
                                </span>

                            </div>

                        ))}

                    </div>


                    <button
                        type="button"
                        className="pricing-button"
                        onClick={handleGetStarted}
                    >

                        Get Started Free

                        <FaArrowRight />

                    </button>

                </div>

            </div>


            {/* =====================================
                NOTE
            ===================================== */}

            <p className="pricing-note">
                No payment is required to create an
                account or explore the available tools.
            </p>

        </section>

    );
};


export default Pricing;