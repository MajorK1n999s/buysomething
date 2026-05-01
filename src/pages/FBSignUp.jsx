import React, {userState} from "react";
import { useNavigate } from "react-router-dom";

import { auth, db } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

import "./FBSignUp.css";

function FBSignUp() {
  const [email, setEmail] = userState("");
  const [password, setPassword] = userState("");
  const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                email: user.email,
            });
            navigate("/login");
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up with Firebase</h2>
            <form onSubmit={handleSignUp} className="signup-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />  
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default FBSignUp;