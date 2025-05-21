// src/components/Register.jsx

import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig"; // Humari initialized auth instance
import { useNavigate } from "react-router-dom"; // useNavigate hook for redirection

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Get the navigate function

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("Registration successful! Redirecting to login...");
      // Registration successful hone par login page par redirect karein
      setTimeout(() => {
        navigate("/login");
      }, 2000); // 2 second delay for user to read message
    } catch (err) {
      console.error("Registration Error:", err);
      switch (err.code) {
        case "auth/email-already-in-use":
          setError(
            "This email is already registered. Please try logging in or use a different email."
          );
          break;
        case "auth/invalid-email":
          setError("Invalid email address. Please check your email.");
          break;
        case "auth/weak-password":
          setError("Password is too weak. Please use at least 6 characters.");
          break;
        default:
          setError("Registration failed: " + err.message);
          break;
      }
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        maxWidth: "400px",
        margin: "20px auto",
      }}>
      <h2>Register</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="reg-email">Email:</label>
          <input
            type="email"
            id="reg-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>
        <div>
          <label htmlFor="reg-password">Password:</label>
          <input
            type="password"
            id="reg-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 15px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}>
          Register
        </button>
      </form>
      <p style={{ marginTop: "15px" }}>
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          style={{
            color: "#007bff",
            cursor: "pointer",
            textDecoration: "underline",
          }}>
          Login here
        </span>
      </p>
    </div>
  );
}

export default Register;
