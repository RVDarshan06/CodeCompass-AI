import "../../styles/navbar.css";
import { Link } from "react-router-dom";
import { FaCompass } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <FaCompass className="logo-icon" />
        <span>CodeCompass AI</span>
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <a href="#features">Features</a>
        </li>

        <li>
          <a href="#tools">AI Tools</a>
        </li>

        <li>
          <a href="#pricing">Pricing</a>
        </li>

        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>

      <div className="navbar-buttons">
        <Link to="/login" className="login-btn">
          Login
        </Link>

        <Link to="/register" className="register-btn">
           Get Started
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;