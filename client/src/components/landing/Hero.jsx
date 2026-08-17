import "../../styles/hero.css";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="hero">

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .8 }}
      >
        AI Powered Career Navigation
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .3 }}
      >
        Resume Analysis • AI Roadmaps • Skill Gap Detection •
        Interview Coach
      </motion.p>

      <motion.div
        className="hero-buttons"
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ delay:.6 }}
      >

        <button className="primary-btn">
          Get Started Free
          <FaArrowRight />
        </button>

        <button className="secondary-btn">
          Watch Demo
        </button>

      </motion.div>

      <div className="hero-stats">

        <div>
          <h2>50K+</h2>
          <span>Users</span>
        </div>

        <div>
          <h2>500K+</h2>
          <span>AI Analyses</span>
        </div>

        <div>
          <h2>95%</h2>
          <span>Career Accuracy</span>
        </div>

      </div>

    </section>
  );
};

export default Hero;