import { useState } from 'react'
import {ChatBotInput} from './components/ChatBotInput';
import  ChatMessages  from './components/ChatMessages';
import './App.css'


function App() {
    const [chatBotMessages,setChatBotMessages]=useState([{message:"hello chatbot",sender:"user",id:"id1"},
        {message:"hello! how can i help you today?",sender:"robot",id:"id2"},
        {message:"can you get me todays date?",sender:"user",id:"id3"},
        {message:"Today is september 16",sender:"robot",id:"id4"}]);
       
       return <div className="app-container"> <ChatMessages chatBotMessages={chatBotMessages}
       setChatBotMessages={setChatBotMessages}
       />
       <ChatBotInput chatBotMessages={chatBotMessages} setChatBotMessages={setChatBotMessages} /></div>;
       
        /*return <>
        <ChatBotInput/>

        <ChatBotMessage message="hello chatbot" sender="user"/>
        <ChatBotMessage message="hello! how can i help you today?" sender="robot"/>
        <ChatBotMessage message="can you get me todays date?" sender="user"/>
        <ChatBotMessage message="Today is september 16" sender="robot"/>
        </>;
        */
}

export default App
