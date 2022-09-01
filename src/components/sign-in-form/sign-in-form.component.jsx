import { useState } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import Button from "../button/button.component";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignIpForm = () => {
  const [formField, setFormField] = useState(defaultFormFields);
  const { email, password } = formField;

  const resetFormFields = () => {
    setFormField(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const handSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect Password!");
          break;
        case "auth/user-not-found":
          alert("User not found! 😢");
          break;
        default:
          alert(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormField({ ...formField, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with email and password</span>

      <form onSubmit={handSubmit}>
        <FormInput
          lable="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          lable="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type='button' buttonType="google" onClick={signInWithGoogle}>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIpForm;
