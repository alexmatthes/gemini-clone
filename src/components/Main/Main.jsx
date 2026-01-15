import React from 'react'
import './Main.css'
import {assets} from "../../assets/assets.js";

const Main = () => {
    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="user icon" />
            </div>
            <div className="main-container">
                <div className="greet">
                    <p><span>Hello!</span></p>
                    <p>How can I help you today?</p>
                </div>

                <div className="cards">
                    <div className="card">
                        <p>Suggest beautiful places to see on an upcoming roadtrip.</p>
                        <img src={assets.compass_icon} alt="compass icon" />
                    </div>

                    <div className="card">
                        <p>Suggest ideas for my child's birthday party.</p>
                        <img src={assets.bulb_icon} alt="bulb icon" />
                    </div>

                    <div className="card">
                        <p>Summarize this team meeting transcript.</p>
                        <img src={assets.message_icon} alt="message icon" />
                    </div>

                    <div className="card">
                        <p>Improve the accessibility of this code.</p>
                        <img src={assets.code_icon} alt="code icon" />
                    </div>
                </div>

                <div className="main-bottom">
                    <div className="search-box">
                        <input type="text" placeholder="Enter a prompt here" />
                        <div>
                            <img src={assets.gallery_icon} alt="gallery icon" />
                            <img src={assets.mic_icon} alt="mic icon" />
                            <img src={assets.send_icon} alt="send icon" />
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
