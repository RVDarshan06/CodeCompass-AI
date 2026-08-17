import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/Landing/LandingPage";
import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/Register/RegisterPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import ResumeAnalyzerPage from "../pages/ResumeAnalyzer/ResumeAnalyzerPage";
import ATSCheckerPage from "../pages/ATSChecker/ATSCheckerPage";
import InterviewCoachPage from "../pages/InterviewCoach/InterviewCoachPage";
import CareerRoadmapPage from "../pages/CareerRoadmapPage";
import SkillGapPage from "../pages/SkillGap/SkillGapPage";
import SalaryPredictorPage from "../pages/SalaryPredictor/SalaryPredictorPage";

import NotFoundPage from "../pages/NotFound/NotFoundPage";

function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Landing */}
                <Route
                    path="/"
                    element={<LandingPage />}
                />

                {/* Authentication */}
                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />

                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={<DashboardPage />}
                />

                {/* AI Tools */}
                <Route
                    path="/resume-analyzer"
                    element={<ResumeAnalyzerPage />}
                />

                <Route
                    path="/ats-checker"
                    element={<ATSCheckerPage />}
                />

                <Route
                    path="/interview-coach"
                    element={<InterviewCoachPage />}
                />

                <Route
                    path="/career-roadmap"
                    element={<CareerRoadmapPage />}
                />

                 <Route
                    path="/skill-gap"
                    element={<SkillGapPage />}
                />

                <Route
                    path="/salary-predictor"
                    element={<SalaryPredictorPage />}
                />

                {/* 404 */}
                <Route
                    path="*"
                    element={<NotFoundPage />}
                />

            </Routes>

        </BrowserRouter>

    );
}

export default AppRoutes;