import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { database } from '../../../misc/firebase';
import { transformToArrwithId } from '../../../misc/helper';
import MessageItem from './MessageItem';

const Message = () => {

    const {chatId}=useParams();
 const [messages,setMessages]=useState(null);

 const isChatEmpty=messages && messages.length===0;
 const canShowChat= messages && messages.length>0;


    useEffect(()=>{
        const mesgRef=database.ref('/messages');
        
        mesgRef.orderByChild('roomId').equalTo(chatId).on('value' ,snap=>{
            const data=transformToArrwithId(snap.val());

            setMessages(data);
        } );

        return ()=>{
            mesgRef.off('value');
        };
    },[chatId]);
   

    

    return(
        <ul className='msg-list custom-scroll'>
        {isChatEmpty && <li>No Message Yet</li>}
        {canShowChat && messages.map(msg=> <MessageItem  key={msg.id} message={msg} />)}
        </ul>
    )
}


export default Message
