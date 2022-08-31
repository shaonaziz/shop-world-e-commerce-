import React from "react";
import { signInWithGooglePopup , createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";



const SignIn = () => {
  const googleSignIn = async () => {
    const {user} = await signInWithGooglePopup();
    const userDocRef = createUserDocumentFromAuth(user);
  };
  return (
    <>
      <div>SignIn</div>
      <button onClick={googleSignIn}>Sign In with Google Popup</button>
      <SignUpForm/>
    </>
  );
};

export default SignIn;
