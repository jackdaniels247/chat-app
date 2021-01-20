import React from 'react'
import { useParams } from 'react-router';
import { Loader } from 'rsuite';
import ChatTop from '../../components/chat-window/top';
import Messages from '../../components/chat-window/message';
import ChatBottom from '../../components/chat-window/bottom';
import {useRooms} from '../../context/RoomsContext';
import { CurrentRoomProvider } from '../../context/CurrentRoom.context';



const Chat = () => {
    const{chatId} =useParams();

    const rooms= useRooms();
    if(!rooms){

       return <Loader center vertical size='md' content='Loading' speed='slow'/>
    }

    const currentRoom= rooms.find(room=>room.id===chatId);

    if(!currentRoom){
        return <h6 className='text-center mt-page'>Chat {chatId} not found</h6>
    }
    const {name,description} =currentRoom;
   const currentRoomData={
   name,
   description,
   };

    return(
        <CurrentRoomProvider data={currentRoomData}>
            <div className='chat-top'>
                <ChatTop/>
            </div>
            <div className='chat-middle'>
                <Messages/>
            </div>
            <div className='chat-bottom'>
                <ChatBottom/>
            </div>
        </CurrentRoomProvider>
    )
}

export default Chat
