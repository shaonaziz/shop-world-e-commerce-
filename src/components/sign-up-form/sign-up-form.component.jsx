import { useState } from "react";
import {
  createUserAuthWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss'
import Button from "../button/button.component";


const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formField, setFormField] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formField;

  //   console.log(formField)

  const resetFormFields = () => {
    setFormField(defaultFormFields);
  };

  const handSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password is incorrect!");
      return;
    }

    try {
      const { user } = await createUserAuthWithEmailAndPassword(
        email,
        password
      );
      // console.log(response)
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("email already exists! ⚠");
      } else if (error.code === "auth/weak-password") {
        alert("Password should be at least 6 characters 😭");
      } else {
        console.log("user creation error!", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormField({ ...formField, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with email and password</span>

      <form onSubmit={handSubmit}>
        <FormInput
          lable="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
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

        <FormInput
          lable="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button buttonType='inverted' type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
