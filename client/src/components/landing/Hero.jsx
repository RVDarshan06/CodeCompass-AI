import "../../styles/hero.css";

import { FaArrowRight, FaPlay } from "react-icons/fa";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";


const Hero = () => {

    const navigate = useNavigate();


    // =========================================
    // GET STARTED
    // =========================================

    const handleGetStarted = () => {

        navigate("/register");

    };


    // =========================================
    // WATCH DEMO
    // =========================================

    const handleWatchDemo = () => {

        const section =
            document.getElementById("how-it-works");

        if (section) {

            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    };


    return (

        <section className="hero">


            {/* =====================================
                HERO BADGE
            ===================================== */}

            <motion.div
                className="hero-badge"

                initial={{
                    opacity: 0,
                    y: 20
                }}

                animate={{
                    opacity: 1,
                    y: 0
                }}

                transition={{
                    duration: 0.6
                }}
            >

                AI-Powered Career Platform

            </motion.div>


            {/* =====================================
                HERO TITLE
            ===================================== */}

            <motion.h1

                initial={{
                    opacity: 0,
                    y: 40
                }}

                animate={{
                    opacity: 1,
                    y: 0
                }}

                transition={{
                    duration: 0.8
                }}

            >

                Navigate Your Career
                <br />

                <span>
                    With AI
                </span>

            </motion.h1>


            {/* =====================================
                HERO DESCRIPTION
            ===================================== */}

            <motion.p

                className="hero-description"

                initial={{
                    opacity: 0
                }}

                animate={{
                    opacity: 1
                }}

                transition={{
                    delay: 0.3,
                    duration: 0.6
                }}

            >

                Build a stronger career with AI-powered
                resume analysis, skill-gap detection,
                personalized career roadmaps, interview
                coaching and salary insights.

            </motion.p>


            {/* =====================================
                HERO BUTTONS
            ===================================== */}

            <motion.div

                className="hero-buttons"

                initial={{
                    opacity: 0,
                    y: 20
                }}

                animate={{
                    opacity: 1,
                    y: 0
                }}

                transition={{
                    delay: 0.5,
                    duration: 0.6
                }}

            >

                <button

                    type="button"

                    className="primary-btn"

                    onClick={handleGetStarted}

                >

                    Get Started Free

                    <FaArrowRight />

                </button>


                <button

                    type="button"

                    className="secondary-btn"

                    onClick={handleWatchDemo}

                >

                    <FaPlay />

                    Watch Demo

                </button>

            </motion.div>


            {/* =====================================
                HERO HIGHLIGHTS
            ===================================== */}

            <motion.div

                className="hero-stats"

                initial={{
                    opacity: 0,
                    y: 20
                }}

                animate={{
                    opacity: 1,
                    y: 0
                }}

                transition={{
                    delay: 0.7,
                    duration: 0.6
                }}

            >

                <div className="hero-stat">

                    <h2>
                        AI
                    </h2>

                    <span>
                        Powered Tools
                    </span>

                </div>


                <div className="hero-stat">

                    <h2>
                        6+
                    </h2>

                    <span>
                        Career Tools
                    </span>

                </div>


                <div className="hero-stat">

                    <h2>
                        1
                    </h2>

                    <span>
                        Career Platform
                    </span>

                </div>

            </motion.div>


        </section>

    );

};


export default Hero;