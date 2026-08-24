import "../../styles/cta.css";

import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";


const CTA = () => {

    return (

        <section className="cta-section">

            <div className="cta-box">

                <span className="cta-badge">
                    START YOUR JOURNEY
                </span>


                <h2>
                    Ready to Take the Next Step in Your Career?
                </h2>


                <p>
                    Use AI-powered career tools to improve your
                    resume, identify skill gaps, prepare for
                    interviews and build a personalized career plan.
                </p>


                <Link
                    to="/register"
                    className="cta-button"
                >

                    Get Started Free

                    <FaArrowRight />

                </Link>

            </div>

        </section>

    );

};


export default CTA;