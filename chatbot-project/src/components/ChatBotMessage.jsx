import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/user.png';
import './ChatBotMessage.css';

 export function ChatBotMessage({message,sender}) //components are designed to be reusable props is properties . props makes component reusable
      {
      // const message=props.message;
        //const sender=props.sender;
       // const {message,sender}=props; //destructuring assignment
       /* if(sender==="user")
        {
          return (
            <div>
            {message}
            <img src="user.png" width="50"/>
            </div>
          );
        }
        else{
          return (
            <div>
            
            <img src="robot.png" width="50"/>
            {message}
            </div>
          );
        }
*/
            return (
             <div className={sender==='user' ? 'chat-message-user' : 'chat-message-robot'}>
            {sender==="robot" && <img src={RobotProfileImage} className="chat-message-robot-img"/>}  
            <div className="chat-message-text">
              {message}
            </div>
            
            {sender==="user" && <img src={UserProfileImage} className="chat-message-user-img"/>}
            </div>
            );
       
      }

