import { useState } from "react";
import "./../../styles/faq.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqData = [
    {
        question: "Is CodeCompass AI free?",
        answer: "Yes. You can use the basic AI tools for free. Premium plans unlock advanced features."
    },
    {
        question: "How accurate is the Resume Analyzer?",
        answer: "Our AI analyzes resumes based on ATS standards and industry best practices."
    },
    {
        question: "Can I generate learning roadmaps?",
        answer: "Yes. CodeCompass AI generates personalized learning paths based on your career goals."
    },
    {
        question: "Does Interview Coach provide real interview questions?",
        answer: "Yes. It generates AI-based interview questions with instant feedback."
    }
];

const FAQ = () => {

    const [activeIndex, setActiveIndex] = useState(null);

    const toggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (

        <section className="faq-section">

            <div className="section-title">
                <h2>Frequently Asked Questions</h2>
                <p>Everything you need to know about CodeCompass AI.</p>
            </div>

            <div className="faq-container">

                {faqData.map((item, index) => (

                    <div className="faq-item" key={index}>

                        <div
                            className="faq-question"
                            onClick={() => toggle(index)}
                        >

                            <h3>{item.question}</h3>

                            {
                                activeIndex === index
                                    ? <FaChevronUp />
                                    : <FaChevronDown />
                            }

                        </div>

                        {
                            activeIndex === index && (

                                <div className="faq-answer">
                                    <p>{item.answer}</p>
                                </div>

                            )
                        }

                    </div>

                ))}

            </div>

        </section>

    );
};

export default FAQ;