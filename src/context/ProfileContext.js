

import React,{createContext,useState,useContext, useEffect} from 'react';
import firebase from 'firebase/app'
import { auth, database } from '../misc/firebase';


export const isOfflineForDatabase = {
    state: 'offline',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
    state: 'online',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};



const profileContext=createContext();

export const ProfileProvider=({children})=>{
    const [profile,setProfile] =useState(null);
    const [isLoading,setIsLoading]=useState(true);

    useEffect(()=>{

        let userRef;
        let userStatusDatabaseRef;
     
        const authUnSub=auth.onAuthStateChanged(authObj=>{
            if(authObj){
                userRef=database.ref(`/profiles/${authObj.uid}`);
                userStatusDatabaseRef = database.ref(`/status/${authObj.uid}`);
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

                database.ref('.info/connected').on('value', (snapshot) => {
                   
                    if (!!snapshot.val() === false) {
                        return;
                    };
                
                   
                    userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(()=> {
                       
                        userStatusDatabaseRef.set(isOnlineForDatabase);
                    });
                });
                
                
            }
            else{
                if(userRef){
                    userRef.off();
                }
                if(userStatusDatabaseRef){
                   userStatusDatabaseRef.off();
                }
                database.ref('.info/connected').off();
                setProfile(null);
                setIsLoading(false);
            }
        })

        return ()=>{
            authUnSub();
            database.ref('.info/connected').off();
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