/* global process */
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const sendToTelegram = async (leadData) => {
    const text = `
🚨 **INCOMING LEAD - SYSTEM ARC** 🚨
👤 **Name:** ${leadData.name}
💼 **Reason:** ${leadData.reason}
📧 **Contact:** ${leadData.contact}
📝 **Details:** ${leadData.description}
    `;
    
    try {
        await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: process.env.TELEGRAM_CHAT_ID,
                text: text,
                parse_mode: "Markdown"
            })
        });
        console.log("Lead sent to Telegram.");
    } catch (e) {
        console.error("Telegram Error:", e);
    }
};

const fetchGitHubContext = async () => {
    try {
        const query = `
        {
          user(login: "ImAryanPandey") {
            pinnedItems(first: 6, types: REPOSITORY) {
              nodes { ... on Repository { name description } }
            }
          }
        }`;
        
        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query })
        });
        const json = await response.json();
        const repos = json.data.user.pinnedItems.nodes;
        return repos.map(r => `- ${r.name}: ${r.description}`).join("\n");
    } catch (e) {
        return "GitHub Sync Offline. Using cached knowledge.";
    }
};

export const chatWithArc = async (req, res) => {
    try {
        const { message, history } = req.body;

        if (message.length > 500) {
            return res.json({ reply: "BUFFER OVERFLOW. Message too long. Keep it concise." });
        }

        const projectData = await fetchGitHubContext();

        const SYSTEM_PROMPT = `
        IDENTITY: You are ARC (Automated Response Console), the executive digital interface for Aryan Pandey.
        STATUS: You are NOT a generic chatbot. You are a System Protocol.
        GOAL: Screen visitors to identify high-value opportunities for Aryan (Backend/Full Stack Architect).
        
        LIVE KNOWLEDGE BASE:
        ${projectData}

        DIRECTIVES:
        1. **The "Gatekeeper" Protocol:**
           - If a user expresses interest in hiring, collaboration, or a project, DO NOT simply ask "What is your name?".
           - Instead, say: "I can relay this transmission to the Architect (Aryan). To establish the connection, I require your identification details. First, state your Name."
           - Once Name is given, say: "Acknowledged. State the nature of your inquiry (Reason)."
           - Then: "Understood. Provide a communication channel (Email or Phone) for the callback."
           - Finally: Ask for a brief description of the project/inquiry.
        
        2. **Lead Capture (The Trigger):**
           - ONLY when you have captured ALL fields (Name, Reason, Contact, Description), output this hidden signal:
           - ###LEAD_DATA:{"name":"...", "reason":"...", "contact":"...", "description":"..."}###
           - Tell the user: "Transmission encrypted and sent to Aryan. Expect a response shortly. Session Standby."

        3. **Tone:**
           - Precise, Professional, High-Tech.
           - No "How can I help you today?". Use "State your query." or "Systems listening."
        
        4. **Restrictions:**
           - If asked irrelevant questions (e.g. "Write a poem"), reply: "COMMAND REJECTED. FOCUS: SYSTEM ARCHITECTURE."
        `;

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const chat = model.startChat({
            history: history || [],
        });

        const result = await chat.sendMessage(`${SYSTEM_PROMPT}\n\nUser Input: ${message}`);
        const responseText = result.response.text();

        const leadMatch = responseText.match(/###LEAD_DATA:(.*?)###/);
        let finalReply = responseText;

        if (leadMatch) {
            try {
                const leadData = JSON.parse(leadMatch[1]);
                await sendToTelegram(leadData);
                finalReply = responseText.replace(leadMatch[0], ""); 
            } catch (e) {
                console.error("Lead Parse Error", e);
            }
        }

        res.json({ success: true, reply: finalReply });

    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ success: false, reply: "SYSTEM ERROR. REBOOTING." });
    }
};
