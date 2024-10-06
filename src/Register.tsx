import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function Register() {
  const [formData, setFormData] = useState({
    teamName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setIsLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...dataToSave } = formData;

      await push(ref(database, "registrations"), dataToSave);

      setSuccess(true);
      setFormData({
        teamName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError("Failed to register. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-green-400 font-['Courier_Prime'] flex flex-col">
      <header className="bg-black bg-opacity-80 py-4">
        <div className="container mx-auto px-4">
          <Link
            to="/"
            className="text-green-500 hover:text-green-300 transition-colors inline-flex items-center"
          >
            <ChevronLeft className="mr-2" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-gray-900 p-8 rounded-lg border border-green-600 shadow-lg shadow-green-500/50 w-full max-w-md">
          <h1
            className="text-3xl font-bold mb-6 text-center glitch"
            data-text="Register for H4CK3R_CTF"
          >
            Register for H4CK3R_CTF
          </h1>
          {success ? (
            <div className="text-green-400 text-center mb-4">
              Registration successful!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="teamName"
                  className="block text-sm font-medium mb-1"
                >
                  Team Name
                </label>
                <input
                  type="text"
                  id="teamName"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium mb-1"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                />
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-green-600 text-black font-bold py-2 px-4 rounded hover:bg-green-500 transition-colors disabled:bg-green-800 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Registering..." : "Register"}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      <footer className="bg-black bg-opacity-80 py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          &copy; 2024 H4CK3R_CTF. The FOSS Club. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
