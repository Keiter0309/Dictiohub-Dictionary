import React, { useState } from "react";
import { BookOpen } from "lucide-react";

const AdminLoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (email === "" || password === "") {
      setError("Please fill in all fields");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
    } else {
      setError("");
      console.log("Email:", email);
      console.log("Password:", password);
      console.log("Remember Me:", rememberMe);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-lg rounded-md px-12 pt-6 pb-8 mb-4">
          <div className="flex justify-center mb-4">
            <BookOpen className="text-blue-500 w-12 h-12" />
          </div>
          <div className="text-2xl font-bold text-gray-800 text-center mb-4">
            Admin Login
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
              >
                {showPassword ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M13.875 18.825A10.05 10.05 0 0110 20C4.477 20 0 15.523 0 10S4.477 0 10 0c2.386 0 4.597.832 6.325 2.175M13.875 18.825A10.05 10.05 0 0010 20c5.523 0 10-4.477 10-10S15.523 0 10 0c-2.386 0-4.597.832-6.325 2.175M13.875 18.825L2.175 7.125M13.875 18.825L7.125 2.175" />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1.5 10.5a9.5 9.5 0 0117 0M1.5 10.5a9.5 9.5 0 0017 0M1.5 10.5L10 19m0-17l8.5 8.5" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="ml-2 text-gray-700">Remember Me</span>
            </label>
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-900 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline duration-200"
              type="button"
              onClick={handleLogin}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginForm;
