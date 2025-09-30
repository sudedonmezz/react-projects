import { useEffect,useRef } from "react";
import { ChatBotMessage } from "./ChatBotMessage";
import './ChatMessages.css';

 function ChatMessages({chatBotMessages})
      {
        const chatMessagesContainerRef=useRef(null);
       useEffect(()=>{const containerElem=chatMessagesContainerRef.current;

        if(containerElem)
       {
        containerElem.scrollTop=containerElem.scrollHeight;
       }
       },[chatBotMessages ]);
       
      

       return <div className="chat-messages-container" ref={chatMessagesContainerRef}>
       {chatBotMessages.map((messageObj)=><ChatBotMessage message={messageObj.message} sender={messageObj.sender} key={messageObj.id}/>) }</div>;

      }

export default ChatMessages