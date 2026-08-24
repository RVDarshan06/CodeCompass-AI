import { useState } from "react";
import "../../styles/faq.css";

import {
    FaChevronDown,
    FaChevronUp
} from "react-icons/fa";


const faqData = [
    {
        question: "Is CodeCompass AI free?",
        answer:
            "CodeCompass AI is currently available as a free platform while the project is being developed. No payment is required to create an account or use the currently available career tools."
    },

    {
        question: "What tools are available in CodeCompass AI?",
        answer:
            "The platform currently includes Resume Analyzer, ATS Checker, Interview Coach, Career Roadmap, Skill Gap Detection and Salary Predictor."
    },

    {
        question: "How does the Resume Analyzer work?",
        answer:
            "You can upload your resume and receive AI-generated analysis and suggestions based on the information extracted from your resume."
    },

    {
        question: "Can I create a personalized career roadmap?",
        answer:
            "Yes. The Career Roadmap tool uses information such as your target role, current skills, experience, education, study time and learning duration to generate a personalized roadmap."
    },

    {
        question: "Does the Interview Coach provide feedback?",
        answer:
            "Yes. The Interview Coach generates interview questions and provides AI-based feedback based on your responses."
    },

    {
        question: "How does Skill Gap Detection help?",
        answer:
            "It helps identify skills that may be missing or need improvement for your selected target career so you can focus your learning efforts."
    },

    {
        question: "How does the Salary Predictor work?",
        answer:
            "The Salary Predictor generates an AI-based salary estimate using information such as target role, experience, skills, education and location. The result should be treated as an estimate rather than a guaranteed salary."
    },

    {
        question: "Are the AI results guaranteed to be accurate?",
        answer:
            "No. AI-generated results are intended to provide guidance and should not be treated as guaranteed outcomes. Salary estimates, career recommendations and AI feedback can vary depending on the information provided."
    }
];


const FAQ = () => {

    const [activeIndex, setActiveIndex] = useState(null);


    const toggle = (index) => {

        setActiveIndex(
            activeIndex === index
                ? null
                : index
        );

    };


    return (

        <section
            className="faq-section"
            id="faq"
        >

            {/* =====================================
                HEADER
            ===================================== */}

            <div className="section-title">

                <span className="section-badge">
                    FAQ
                </span>

                <h2>
                    Frequently Asked Questions
                </h2>

                <p>
                    Find answers about CodeCompass AI
                    and its career tools.
                </p>

            </div>


            {/* =====================================
                FAQ LIST
            ===================================== */}

            <div className="faq-container">

                {faqData.map((item, index) => {

                    const isOpen =
                        activeIndex === index;

                    return (

                        <div
                            className={`faq-item ${
                                isOpen
                                    ? "faq-item-active"
                                    : ""
                            }`}
                            key={item.question}
                        >

                            <button
                                type="button"
                                className="faq-question"
                                onClick={() =>
                                    toggle(index)
                                }
                                aria-expanded={isOpen}
                            >

                                <h3>
                                    {item.question}
                                </h3>

                                <span
                                    className="faq-icon"
                                    aria-hidden="true"
                                >

                                    {isOpen
                                        ? <FaChevronUp />
                                        : <FaChevronDown />
                                    }

                                </span>

                            </button>


                            {isOpen && (

                                <div className="faq-answer">

                                    <p>
                                        {item.answer}
                                    </p>

                                </div>

                            )}

                        </div>

                    );

                })}

            </div>

        </section>

    );

};


export default FAQ;