
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const config={
    apiKey: "AIzaSyDQwu5xUvKVkupe8wwflYH2xBuKcUzAuO8",
    authDomain: "chat-web-app-4b958.firebaseapp.com",
    projectId: "chat-web-app-4b958",
    storageBucket: "chat-web-app-4b958.appspot.com",
    messagingSenderId: "820885800593",
    appId: "1:820885800593:web:9aeb9815a5728aa5a86130"
  };

const app=  firebase.initializeApp(config);
export const auth =app.auth();
export const database=app.database();
export const storage=app.storage();
