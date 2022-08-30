import { initializeApp } from "firebase/app";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAz6bq43PVVZeqlWDzTbOhSixx-H41ywcs",

  authDomain: "shop-world-db.firebaseapp.com",

  projectId: "shop-world-db",

  storageBucket: "shop-world-db.appspot.com",

  messagingSenderId: "484154285853",

  appId: "1:484154285853:web:4eacc0176c3200daa68bf4",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db,'user',userAuth.uid);
  console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists())


  //if the user doesn't exists the setDoc

  if(!userSnapshot.exists()){
    const {displayName,email} = userAuth;
    const createdAt = new Date();

    try{
        await setDoc(userDocRef,{
          displayName,email,createdAt
        })
    }catch(error){
       console.log('error creating the user',error.message);
    }
  }

  return userDocRef;
};
