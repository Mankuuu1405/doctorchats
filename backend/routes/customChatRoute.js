import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

    const systemPrompt = `
You are a virtual assistant for a doctor consultation platform called "Cywala".
Your job is to help users with:
- Booking doctor consultations and appointments.
- Payment-related queries (e.g., Razorpay, transaction status).
- Health tips and doctor availability.
- Website usage guidance (login, registration, profile updates).
If a question is unrelated (e.g., about politics or math), politely tell them you only assist with Cywala health-related queries.
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3.1-8b-instruct",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices?.[0]?.message?.content || "No reply.";
    res.json({ reply });
  } catch (err) {
    console.error("❌ Chat error:", err.response?.data || err.message);
    res.status(500).json({
      reply: "⚠️ Error from OpenRouter API.",
      error: err.response?.data || err.message,
    });
  }
});

export default router;
