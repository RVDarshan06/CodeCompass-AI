import "./../../styles/cta.css";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const CTA = () => {
    return (
        <section className="cta-section">

            <div className="cta-box">

                <h2>
                    Ready to Accelerate Your AI Career?
                </h2>

                <p>
                    Join thousands of students using AI to build
                    better resumes, crack interviews and land dream jobs.
                </p>

                <Link to="/register" className="cta-button">

                    Get Started Free

                    <FaArrowRight />

                </Link>

            </div>

        </section>
    );
};

export default CTA;