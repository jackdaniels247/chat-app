import React,{createContext, useContext, useEffect,useState} from 'react'
import { database } from '../misc/firebase';
import { transformToArrwithId } from '../misc/helper';

const roomContext=createContext();

export const RoomProvider=({children})=>{

    const[rooms,setRooms]=useState(null);

    useEffect(()=>{
        const roomsRef=database.ref('rooms');

        roomsRef.on('value',(snap)=>{
           const data=transformToArrwithId(snap.val());
           setRooms(data);
        })

        return()=>{
            roomsRef.off();
        }
    })

    return <roomContext.Provider value={rooms}>
        {children}
    </roomContext.Provider>
}

export const useRooms=()=> useContext(roomContext);