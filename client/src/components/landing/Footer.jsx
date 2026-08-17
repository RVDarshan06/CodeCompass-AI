import "./../../styles/footer.css";

import { Link } from "react-router-dom";

import {
    FaCompass,
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaInstagram
} from "react-icons/fa";

const Footer = () => {
    return (

        <footer className="footer">

            <div className="footer-container">

                <div className="footer-column">

                    <div className="footer-logo">

                        <FaCompass />

                        <span>CodeCompass AI</span>

                    </div>

                    <p>

                        Your AI-powered career companion for resume analysis,
                        interview preparation, personalized roadmaps and job success.

                    </p>

                    <div className="footer-social">

                        <a href="#"><FaGithub /></a>

                        <a href="#"><FaLinkedin /></a>

                        <a href="#"><FaTwitter /></a>

                        <a href="#"><FaInstagram /></a>

                    </div>

                </div>

                <div className="footer-column">

                    <h3>Quick Links</h3>

                    <Link to="/">Home</Link>

                    <a href="#features">Features</a>

                    <a href="#tools">AI Tools</a>

                    <a href="#pricing">Pricing</a>

                    <a href="#contact">Contact</a>

                </div>

                <div className="footer-column">

                    <h3>AI Tools</h3>

                    <a href="#">Resume Analyzer</a>

                    <a href="#">ATS Checker</a>

                    <a href="#">Interview Coach</a>

                    <a href="#">Career Roadmap</a>

                    <a href="#">Skill Gap Detection</a>

                </div>

                <div className="footer-column">

                    <h3>Support</h3>

                    <a href="#">Help Center</a>

                    <a href="#">Privacy Policy</a>

                    <a href="#">Terms & Conditions</a>

                    <a href="#">FAQ</a>

                </div>

            </div>

            <div className="footer-bottom">

                © {new Date().getFullYear()} CodeCompass AI.
                All Rights Reserved.

            </div>

        </footer>

    );
};

export default Footer;