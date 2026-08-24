import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCompass, FaBars, FaTimes } from "react-icons/fa";

import "../../styles/navbar.css";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const location = useLocation();

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const handleSectionClick = (sectionId) => {
        closeMenu();

        if (location.pathname !== "/") {
            window.location.href = `/#${sectionId}`;
            return;
        }

        const section = document.getElementById(sectionId);

        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    };

    return (
        <nav className="navbar">

            {/* =========================
                LOGO
            ========================= */}

            <Link
                to="/"
                className="navbar-logo"
                onClick={closeMenu}
            >
                <FaCompass className="logo-icon" />

                <span>
                    CodeCompass AI
                </span>
            </Link>


            {/* =========================
                MOBILE MENU BUTTON
            ========================= */}

            <button
                type="button"
                className="mobile-menu-button"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={
                    menuOpen
                        ? "Close navigation menu"
                        : "Open navigation menu"
                }
                aria-expanded={menuOpen}
            >
                {menuOpen ? <FaTimes /> : <FaBars />}
            </button>


            {/* =========================
                NAVIGATION LINKS
            ========================= */}

            <ul
                className={`navbar-links ${
                    menuOpen ? "navbar-links-open" : ""
                }`}
            >

                <li>
                    <Link
                        to="/"
                        onClick={closeMenu}
                    >
                        Home
                    </Link>
                </li>


                <li>
                    <button
                        type="button"
                        onClick={() =>
                            handleSectionClick("features")
                        }
                    >
                        Features
                    </button>
                </li>


                <li>
                    <button
                        type="button"
                        onClick={() =>
                            handleSectionClick("ai-tools")
                        }
                    >
                        AI Tools
                    </button>
                </li>


                <li>
                    <button
                        type="button"
                        onClick={() =>
                            handleSectionClick("how-it-works")
                        }
                    >
                        How It Works
                    </button>
                </li>


                <li>
                    <button
                        type="button"
                        onClick={() =>
                            handleSectionClick("pricing")
                        }
                    >
                        Pricing
                    </button>
                </li>


                <li>
                    <button
                        type="button"
                        onClick={() =>
                            handleSectionClick("contact")
                        }
                    >
                        Contact
                    </button>
                </li>

            </ul>


            {/* =========================
                AUTH BUTTONS
            ========================= */}

            <div
                className={`navbar-buttons ${
                    menuOpen ? "navbar-buttons-open" : ""
                }`}
            >

                <Link
                    to="/login"
                    className="login-btn"
                    onClick={closeMenu}
                >
                    Login
                </Link>


                <Link
                    to="/register"
                    className="register-btn"
                    onClick={closeMenu}
                >
                    Get Started
                </Link>

            </div>

        </nav>
    );
};

export default Navbar;