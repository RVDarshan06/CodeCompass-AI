import { useEffect, useState } from "react";

import "../../styles/hero.css";

import {
    FaArrowRight,
    FaPlay
} from "react-icons/fa";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import { getStats } from "../../services/statsService";


const Hero = () => {

    const navigate = useNavigate();


    // =========================================
    // REAL DATABASE STATS
    // =========================================

    const [stats, setStats] = useState({
        users: 0,
        resumes: 0,
        tools: 6
    });


    const [statsLoading, setStatsLoading] = useState(true);


    // =========================================
    // LOAD STATS
    // =========================================

    useEffect(() => {

        const loadStats = async () => {

            try {

                const data = await getStats();

                setStats({
                    users: Number(data?.users) || 0,
                    resumes: Number(data?.resumes) || 0,
                    tools: Number(data?.tools) || 6
                });

            } catch (error) {

                console.error(
                    "Failed to load homepage statistics:",
                    error
                );

                // Keep safe fallback values.
                setStats({
                    users: 0,
                    resumes: 0,
                    tools: 6
                });

            } finally {

                setStatsLoading(false);

            }

        };


        loadStats();

    }, []);


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
            document.getElementById(
                "how-it-works"
            );


        if (section) {

            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    };


    // =========================================
    // FORMAT NUMBER
    // =========================================

    const formatNumber = (number) => {

        return new Intl.NumberFormat(
            "en-IN"
        ).format(number);

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
                REAL DATABASE STATISTICS
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

                {/* ================================
                    REGISTERED USERS
                ================================= */}

                <div className="hero-stat">

                    <h2>

                        {statsLoading
                            ? "..."
                            : formatNumber(
                                stats.users
                            )
                        }

                    </h2>

                    <span>
                        Registered Users
                    </span>

                </div>


                {/* ================================
                    RESUMES ANALYZED
                ================================= */}

                <div className="hero-stat">

                    <h2>

                        {statsLoading
                            ? "..."
                            : formatNumber(
                                stats.resumes
                            )
                        }

                    </h2>

                    <span>
                        Resumes Analyzed
                    </span>

                </div>


                {/* ================================
                    AI CAREER TOOLS
                ================================= */}

                <div className="hero-stat">

                    <h2>

                        {stats.tools}

                    </h2>

                    <span>
                        AI Career Tools
                    </span>

                </div>

            </motion.div>


        </section>

    );

};


export default Hero;