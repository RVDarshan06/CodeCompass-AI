import "../../styles/footer.css";

import { Link } from "react-router-dom";

import {
    FaCompass,
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaInstagram
} from "react-icons/fa";


const Footer = () => {

    const currentYear = new Date().getFullYear();


    const scrollToSection = (sectionId) => {

        if (window.location.pathname !== "/") {

            window.location.href =
                `/#${sectionId}`;

            return;
        }


        const section =
            document.getElementById(sectionId);


        if (section) {

            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    };


    return (

        <footer
            className="footer"
            id="contact"
        >

            <div className="footer-container">


                {/* =====================================
                    BRAND
                ===================================== */}

                <div className="footer-column footer-brand">

                    <Link
                        to="/"
                        className="footer-logo"
                    >

                        <FaCompass />

                        <span>
                            CodeCompass AI
                        </span>

                    </Link>


                    <p>
                        An AI-powered career platform designed
                        to help you analyze your resume, discover
                        skill gaps, prepare for interviews and
                        plan your career journey.
                    </p>


                    {/* Social links */}

                    <div className="footer-social">

                        <a
                            href="https://github.com/RVDarshan06/CodeCompass-AI"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                        >
                            <FaGithub />
                        </a>


                        <a
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin />
                        </a>


                        <a
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            aria-label="Twitter"
                        >
                            <FaTwitter />
                        </a>


                        <a
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            aria-label="Instagram"
                        >
                            <FaInstagram />
                        </a>

                    </div>

                </div>


                {/* =====================================
                    QUICK LINKS
                ===================================== */}

                <div className="footer-column">

                    <h3>
                        Quick Links
                    </h3>


                    <Link to="/">
                        Home
                    </Link>


                    <button
                        type="button"
                        onClick={() =>
                            scrollToSection("features")
                        }
                    >
                        Features
                    </button>


                    <button
                        type="button"
                        onClick={() =>
                            scrollToSection("ai-tools")
                        }
                    >
                        AI Tools
                    </button>


                    <button
                        type="button"
                        onClick={() =>
                            scrollToSection("how-it-works")
                        }
                    >
                        How It Works
                    </button>


                    <button
                        type="button"
                        onClick={() =>
                            scrollToSection("pricing")
                        }
                    >
                        Pricing
                    </button>


                    <button
                        type="button"
                        onClick={() =>
                            scrollToSection("faq")
                        }
                    >
                        FAQ
                    </button>

                </div>


                {/* =====================================
                    AI TOOLS
                ===================================== */}

                <div className="footer-column">

                    <h3>
                        AI Tools
                    </h3>


                    <Link to="/resume-analyzer">
                        Resume Analyzer
                    </Link>


                    <Link to="/ats-checker">
                        ATS Checker
                    </Link>


                    <Link to="/interview-coach">
                        Interview Coach
                    </Link>


                    <Link to="/career-roadmap">
                        Career Roadmap
                    </Link>


                    <Link to="/skill-gap">
                        Skill Gap Detection
                    </Link>


                    <Link to="/salary-predictor">
                        Salary Predictor
                    </Link>

                </div>


                {/* =====================================
                    ACCOUNT
                ===================================== */}

                <div className="footer-column">

                    <h3>
                        Account
                    </h3>


                    <Link to="/login">
                        Login
                    </Link>


                    <Link to="/register">
                        Create Account
                    </Link>


                    <Link to="/dashboard">
                        Dashboard
                    </Link>


                    <button
                        type="button"
                        onClick={() =>
                            scrollToSection("faq")
                        }
                    >
                        FAQ
                    </button>

                </div>

            </div>


            {/* =====================================
                FOOTER BOTTOM
            ===================================== */}

            <div className="footer-bottom">

                <p>
                    © {currentYear} CodeCompass AI.
                    All Rights Reserved.
                </p>

                <p>
                    Built with React, Node.js,
                    MongoDB and AI.
                </p>

            </div>

        </footer>

    );

};


export default Footer;