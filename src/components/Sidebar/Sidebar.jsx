import React, { useContext, useState } from 'react'
import './sidebar.css'
import { assets } from "../../assets/assets.js"
import { Context } from '../../context/Context.jsx'

const Sidebar = () => {

    const [extended, setExtended] = useState(false);
    // Grab the data from our Context
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    }

    return (
        <div className="sidebar">
            <div className="top">
                <img onClick={() => setExtended(prev => !prev)} className='menu' src={assets.menu_icon} alt="menu icon" />

                {/* Click triggers newChat to reset the main view */}
                <div onClick={()=>newChat()} className="new-chat">
                    <img src={assets.plus_icon} alt="new chat" />
                    {extended ? <p>New chat</p> : null}
                </div>

                {extended
                    ? <div className="recent">
                        <p className="recent-title">Recent</p>
                        {/* Map over history to create list items */}
                        {prevPrompts.map((item, index) => {
                            return (
                                <div key={index} onClick={()=>loadPrompt(item)} className="recent-entry">
                                    <img src={assets.message_icon} alt="message icon" />
                                    <p>{item.slice(0, 18)} ...</p>
                                </div>
                            )
                        })}
                    </div>
                    : null
                }
            </div>

            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="help icon" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="activity icon" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="settings icon" />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar;