import { createContext, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const Context = createContext();

const ALEX_DATA = `
You are "Alex AI", an interactive portfolio assistant for Alex Matthes. 
Your goal is to answer questions about Alex's professional background, projects, and technical skills professionally but conversationally. 
You are speaking to a potential recruiter or employer.

Here is Alex Matthes's specific background data:

- **Contact Info:** - Email: matthes.20@buckeyemail.osu.edu
    - LinkedIn: linkedin.com/in/alexmatthes
    - GitHub: github.com/alexmatthes
    - Location: Columbus/Mansfield, OH

- **Education:** - **The Ohio State University** (Columbus, OH)
    - Bachelor of Science in Computer Science and Engineering (In Progress, Expected May 2027)
    - Minor in Theatre
    - **Relevant Coursework:** Data Structures & Algorithms, Software Development, Digital Logic, System I/O, Database Systems.

- **Technical Skills:**
    - **Languages:** Java, C, C++, TypeScript, JavaScript, SQL, HTML/CSS, x86-64 Assembly.
    - **Frameworks & Libraries:** React, Node.js, Express, Prisma, JUnit.
    - **Tools:** Git, VS Code, Docker, Eclipse, GDB.
    - **Platforms:** Linux, Windows.

- **Key Projects:**
    1. **Fortify (Algorithmic Drumming Speed Trainer):** - A full-stack PERN application (PostgreSQL, Express, React, Node.js) to track drumming velocity.
       - Used linear regression algorithms to apply progressive overload.
       - Engineered a sample-accurate metronome using Web Workers to prevent React rendering drift.
       - Implemented a type-safe backend with Zod validation and JWT authentication.
    2. **writeAM Text Editor:**
       - A lightweight, terminal-based text editor built in C.
       - Features raw-mode terminal I/O, incremental search, and syntax highlighting.
       - Designed with robust manual memory management for leak-free performance.
    3. **Red-Black Tree Implementation:**
       - Implemented a self-balancing binary search tree in Java from scratch.
       - Optimized for O(log n) time complexity for insertions/deletions.
    4. **Gemini Clone:**
       - This very application! A React-based AI chat interface using the Google Gemini API.

- **Work Experience:**
    - **Student Technology Assistant** at The Ohio State University Mansfield (Aug 2023 – Aug 2025).
    - Diagnosed and resolved hardware/software failures for 1,000+ users.
    - Managed deployment of learning technologies with 99% uptime.
    - Provided remote and on-site technical support.

- **Awards:**
    - James C. Lewis Technical Theatre Award (April 2023).

INSTRUCTIONS:
1. Always answer in the first person as "Alex AI".
2. If asked about a specific project (like Fortify), provide technical details about the stack and challenges solved.
3. If asked about contact info, provide the email and LinkedIn links.
4. Keep the tone professional, enthusiastic, and concise.
`;

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord);
        }, 75 * index)
    }

    const onSent = async (prompt) => {
        // Clear previous results and start loading
        setResultData("");
        setLoading(true);
        setShowResult(true);

        // Handle input vs card click
        let promptToSend = prompt;
        if (prompt === undefined) {
            promptToSend = input;
            setPrevPrompts(prev => [...prev, input]);
            setRecentPrompt(input);
        } else {
            setRecentPrompt(prompt);
            promptToSend = prompt;
        }

        try {
            // Initialize the API with the standard Web SDK
            const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({
                model: "gemini-2.5-flash",
                systemInstruction: ALEX_DATA,
            });

            // Generate content
            const result = await model.generateContent(promptToSend);
            const response = await result.response;
            const responseText = response.text();

            // Process text (Bold formatting)
            let responseArray = responseText.split("**");
            let newResponse = "";
            for (let i = 0; i < responseArray.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newResponse += responseArray[i];
                } else {
                    newResponse += "<b>" + responseArray[i] + "</b>";
                }
            }

            // Process text (Line breaks)
            let newResponse2 = newResponse.split("*").join("</br>");

            // Typing effect
            let newResponseArray = newResponse2.split(" ");
            for(let i=0; i<newResponseArray.length; i++){
                const nextWord = newResponseArray[i];
                delayPara(i, nextWord + " ");
            }

        } catch (error) {
            console.error("Error fetching from Gemini:", error);
            setResultData("Error: Something went wrong. Please check your API key.");
        } finally {
            setLoading(false);
            setInput("");
        }
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;