

import React,{createContext,useState,useContext, useEffect} from 'react';
import { auth, database } from '../misc/firebase';

const profileContext=createContext();

export const ProfileProvider=({children})=>{
    const [profile,setProfile] =useState(null);
    const [isLoading,setIsLoading]=useState(true);

    useEffect(()=>{

        let userRef;
        const authUnSub=auth.onAuthStateChanged(authObj=>{
            if(authObj){
                userRef=database.ref(`/profiles/${authObj.uid}`);
                userRef.on('value',snap=>{
                    const {avatar,name,createdAt}=snap.val();
                    const data={
                        avatar,
                        name,
                        createdAt,
                        uid:authObj.uid,
                        email:authObj.email
            
                    }
                    
                setProfile(data);
                setIsLoading(false); 
                    
                })
                
            }
            else{
                if(userRef){
                    userRef.off();
                }
                setProfile(null);
                setIsLoading(false);
            }
        })

        return ()=>{
            authUnSub();
            if(userRef){
                userRef.off();
            }
        }
    },[]);
    

    return <profileContext.Provider value={{profile,isLoading}}>
        {children}
    </profileContext.Provider>
}


export const useProfile=()=> useContext(profileContext);