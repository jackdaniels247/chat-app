import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Alert } from 'rsuite';
import { auth, database } from '../../../misc/firebase';
import { transformToArrwithId } from '../../../misc/helper';
import MessageItem from './MessageItem';

const Message = () => {

    const {chatId}=useParams();
 const [messages,setMessages]=useState();

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

    const handleAdmin=useCallback(async (uid)=>{
        let alertMsg;
        const adminsRef= database.ref(`/rooms/${chatId}/admins`);
        await adminsRef.transaction((admin)=>{
            if (admin) {
                if (admin[uid]) {
                  admin[uid]=null;
                  alertMsg='Removed as Admin'
                } else {
                 admin[uid]=true;
                 alertMsg='Admin Permission Granted'
                }
                Alert.info(alertMsg,4000);
              }
              
              return admin;
        })
        
    },[chatId])

    const handleLike=useCallback(async (msgId)=>{
        let alertMsg;
        const {uid}=auth.currentUser;
        const msgRef= database.ref(`/messages/${msgId}`);
        await msgRef.transaction(msg=>{
            if (msg) {
                if (msg.likes&& msg.likes[uid]) {
                  msg.likeCount-=1;
                  msg.likes[uid]=null;
                  alertMsg='Like Removed'
                } else {


                    msg.likeCount+=1;
                    if(!msg.likes){
                        msg.likes={}
                    }
                 msg.likes[uid]=true;
                 alertMsg='Like added'
                }
                Alert.info(alertMsg,4000);
              }
              
              return msg;
    })
},[])
   

    

    return(
        <ul className='msg-list custom-scroll'>
        {isChatEmpty && <li>No Message Yet</li>}
        {canShowChat && messages.map(msg=> <MessageItem  key={msg.id} message={msg} handleAdmin={handleAdmin} handleLike={handleLike} />)}
        </ul>
    )
    }



export default Message
