import "./../../styles/pricing.css";

import { FaCheckCircle } from "react-icons/fa";

const plans = [

    {
        title: "Free",
        price: "₹0",
        duration: "/month",
        features: [
            "Resume Analyzer",
            "ATS Checker",
            "Career Roadmap"
        ],
        highlight: false
    },

    {
        title: "Pro",
        price: "₹499",
        duration: "/month",
        features: [
            "Everything in Free",
            "Interview Coach",
            "Skill Gap Detection",
            "Salary Predictor"
        ],
        highlight: true
    },

    {
        title: "Enterprise",
        price: "₹999",
        duration: "/month",
        features: [
            "Everything in Pro",
            "Unlimited AI Usage",
            "Priority Support",
            "Company Dashboard"
        ],
        highlight: false
    }

];

const Pricing = () => {

    return (

        <section className="pricing-section">

            <div className="section-title">

                <h2>Choose Your Plan</h2>

                <p>Simple pricing for everyone.</p>

            </div>

            <div className="pricing-grid">

                {

                    plans.map((plan,index)=>(

                        <div
                            className={
                                plan.highlight
                                ? "price-card active"
                                : "price-card"
                            }
                            key={index}
                        >

                            <h3>{plan.title}</h3>

                            <h1>

                                {plan.price}

                                <span>{plan.duration}</span>

                            </h1>

                            {

                                plan.features.map((feature,i)=>(

                                    <div
                                        className="feature"
                                        key={i}
                                    >

                                        <FaCheckCircle />

                                        <span>{feature}</span>

                                    </div>

                                ))

                            }

                            <button>

                                Get Started

                            </button>

                        </div>

                    ))

                }

            </div>

        </section>

    );

};

export default Pricing;