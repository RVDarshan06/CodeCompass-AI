import "../../styles/testimonials.css";

import {
    FaCheckCircle,
    FaBrain,
    FaChartLine
} from "react-icons/fa";


const benefits = [
    {
        icon: <FaBrain />,
        title: "AI-Powered Guidance",
        description:
            "Get practical AI assistance for resumes, interviews, skill development and career planning."
    },

    {
        icon: <FaCheckCircle />,
        title: "Career-Focused Tools",
        description:
            "Use multiple career tools from one platform instead of switching between different applications."
    },

    {
        icon: <FaChartLine />,
        title: "Personalized Improvement",
        description:
            "Identify your current gaps and receive recommendations based on your target career direction."
    }
];


const Testimonials = () => {

    return (

        <section className="testimonial-section">

            <div className="section-title">

                <span className="section-badge">
                    WHY CODECOMPASS AI
                </span>

                <h2>
                    Built to Help You Move Forward
                </h2>

                <p>
                    CodeCompass AI brings practical career
                    tools together to help students and
                    aspiring developers make better career
                    decisions.
                </p>

            </div>


            <div className="testimonial-grid">

                {benefits.map((item) => (

                    <article
                        className="testimonial-card"
                        key={item.title}
                    >

                        <div className="benefit-icon">
                            {item.icon}
                        </div>

                        <h3>
                            {item.title}
                        </h3>

                        <p className="review">
                            {item.description}
                        </p>

                    </article>

                ))}

            </div>

        </section>

    );
};


export default Testimonials;