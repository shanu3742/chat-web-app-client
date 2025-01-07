// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import React, { createContext, useContext } from "react";
const fbProvider = new GoogleAuthProvider();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_KEY,
  authDomain:process.env.REACT_APP_FB_DOMAIN,
  projectId:process.env.REACT_APP_FB_PROJECT_ID,
  storageBucket:process.env.REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId:process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
  appId:process.env.REACT_APP_FB_APP_ID,
  measurementId:process.env.REACT_APP_FB_MEASUREMENT_ID
};

// Initialize Firebase
const onFireBaseInit = () => {
    const firebaseAppInstance = initializeApp(firebaseConfig);
    const analytics = getAnalytics(firebaseAppInstance);
    const auth = getAuth(firebaseAppInstance);
    return  {firebaseAppInstance,analytics,auth}
}
let {firebaseAppInstance,analytics,auth} = onFireBaseInit();
const FirebaseContext = createContext();
const FireBaseProvider= ({children}) => {
 
 
  return (
    <FirebaseContext.Provider value={{firebaseAppInstance,analytics,auth,fbProvider}}>
      {children}
    </FirebaseContext.Provider>
  )


}
export const useFirebaseContext = () => {
    return useContext(FirebaseContext);
};


export default FireBaseProvider

