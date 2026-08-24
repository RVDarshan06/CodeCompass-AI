import Background from "../../components/landing/Background";
import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import Features from "../../components/landing/Features";
import HowItWorks from "../../components/landing/HowItWorks";
import AITools from "../../components/landing/AITools";
import Testimonials from "../../components/landing/Testimonials";
import Pricing from "../../components/landing/Pricing";
import FAQ from "../../components/landing/FAQ";
import CTA from "../../components/landing/CTA";
import Footer from "../../components/landing/Footer";

const LandingPage = () => {
  return (
    <>
      <Background />
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <AITools />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
};

export default LandingPage;