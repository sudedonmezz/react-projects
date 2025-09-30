 import { useState } from "react";
 import { Chatbot } from "supersimpledev";
 import './ChatBotInput.css';
 
export function ChatBotInput({chatBotMessages,setChatBotMessages}) //props  are used to pass data from one component to another
      {


        const [inputText,setInputText]= useState(event.target.value); //to save the input text
        function saveInputText(event)
        {
         
          setInputText(event.target.value); //gives us the input element that we re typing in
        }

        function sendMessage()
        {
        //  console.log("Sending message:",inputText);
          const newChatMessages= [...chatBotMessages,{message:inputText,sender:"user",id:crypto.randomUUID()}];
          setChatBotMessages(newChatMessages);
          

           //get the response from the chatbot
          const response=  Chatbot.getResponse(inputText);
            setChatBotMessages([...newChatMessages,{message:response,sender:"robot",id:crypto.randomUUID()}]);

         // console.log("Chatbot response:",response);
            setInputText(''); //to clear the input box after sending the message
       //we are copying the old messages and adding a new message to it
        }

        return <div className="chatbot-input-container">
        <input type="text" placeholder="Type your message..." size="50" onChange={saveInputText} value={inputText}></input>
        <button onClick={sendMessage} className="send-message-button">Send</button>

        </div>;
      }