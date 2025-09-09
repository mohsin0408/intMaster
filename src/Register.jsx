import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
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
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>

      {message && <p className="text-green-600 text-center mb-2">{message}</p>}
      {error && <p className="text-red-500 text-center mb-2">{error}</p>}

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label htmlFor="reg-email" className="block font-medium mb-1">
            Email:
          </label>
          <input
            type="email"
            id="reg-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="reg-password" className="block font-medium mb-1">
            Password:
          </label>
          <input
            type="password"
            id="reg-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-300">
          Register
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-blue-600 hover:underline cursor-pointer">
          Login here
        </span>
      </p>
    </div>
  );
}

export default Register;
