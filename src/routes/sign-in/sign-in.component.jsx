import React from "react";
import { signInWithGooglePopup , createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const googleSignIn = async () => {
    const {user} = await signInWithGooglePopup();
    const userDocRef = createUserDocumentFromAuth(user);
  };
  return (
    <>
      <div>SignIn</div>
      <button onClick={googleSignIn}>Sign In with Google Popup</button>
    </>
  );
};

export default SignIn;
