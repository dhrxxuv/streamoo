/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { bg_Img } from "../utlis/backgeoundImg";
import Header from "./Header";
import checkValidation from "../utlis/checkValidation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utlis/firebase";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { adduser } from "./Redux/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [clickedOnSignup, setSignup] = useState(false);
  const [errors, setErrors] = useState({});
  const [firebaseError, setFirebaseError] = useState("");
  const formRef = useRef();
  const navigate = useNavigate();
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPass = useRef();
  const Mob = useRef();

  const resetForm = () => formRef.current?.reset();

  const handleValidation = async () => {
    setFirebaseError("");
    const userInput = {
      name: clickedOnSignup ? name.current.value : undefined,
      email: email.current.value,
      password: password.current.value,
      mobile: clickedOnSignup ? Mob.current.value : undefined,
    };
    const validationErrors = checkValidation(userInput);
    if (clickedOnSignup && password.current.value !== confirmPass.current.value) {
      validationErrors.confirmPass = "Passwords do not match";
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      if (clickedOnSignup) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email.current.value, password.current.value);
          await updateProfile(userCredential.user, { displayName: name.current.value });
          const { uid, email: userEmail, displayName } = auth.currentUser;
          dispatch(adduser({ uid, email: userEmail, displayName }));
          resetForm();
        } catch (error) {
          setFirebaseError(error.message);
        }
      } else {
        try {
          await signInWithEmailAndPassword(auth, email.current.value, password.current.value);
          resetForm();
        } catch (error) {
          setFirebaseError(error.message);
        }
      }
    }
  };

  const handleFormToggle = () => {
    setSignup((prev) => !prev);
    setErrors({});
    setFirebaseError("");
    resetForm();
  };

  return (
    <div className="relative h-screen w-screen bg-black">
      <Header />
      <div className="absolute inset-0">
        <img className="h-full w-full object-cover opacity-40" src={bg_Img} alt="Background" />
      </div>
      <form
        ref={formRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#000000] bg-opacity-80 text-white p-8 md:p-12 w-full max-w-md rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="font-bold text-3xl mb-8">{clickedOnSignup ? "Sign Up" : "Sign In"}</h1>
        {clickedOnSignup && (
          <>
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="block w-full p-4 mb-4 bg-[#333] text-white border-0 rounded focus:outline-none focus:ring-2 focus:ring-[#e50914]"
            />
            {errors.name && <p className="text-[#e87c03] text-sm mb-4">{errors.name}</p>}
          </>
        )}
        <input
          ref={email}
          type="email"
          placeholder="Email or Phone Number"
          className="block w-full p-4 mb-4 bg-[#333] text-white border-0 rounded focus:outline-none focus:ring-2 focus:ring-[#e50914]"
        />
        {errors.email && <p className="text-[#e87c03] text-sm mb-4">{errors.email}</p>}
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="block w-full p-4 mb-4 bg-[#333] text-white border-0 rounded focus:outline-none focus:ring-2 focus:ring-[#e50914]"
        />
        {errors.password && <p className="text-[#e87c03] text-sm mb-4">{errors.password}</p>}
        {clickedOnSignup && (
          <>
            <input
              ref={confirmPass}
              type="password"
              placeholder="Confirm Password"
              className="block w-full p-4 mb-4 bg-[#333] text-white border-0 rounded focus:outline-none focus:ring-2 focus:ring-[#e50914]"
            />
            {errors.confirmPass && <p className="text-[#e87c03] text-sm mb-4">{errors.confirmPass}</p>}
            <input
              ref={Mob}
              type="text"
              placeholder="Mobile Number"
              className="block w-full p-4 mb-4 bg-[#333] text-white border-0 rounded focus:outline-none focus:ring-2 focus:ring-[#e50914]"
            />
            {errors.mobile && <p className="text-[#e87c03] text-sm mb-4">{errors.mobile}</p>}
          </>
        )}
        {firebaseError && <p className="text-[#e87c03] text-sm mb-4">{firebaseError}</p>}
        <button
          className="w-full p-4 bg-[#e50914] text-white font-semibold rounded hover:bg-[#f6121d] transition duration-200"
          onClick={handleValidation}
        >
          {clickedOnSignup ? "Sign Up" : "Sign In"}
        </button>
        <p
          className="text-[#b3b3b3] text-sm mt-6 cursor-pointer hover:underline"
          onClick={handleFormToggle}
        >
          {clickedOnSignup ? "Already registered? Sign In now." : "New to Netflix? Sign Up now."}
        </p>
      </form>
    </div>
  );
};

export default Login;