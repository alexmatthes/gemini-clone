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
                <p>Gemini</p>
                <img src={assets.user_icon} alt="user icon" />
            </div>
            <div className="main-container">

                {!showResult
                    ? <>
                        <div className="greet">
                            <p><span>Hello!</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            {/* You can make these clickable too by adding onClick={() => onSent("Prompt text...")} */}
                            <div className="card" onClick={() => onSent("Suggest beautiful places to see on an upcoming roadtrip.")}>
                                <p>Suggest beautiful places to see on an upcoming roadtrip.</p>
                                <img src={assets.compass_icon} alt="compass icon" />
                            </div>
                            <div className="card" onClick={() => onSent("Suggest ideas for my child's birthday party.")}>
                                <p>Suggest ideas for my child's birthday party.</p>
                                <img src={assets.bulb_icon} alt="bulb icon" />
                            </div>
                            <div className="card" onClick={() => onSent("Summarize this team meeting transcript.")}>
                                <p>Summarize this team meeting transcript.</p>
                                <img src={assets.message_icon} alt="message icon" />
                            </div>
                            <div className="card" onClick={() => onSent("Improve the accessibility of this code.")}>
                                <p>Improve the accessibility of this code.</p>
                                <img src={assets.code_icon} alt="code icon" />
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
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder="Enter a prompt here" />
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