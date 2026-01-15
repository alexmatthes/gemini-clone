import { createContext, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const Context = createContext();

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
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash"});

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