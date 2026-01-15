import React, { useContext } from 'react'
import './Main.css'
import { assets } from "../../assets/assets.js";
import { Context } from '../../context/Context.jsx'; // Import Context

const Main = () => {

    // Destructure the values from Context
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

    return (
        <div className="main">
            <div className="nav">
                <p>Alex AI</p>
                <img src={assets.user_icon} alt="user icon" />
            </div>
            <div className="main-container">

                {!showResult
                    ? <>
                        <div className="greet">
                            <p><span>Hello!</span></p>
                            <p>I'm Alex AI. Ask me anything about Alex.</p>
                        </div>
                        <div className="cards">
                            <div className="card" onClick={() => onSent("Tell me about Alex's full-stack development projects like Fortify.")}>
                                <p>Tell me about Alex's full-stack development projects.</p>
                                <img src={assets.code_icon} alt="code icon" />
                            </div>

                            <div className="card" onClick={() => onSent("What is Alex's experience with low-level systems programming in C?")}>
                                <p>What is Alex's experience with systems programming?</p>
                                <img src={assets.bulb_icon} alt="bulb icon" />
                            </div>

                            <div className="card" onClick={() => onSent("Summarize Alex's professional experience.")}>
                                <p>Summarize Alex's professional experience.</p>
                                <img src={assets.compass_icon} alt="compass icon" />
                            </div>

                            <div className="card" onClick={() => onSent("How can I contact Alex for an interview?")}>
                                <p>How can I contact Alex for an interview?</p>
                                <img src={assets.message_icon} alt="message icon" />
                            </div>
                        </div>
                    </>
                    : <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading
                                ? <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }
                        </div>
                    </div>
                }

                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && input) {
                                    onSent();
                                }
                            }}
                            value={input}
                            type="text"
                            placeholder="Enter a prompt here"
                        />
                        <div>
                            <img src={assets.gallery_icon} alt="gallery icon" />
                            <img src={assets.mic_icon} alt="mic icon" />
                            {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="send icon" /> : null}
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main;