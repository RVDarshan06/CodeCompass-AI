import "./../../styles/testimonials.css";

import { FaStar } from "react-icons/fa";

const reviews = [

    {
        name: "Rahul Sharma",
        role: "Software Engineer",
        review:
            "CodeCompass AI completely transformed my interview preparation. The roadmap and resume analyzer were incredibly useful."
    },

    {
        name: "Priya Mehta",
        role: "Data Analyst",
        review:
            "The Skill Gap Detection feature showed exactly what I needed to learn. Highly recommended."
    },

    {
        name: "Arjun Kumar",
        role: "Full Stack Developer",
        review:
            "The Interview Coach feels like having a real mentor available anytime. Amazing platform."
    }

];

const Testimonials = () => {

    return (

        <section className="testimonial-section">

            <div className="section-title">

                <h2>What Our Users Say</h2>

                <p>
                    Thousands of students trust CodeCompass AI.
                </p>

            </div>

            <div className="testimonial-grid">

                {

                    reviews.map((item,index)=>(

                        <div className="testimonial-card" key={index}>

                            <div className="stars">

                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />

                            </div>

                            <p className="review">

                                "{item.review}"

                            </p>

                            <h3>

                                {item.name}

                            </h3>

                            <span>

                                {item.role}

                            </span>

                        </div>

                    ))

                }

            </div>

        </section>

    );

};

export default Testimonials;