import "../../styles/dashboard.css";

const DashboardPage = () => {

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );


    // =====================================================
    // LOGOUT
    // =====================================================

    const logout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        window.location.href =
            "/login";

    };


    // =====================================================
    // NAVIGATION
    // =====================================================

    const goTo = (path) => {

        window.location.href = path;

    };


    return (

        <div className="dashboard">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="dashboard-header">

                <h1>
                    Welcome, {user?.name} 👋
                </h1>


                <button
                    onClick={logout}
                >
                    Logout
                </button>

            </div>


            {/* =================================================
                DASHBOARD CARDS
            ================================================= */}

            <div className="dashboard-cards">


                {/* =================================================
                    RESUME ANALYZER
                ================================================= */}

                <div
                    className="card"
                    onClick={() =>
                        goTo(
                            "/resume-analyzer"
                        )
                    }
                >

                    <h2>
                        📄 Resume Analyzer
                    </h2>


                    <p>
                        Upload and analyze your
                        resume using AI.
                    </p>


                    <button
                        className="card-button"
                        onClick={(event) => {

                            event.stopPropagation();

                            goTo(
                                "/resume-analyzer"
                            );

                        }}
                    >
                        Analyze Resume →
                    </button>

                </div>


                {/* =================================================
                    ATS CHECKER
                ================================================= */}

                <div
                    className="card"
                    onClick={() =>
                        goTo(
                            "/ats-checker"
                        )
                    }
                >

                    <h2>
                        ATS Checker
                    </h2>


                    <p>
                        Check ATS compatibility
                        of your resume.
                    </p>


                    <button
                        className="card-button"
                        onClick={(event) => {

                            event.stopPropagation();

                            goTo(
                                "/ats-checker"
                            );

                        }}
                    >
                        Check ATS →
                    </button>

                </div>


                {/* =================================================
                    INTERVIEW COACH
                ================================================= */}

                <div
                    className="card"
                    onClick={() =>
                        goTo(
                            "/interview-coach"
                        )
                    }
                >

                    <h2>
                        🤖 Interview Coach
                    </h2>


                    <p>
                        Practice interviews with
                        AI-generated questions.
                    </p>


                    <button
                        className="card-button"
                        onClick={(event) => {

                            event.stopPropagation();

                            goTo(
                                "/interview-coach"
                            );

                        }}
                    >
                        Practice Interview →
                    </button>

                </div>


                {/* =================================================
                    CAREER ROADMAP
                ================================================= */}

                <div
                    className="card"
                    onClick={() =>
                        goTo(
                            "/career-roadmap"
                        )
                    }
                >

                    <h2>
                        🗺️ Career Roadmap
                    </h2>


                    <p>
                        Generate a personalized
                        AI learning roadmap.
                    </p>


                    <button
                        className="card-button"
                        onClick={(event) => {

                            event.stopPropagation();

                            goTo(
                                "/career-roadmap"
                            );

                        }}
                    >
                        Create Roadmap →
                    </button>

                </div>


                {/* =================================================
                    SKILL GAP
                ================================================= */}

                <div
                    className="card"
                    onClick={() =>
                        window.location.href = "/skill-gap"
                    }
                >
                    <h2>📊 Skill Gap Detection</h2>

                    <p>
                        Discover missing skills required for
                        your target job role.
                    </p>

                    <button className="card-button">
                        Detect Skill Gap →
                    </button>
                </div>


                {/* =================================================
                    SALARY PREDICTOR
                ================================================= */}

                <div
                    className="card"
                    onClick={() =>
                        window.location.href = "/salary-predictor"
                    }
                >
                    <h2>💰 Salary Predictor</h2>

                    <p>
                        Estimate your expected salary using AI.
                    </p>

                    <button className="card-button">
                        Predict Salary →
                    </button>
                </div>

            </div>

        </div>

    );

};


export default DashboardPage;