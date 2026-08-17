const { GoogleGenAI } = require("@google/genai");

// =====================================================
// GEMINI CONFIGURATION
// =====================================================

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const GEMINI_MODEL = "gemini-3.1-flash-lite";


// =====================================================
// COMMON GEMINI RESPONSE HELPERS
// =====================================================

const getGeminiResponseText = (response) => {

    if (!response) {
        return "";
    }

    // Normal @google/genai response
    if (
        typeof response.text === "string" &&
        response.text.trim()
    ) {
        return response.text.trim();
    }

    // Fallback if response.text is unavailable
    const parts =
        response.candidates?.[0]?.content?.parts || [];

    return parts
        .map(part => part?.text || "")
        .join("\n")
        .trim();
};


const parseGeminiJson = (
    rawText,
    label = "AI"
) => {

    if (
        !rawText ||
        !rawText.trim()
    ) {
        throw new Error(
            `${label} returned an empty response.`
        );
    }

    let cleanedText =
        rawText.trim();

    // Remove Markdown code fences
    cleanedText =
        cleanedText
            .replace(
                /^```json\s*/i,
                ""
            )
            .replace(
                /^```\s*/i,
                ""
            )
            .replace(
                /\s*```$/i,
                ""
            )
            .trim();

    // Sometimes AI adds text before/after JSON.
    // Extract the JSON object.
    const firstBrace =
        cleanedText.indexOf("{");

    const lastBrace =
        cleanedText.lastIndexOf("}");

    if (
        firstBrace !== -1 &&
        lastBrace !== -1 &&
        lastBrace > firstBrace
    ) {
        cleanedText =
            cleanedText.slice(
                firstBrace,
                lastBrace + 1
            );
    }

    try {

        return JSON.parse(
            cleanedText
        );

    } catch (error) {

        console.error(
            `${label} JSON parsing failed.`
        );

        console.error(
            "Raw response:",
            rawText
        );

        console.error(
            "Cleaned response:",
            cleanedText
        );

        throw new Error(
            `${label} returned invalid JSON.`
        );
    }
};


// =====================================================
// INTERVIEW QUESTION MEMORY
// =====================================================

const generatedInterviewQuestions =
    new Map();


// =====================================================
// INTERVIEW KEY
// =====================================================

const getInterviewKey = (
    interviewType,
    difficulty
) => {

    return `${interviewType}-${difficulty}`
        .toLowerCase()
        .trim();
};


// =====================================================
// STORED QUESTIONS
// =====================================================

const getStoredQuestions = (
    interviewType,
    difficulty
) => {

    const key =
        getInterviewKey(
            interviewType,
            difficulty
        );

    return (
        generatedInterviewQuestions
            .get(key) || []
    );
};


// =====================================================
// NORMALIZE QUESTION
// =====================================================

const normalizeQuestion = (
    question
) => {

    if (!question) {
        return "";
    }

    return question
        .toLowerCase()
        .replace(
            /[`"'“”‘’]/g,
            ""
        )
        .replace(
            /^\s*\d+[\.\)]\s*/,
            ""
        )
        .replace(
            /\s+/g,
            " "
        )
        .trim();
};


// =====================================================
// DUPLICATE QUESTION CHECK
// =====================================================

const isDuplicateQuestion = (
    newQuestion,
    previousQuestions
) => {

    const normalizedNewQuestion =
        normalizeQuestion(
            newQuestion
        );

    if (!normalizedNewQuestion) {
        return true;
    }

    return previousQuestions.some(
        question => {

            const normalizedPrevious =
                normalizeQuestion(
                    question
                );

            if (
                normalizedNewQuestion ===
                normalizedPrevious
            ) {
                return true;
            }

            const wordsNew =
                new Set(
                    normalizedNewQuestion
                        .split(" ")
                        .filter(
                            word =>
                                word.length > 3
                        )
                );

            const wordsPrevious =
                new Set(
                    normalizedPrevious
                        .split(" ")
                        .filter(
                            word =>
                                word.length > 3
                        )
                );

            if (
                wordsNew.size === 0 ||
                wordsPrevious.size === 0
            ) {
                return false;
            }

            let commonWords = 0;

            wordsNew.forEach(
                word => {

                    if (
                        wordsPrevious.has(
                            word
                        )
                    ) {
                        commonWords++;
                    }
                }
            );

            const similarity =
                commonWords /
                Math.min(
                    wordsNew.size,
                    wordsPrevious.size
                );

            return similarity >= 0.75;
        }
    );
};


// =====================================================
// CLEAN INTERVIEW QUESTION
// =====================================================

const cleanGeneratedQuestion = (
    question
) => {

    if (!question) {
        return "";
    }

    let cleaned =
        question.trim();

    cleaned =
        cleaned.replace(
            /```/g,
            ""
        );

    cleaned =
        cleaned.replace(
            /^["'“”]+|["'“”]+$/g,
            ""
        );

    cleaned =
        cleaned.replace(
            /^\s*(question\s*)?\d+[\.\):\-]\s*/i,
            ""
        );

    cleaned =
        cleaned.replace(
            /^\s*question\s*:\s*/i,
            ""
        );

    return cleaned.trim();
};


// =====================================================
// RESUME ANALYZER
// =====================================================

const analyzeResume = async (
    extractedText
) => {

    const prompt = `
You are an expert resume reviewer and career advisor.

Analyze the following resume for a student or entry-level software developer.

RESUME:
${extractedText}

Provide a comprehensive analysis.

Include:

1. Overall Resume Score out of 100
2. Professional Summary
3. Strengths
4. Weaknesses
5. Technical Skills Analysis
6. Projects Analysis
7. Education Analysis
8. ATS Compatibility
9. Missing Skills
10. Formatting Suggestions
11. Specific Improvements
12. Recommended Resume Structure

Be honest, practical and constructive.

Focus especially on helping a student improve the resume for internships and entry-level software jobs.

Return the analysis in clear Markdown sections.
`;

    try {

        const response =
            await ai.models.generateContent({
                model: GEMINI_MODEL,
                contents: prompt
            });

        return getGeminiResponseText(
            response
        );

    } catch (error) {

        console.error(
            "Gemini resume analysis error:",
            error
        );

        throw error;
    }
};


// =====================================================
// ATS CHECKER
// =====================================================

const checkATS = async (
    resumeText,
    jobDescription
) => {

    const prompt = `
You are an expert Applicant Tracking System (ATS) resume evaluator.

Compare the candidate's resume with the job description.

====================
RESUME
====================

${resumeText}

====================
JOB DESCRIPTION
====================

${jobDescription}

Analyze the match between the resume and job description.

Return:

1. ATS MATCH SCORE: XX/100

2. MATCHED SKILLS

List important skills from the job description already present in the resume.

3. MISSING SKILLS

List important skills from the job description missing from the resume.

4. KEYWORD MATCH

Explain matched and missing keywords.

5. EXPERIENCE MATCH

Explain how well projects, education and experience match the job.

6. RESUME IMPROVEMENTS

Give specific suggestions.

7. FINAL RECOMMENDATION

Explain whether the resume is currently a strong match.

Be practical and suitable for a student or entry-level candidate.

Return the result using clear Markdown sections.
`;

    try {

        const response =
            await ai.models.generateContent({
                model: GEMINI_MODEL,
                contents: prompt
            });

        return getGeminiResponseText(
            response
        );

    } catch (error) {

        console.error(
            "Gemini ATS analysis error:",
            error
        );

        throw error;
    }
};


// =====================================================
// GENERATE INTERVIEW QUESTION
// =====================================================

const generateInterviewQuestion =
    async (
        interviewType,
        difficulty,
        previousQuestions = []
    ) => {

        try {

            console.log(
                "Generating interview question..."
            );

            const storedQuestions =
                getStoredQuestions(
                    interviewType,
                    difficulty
                );

            const allPreviousQuestions = [
                ...previousQuestions,
                ...storedQuestions
            ];

            const uniquePreviousQuestions = [
                ...new Map(
                    allPreviousQuestions.map(
                        question => [
                            normalizeQuestion(
                                question
                            ),
                            question
                        ]
                    )
                ).values()
            ];

            const previousQuestionsText =
                uniquePreviousQuestions.length > 0

                    ? uniquePreviousQuestions
                        .map(
                            (
                                question,
                                index
                            ) =>
                                `${index + 1}. ${question}`
                        )
                        .join("\n")

                    : "No previous questions.";

            let prompt = `
You are an expert interviewer conducting a professional interview.

Interview Type:
${interviewType}

Difficulty:
${difficulty}

PREVIOUSLY ASKED QUESTIONS:

${previousQuestionsText}

TASK:

Generate ONE completely NEW interview question.

RULES:

1. Generate exactly ONE question.
2. Do not repeat a previous question.
3. Do not simply reword an old question.
4. Do not test the same concept using different wording.
5. Choose a genuinely different topic or concept.
6. Do not provide an answer.
7. Do not provide explanations.
8. Do not number the question.
9. Return ONLY the question.

For technical interviews rotate between:

- Operating Systems
- DBMS
- Computer Networks
- OOP
- Java
- JavaScript
- Python
- Data Structures
- Algorithms
- SQL
- Software Engineering
- Computer Architecture
- Exception Handling
- Memory Management
- REST APIs
- Git
- Cloud Computing

For coding interviews rotate between:

- Arrays
- Strings
- Hash Maps
- Linked Lists
- Stacks
- Queues
- Trees
- Recursion
- Sorting
- Searching
- Two Pointers
- Sliding Window
- Binary Search
- Dynamic Programming

For HR interviews rotate between:

- Failure
- Learning from mistakes
- Adaptability
- Time management
- Handling deadlines
- Receiving feedback
- Career goals
- Motivation
- Problem solving
- Decision making
- Communication
- Handling pressure
- Learning new technology

For system design:

- URL Shortener
- Food Delivery System
- Online Shopping System
- Chat Application
- Video Streaming Platform
- Ride Booking System
- Notification System
- Online Banking System
- Social Media Platform
- Hotel Booking System
- Online Examination System
- File Storage System
- Job Portal
- E-learning Platform

Difficulty:

Easy:
Basic concepts and simple scenarios.

Medium:
Practical application and moderate reasoning.

Hard:
Deep reasoning, trade-offs, edge cases and design decisions.

Return ONLY one new question.
`;

            const MAX_ATTEMPTS = 3;

            for (
                let attempt = 1;
                attempt <= MAX_ATTEMPTS;
                attempt++
            ) {

                const response =
                    await ai.models.generateContent({
                        model: GEMINI_MODEL,
                        contents: prompt
                    });

                let question =
                    getGeminiResponseText(
                        response
                    );

                question =
                    cleanGeneratedQuestion(
                        question
                    );

                console.log(
                    "Generated question:",
                    question
                );

                const duplicate =
                    isDuplicateQuestion(
                        question,
                        uniquePreviousQuestions
                    );

                if (!duplicate) {

                    const key =
                        getInterviewKey(
                            interviewType,
                            difficulty
                        );

                    if (
                        !generatedInterviewQuestions.has(
                            key
                        )
                    ) {
                        generatedInterviewQuestions.set(
                            key,
                            []
                        );
                    }

                    generatedInterviewQuestions
                        .get(key)
                        .push(question);

                    return question;
                }

                prompt += `

The previous generated question was too similar.

Generate a completely different question.

Choose another topic and concept.

Return ONLY the replacement question.
`;
            }

            throw new Error(
                "Unable to generate a unique interview question. Please try again."
            );

        } catch (error) {

            console.error(
                "Gemini interview question error:",
                error
            );

            throw error;
        }
    };


// =====================================================
// EVALUATE INTERVIEW ANSWER
// =====================================================

const evaluateInterviewAnswer =
    async (
        question,
        answer,
        interviewType,
        difficulty
    ) => {

        const prompt = `
You are an expert interviewer evaluating a candidate.

Interview Type:
${interviewType}

Difficulty:
${difficulty}

QUESTION:
${question}

CANDIDATE ANSWER:
${answer}

Evaluate the candidate's answer carefully.

Return EXACTLY:

SCORE: XX

FEEDBACK:
Write a clear and constructive evaluation.

STRENGTHS:
- Strength 1
- Strength 2
- Strength 3

WEAKNESSES:
- Weakness 1
- Weakness 2
- Weakness 3

IMPROVEMENTS:
- Improvement 1
- Improvement 2
- Improvement 3

POSSIBLE ANSWER:
Write a strong sample answer for the original question.

Rules:

1. SCORE must be between 0 and 100.
2. Be fair and constructive.
3. For technical questions evaluate technical correctness.
4. For coding questions evaluate logic and problem solving.
5. For HR questions evaluate communication and relevance.
6. For system design evaluate architecture and reasoning.
7. Possible answer must directly answer the original question.
8. Suitable for a student or entry-level candidate.
9. Do not include a score inside POSSIBLE ANSWER.
10. Do not explain the evaluation inside POSSIBLE ANSWER.
11. Keep the answer natural and interview-ready.
12. Do not omit any section.
`;

        try {

            const response =
                await ai.models.generateContent({
                    model: GEMINI_MODEL,
                    contents: prompt
                });

            const text =
                getGeminiResponseText(
                    response
                );

            const scoreMatch =
                text.match(
                    /SCORE:\s*(\d+)/i
                );

            const score =
                scoreMatch
                    ? Math.min(
                        100,
                        Math.max(
                            0,
                            parseInt(
                                scoreMatch[1],
                                10
                            )
                        )
                    )
                    : 0;

            const feedbackMatch =
                text.match(
                    /FEEDBACK:\s*([\s\S]*?)\s*STRENGTHS:/i
                );

            const strengthsMatch =
                text.match(
                    /STRENGTHS:\s*([\s\S]*?)\s*WEAKNESSES:/i
                );

            const weaknessesMatch =
                text.match(
                    /WEAKNESSES:\s*([\s\S]*?)\s*IMPROVEMENTS:/i
                );

            const improvementsMatch =
                text.match(
                    /IMPROVEMENTS:\s*([\s\S]*?)\s*POSSIBLE ANSWER:/i
                );

            const possibleAnswerMatch =
                text.match(
                    /POSSIBLE ANSWER:\s*([\s\S]*)/i
                );

            return {

                score,

                feedback:
                    feedbackMatch
                        ? feedbackMatch[1].trim()
                        : "",

                strengths:
                    strengthsMatch
                        ? strengthsMatch[1].trim()
                        : "",

                weaknesses:
                    weaknessesMatch
                        ? weaknessesMatch[1].trim()
                        : "",

                improvements:
                    improvementsMatch
                        ? improvementsMatch[1].trim()
                        : "",

                possibleAnswer:
                    possibleAnswerMatch
                        ? possibleAnswerMatch[1].trim()
                        : ""
            };

        } catch (error) {

            console.error(
                "Gemini interview evaluation error:",
                error
            );

            throw error;
        }
    };


// =====================================================
// CLEAR INTERVIEW HISTORY
// =====================================================

const clearInterviewQuestionHistory =
    (
        interviewType = null,
        difficulty = null
    ) => {

        if (
            interviewType &&
            difficulty
        ) {

            const key =
                getInterviewKey(
                    interviewType,
                    difficulty
                );

            generatedInterviewQuestions.delete(
                key
            );

            console.log(
                `Cleared interview history for ${key}`
            );

            return;
        }

        generatedInterviewQuestions.clear();

        console.log(
            "All interview question history cleared."
        );
    };


// =====================================================
// CAREER ROADMAP
// =====================================================

const generateCareerRoadmap =
    async (
        targetRole,
        currentSkills,
        experience,
        education,
        studyHours,
        duration
    ) => {

        const prompt = `
You are an expert career advisor and software engineering mentor.

Create a personalized career roadmap for a student or entry-level software developer.

TARGET JOB ROLE:
${targetRole}

CURRENT SKILLS:
${currentSkills}

EXPERIENCE:
${experience}

EDUCATION:
${education}

AVAILABLE STUDY TIME:
${studyHours} per day

LEARNING DURATION:
${duration}

Create a practical roadmap that helps the candidate become job-ready.

Consider:

1. Skills that should be learned
2. Order in which skills should be learned
3. Important technologies
4. Practical projects
5. DSA/problem solving
6. Interview preparation
7. Weekly learning plan
8. Resume preparation
9. GitHub preparation
10. Job application preparation

Rules:

- Do not recommend technologies the candidate already knows unnecessarily.
- Do not recommend too many technologies.
- Prioritize technologies relevant to the target role.
- Projects should increase in difficulty.
- Projects must be realistic for a student.
- Consider available study hours.
- Make the roadmap achievable.
- Include DSA where appropriate.
- Include technical interview preparation.
- Include HR preparation.
- Include resume and GitHub preparation.
- Avoid generic motivational content.
- Give actionable tasks.

Return ONLY valid JSON.

Use this structure:

{
    "goal": "Short description",
    "level": "Current level",
    "skills": [],
    "technologies": [],
    "phases": [
        {
            "title": "Phase 1 - Foundation",
            "duration": "X weeks",
            "topics": [],
            "description": "Description"
        }
    ],
    "projects": [
        {
            "title": "Project name",
            "description": "Description",
            "skills": []
        }
    ],
    "weeklyPlan": [
        {
            "week": "Week 1",
            "focus": "Main focus",
            "tasks": []
        }
    ],
    "interviewPrep": {
        "technical": [],
        "coding": [],
        "hr": [],
        "systemDesign": []
    },
    "jobReadiness": []
}

Return ONLY JSON.
Do not use Markdown.
Do not use code fences.
`;

        try {

            console.log(
                "Generating career roadmap..."
            );

            const response =
                await ai.models.generateContent({
                    model: GEMINI_MODEL,
                    contents: prompt,
                    config: {
                        responseMimeType:
                            "application/json"
                    }
                });

            const text =
                getGeminiResponseText(
                    response
                );

            const roadmap =
                parseGeminiJson(
                    text,
                    "Career roadmap"
                );

            if (
                !roadmap ||
                typeof roadmap !== "object"
            ) {
                throw new Error(
                    "Invalid career roadmap received from AI."
                );
            }

            if (
                !roadmap.goal ||
                !roadmap.level
            ) {
                throw new Error(
                    "Career roadmap is incomplete."
                );
            }

            console.log(
                "Career roadmap generated successfully."
            );

            return roadmap;

        } catch (error) {

            console.error(
                "Gemini career roadmap error:",
                error
            );

            throw error;
        }
    };


// =====================================================
// SKILL GAP DETECTION
// =====================================================

const generateSkillGap =
    async (
        targetRole,
        currentSkills,
        experience,
        education
    ) => {

        const prompt = `
You are an expert career advisor and technical recruiter.

Analyze the candidate's current skills against the skills normally expected for the target job role.

TARGET ROLE:
${targetRole}

CURRENT SKILLS:
${currentSkills}

EXPERIENCE LEVEL:
${experience}

EDUCATION:
${education}

Identify:

1. Skills the candidate already has
2. Important missing skills
3. Skills that need improvement
4. Priority of each missing skill
5. Why each skill is important
6. Recommended learning order
7. Recommended projects
8. Interview preparation topics
9. Overall readiness percentage

IMPORTANT:

- Focus on realistic skills for the target role.
- Consider that the candidate may be a student or entry-level developer.
- Do not require unnecessary senior-level technologies.
- Do not assume skills that are not mentioned.
- Give practical recommendations.
- Prioritize important skills first.

Return ONLY valid JSON.

Use this structure:

{
    "readinessScore": 0,
    "summary": "Short summary",
    "matchedSkills": [
        {
            "skill": "Skill",
            "level": "Beginner/Intermediate/Advanced",
            "comment": "Explanation"
        }
    ],
    "missingSkills": [
        {
            "skill": "Skill",
            "priority": "High/Medium/Low",
            "reason": "Reason"
        }
    ],
    "improvementAreas": [
        {
            "skill": "Skill",
            "priority": "High/Medium/Low",
            "recommendation": "Recommendation"
        }
    ],
    "learningOrder": [],
    "recommendedProjects": [
        {
            "project": "Project",
            "skills": "Skills",
            "description": "Description"
        }
    ],
    "interviewTopics": []
}

Return ONLY JSON.
Do not use Markdown.
Do not use code fences.
`;

        try {

            console.log(
                "Generating skill gap using Gemini..."
            );

            const response =
                await ai.models.generateContent({
                    model: GEMINI_MODEL,
                    contents: prompt,
                    config: {
                        responseMimeType:
                            "application/json"
                    }
                });

            const text =
                getGeminiResponseText(
                    response
                );

            console.log(
                "Raw skill gap response:",
                text
            );

            return parseGeminiJson(
                text,
                "Skill gap"
            );

        } catch (error) {

            console.error(
                "Gemini skill gap error:",
                error
            );

            throw error;
        }
    };


// =====================================================
// SALARY PREDICTOR
// =====================================================

const generateSalaryPrediction =
    async (
        targetRole,
        experience,
        skills,
        education,
        location
    ) => {

        const prompt = `
You are an expert technology career advisor and salary analyst.

Estimate the expected salary for the candidate based on the information below.

CANDIDATE INFORMATION:

TARGET JOB ROLE:
${targetRole}

EXPERIENCE LEVEL:
${experience}

SKILLS:
${skills}

EDUCATION:
${education}

LOCATION:
${location}

TASK:

Estimate a realistic salary range for this candidate.

Consider:

1. Target job role
2. Experience level
3. Technical skills
4. Education
5. Location
6. Current technology demand
7. Entry-level / student market conditions
8. Skill combination
9. Career level

Since this is a student/entry-level career application,
do not give unrealistically high salaries.

For Indian locations, return salary values in Indian Rupees (INR)
as annual salary.

IMPORTANT:

- Give a realistic estimate.
- Salary should be annual.
- Use numbers only for salary fields.
- Do not include currency symbols inside numeric fields.
- Give useful factors explaining the estimate.
- Give practical recommendations for increasing salary potential.
- Do not claim that the result is an exact salary offer.
- The result is an AI-based market estimate.

RETURN FORMAT:

Return ONLY valid JSON.
Do not use Markdown.
Do not use code fences.
Do not add text before or after the JSON.

Use EXACTLY:

{
    "role": "${targetRole}",
    "location": "${location}",
    "experience": "${experience}",
    "salaryRange": "₹X - ₹Y per year",
    "minimumSalary": 0,
    "maximumSalary": 0,
    "averageSalary": 0,
    "monthlyEstimate": 0,
    "marketDemand": "Low/Moderate/High/Very High",
    "careerLevel": "Entry Level",
    "factors": [
        "Factor 1",
        "Factor 2",
        "Factor 3"
    ],
    "recommendations": [
        "Recommendation 1",
        "Recommendation 2",
        "Recommendation 3"
    ]
}

QUALITY RULES:

- minimumSalary must be less than averageSalary.
- averageSalary must be less than maximumSalary.
- monthlyEstimate should be approximately averageSalary / 12.
- All salary numeric values must be numbers.
- Do not put commas inside numeric values.
- Keep factors specific to the candidate.
- Keep recommendations practical.
`;

        try {

            console.log(
                "Generating salary prediction..."
            );

            console.log(
                "Target Role:",
                targetRole
            );

            console.log(
                "Experience:",
                experience
            );

            console.log(
                "Location:",
                location
            );

            let prediction = null;

            // =================================================
            // IMPORTANT FIX:
            // Retry because Gemini can occasionally return
            // an empty/truncated response.
            // =================================================

            for (
                let attempt = 1;
                attempt <= 2;
                attempt++
            ) {

                try {

                    const response =
                        await ai.models.generateContent({
                            model: GEMINI_MODEL,
                            contents:
                                attempt === 1
                                    ? prompt
                                    : `${prompt}

IMPORTANT RETRY:
Return ONE complete valid JSON object.
Do not return an empty response.
Do not use Markdown.
Do not use code fences.
Do not add explanations.`,
                            config: {
                                responseMimeType:
                                    "application/json"
                            }
                        });

                    // =================================================
                    // SAFELY GET RESPONSE TEXT
                    // =================================================

                    const text =
                        getGeminiResponseText(
                            response
                        );

                    console.log(
                        `Raw salary prediction response (attempt ${attempt}):`,
                        text
                    );

                    // =================================================
                    // SAFELY PARSE JSON
                    // =================================================

                    prediction =
                        parseGeminiJson(
                            text,
                            "Salary prediction"
                        );

                    break;

                } catch (error) {

                    console.error(
                        `Salary prediction attempt ${attempt} failed:`,
                        error.message
                    );

                    if (
                        attempt === 2
                    ) {

                        throw new Error(
                            `Unable to generate a valid salary prediction: ${error.message}`
                        );
                    }
                }
            }


            // =================================================
            // VALIDATE OBJECT
            // =================================================

            if (
                !prediction ||
                typeof prediction !== "object" ||
                Array.isArray(prediction)
            ) {

                throw new Error(
                    "Invalid salary prediction received from AI."
                );
            }


            // =================================================
            // VALIDATE REQUIRED SALARY FIELDS
            // =================================================

            if (
                prediction.minimumSalary ===
                    undefined ||

                prediction.maximumSalary ===
                    undefined ||

                prediction.averageSalary ===
                    undefined
            ) {

                throw new Error(
                    "Salary prediction is incomplete."
                );
            }


            // =================================================
            // CONVERT NUMBERS
            // =================================================

            prediction.minimumSalary =
                Number(
                    prediction.minimumSalary
                );

            prediction.maximumSalary =
                Number(
                    prediction.maximumSalary
                );

            prediction.averageSalary =
                Number(
                    prediction.averageSalary
                );


            // =================================================
            // CHECK NUMBERS
            // =================================================

            if (
                !Number.isFinite(
                    prediction.minimumSalary
                ) ||

                !Number.isFinite(
                    prediction.maximumSalary
                ) ||

                !Number.isFinite(
                    prediction.averageSalary
                )
            ) {

                throw new Error(
                    "Salary prediction contains invalid numeric values."
                );
            }


            // =================================================
            // CHECK SALARY RANGE
            // =================================================

            if (
                prediction.minimumSalary >=
                    prediction.maximumSalary ||

                prediction.averageSalary <=
                    prediction.minimumSalary ||

                prediction.averageSalary >=
                    prediction.maximumSalary
            ) {

                throw new Error(
                    "Salary prediction contains an invalid salary range."
                );
            }


            // =================================================
            // MONTHLY ESTIMATE
            // =================================================

            prediction.monthlyEstimate =
                Number(
                    prediction.monthlyEstimate
                );

            if (
                !Number.isFinite(
                    prediction.monthlyEstimate
                )
            ) {

                prediction.monthlyEstimate =
                    Math.round(
                        prediction.averageSalary /
                        12
                    );
            }


            // =================================================
            // SALARY RANGE FALLBACK
            // =================================================

            if (
                !prediction.salaryRange
            ) {

                prediction.salaryRange =
                    `₹${prediction.minimumSalary} - ₹${prediction.maximumSalary} per year`;
            }


            // =================================================
            // FACTORS FALLBACK
            // =================================================

            if (
                !Array.isArray(
                    prediction.factors
                )
            ) {

                prediction.factors = [];
            }


            // =================================================
            // RECOMMENDATIONS FALLBACK
            // =================================================

            if (
                !Array.isArray(
                    prediction.recommendations
                )
            ) {

                prediction.recommendations = [];
            }


            console.log(
                "Salary prediction generated successfully."
            );

            return prediction;

        } catch (error) {

            console.error(
                "Gemini salary prediction error:",
                error
            );

            throw error;
        }
    };


// =====================================================
// EXPORTS
// =====================================================

// Compatibility alias used by resumeController.js

const generateResumeAnalysis =
    analyzeResume;


module.exports = {

    // Resume
    analyzeResume,
    generateResumeAnalysis,

    // ATS
    checkATS,

    // Interview
    generateInterviewQuestion,
    evaluateInterviewAnswer,
    clearInterviewQuestionHistory,

    // Career Roadmap
    generateCareerRoadmap,

    // Skill Gap
    generateSkillGap,

    // Salary Predictor
    generateSalaryPrediction
};