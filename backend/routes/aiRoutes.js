const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/recommend", async (req, res) => {

    try {

        const employee = req.body;

        const prompt = `
        Analyze this employee and provide:

        1. Promotion Recommendation
        2. Training Suggestions
        3. Improvement Feedback
        4. Employee Ranking

        Employee Details:
        Name: ${employee.name}
        Department: ${employee.department}
        Skills: ${employee.skills}
        Performance Score: ${employee.performanceScore}
        Experience: ${employee.experience}
        `;

        const response = await axios.post(

            "https://openrouter.ai/api/v1/chat/completions",

            {
                model: "openai/gpt-3.5-turbo",

                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            },

            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        res.json({
            recommendation:
                response.data.choices[0].message.content
        });

    } catch (error) {

        console.log(error.response?.data || error.message);

        res.status(500).json({
            message: "AI API Error"
        });
    }
});

module.exports = router;