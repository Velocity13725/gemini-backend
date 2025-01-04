const express = require("express");
const { GenerativeAI } = require("google-generativeai");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Set up Gemini API with your API key
const genai = new GenerativeAI({ apiKey: "YOUR_API_KEY" });

app.post("/generate", async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await genai.generateContent({
            model: "gemini-1.5-flash",
            prompt: prompt,
        });

        res.json({ response: response.text });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate content" });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
