import { useState as useReactState, type FormEvent } from "react";
import { ClipboardList } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { findUserByEmail, saveUser } from "../lib/users";

export default function Signup() {
  const [email, setEmail] = useReactState("");
  const [password, setPassword] = useReactState("");
  const [confirm, setConfirm] = useReactState("");
  const [message, setMessage] = useReactState("");
  const [messageType, setMessageType] = useReactState<"success" | "error" | "warn" | "">("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");
    if (!email || !password) {
      setMessage("Please fill all fields.");
      setMessageType("error");
      return;
    }
    if (password !== confirm) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }
    // Check if user exists
    const existing = findUserByEmail(email);
    if (existing) {
      setMessage("Account already exists with this email!!");
      setMessageType("warn");
      return;
    }
    
    // Save user and redirect
    saveUser({ email, password });
    setMessage("Account created successfully. Redirecting to sign in...");
    setMessageType("success");
    setEmail("");
    setPassword("");
    setConfirm("");
    // Redirect to sign in after a short delay so user sees message
    setTimeout(() => navigate("/", { replace: true }), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl transition-all">
        <div className="text-center mb-6">
          <ClipboardList size={42} className="mx-auto text-violet-600 neon-purple" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-4">Create Account</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Fill the form to create an account.</p>
        </div>

        <form onSubmit={handleSubmit}>
          {message && (
            <div className={`p-3 mb-4 text-sm rounded-lg ${
              messageType === 'warn'
                ? 'text-yellow-800 bg-yellow-50 dark:bg-yellow-900 dark:text-yellow-200'
                : messageType === 'error'
                ? 'text-red-800 bg-red-50 dark:bg-red-700 dark:text-red-400'
                : 'text-green-800 bg-green-50 dark:bg-green-900 dark:text-green-200'
            }`}>
              {message}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-700 dark:text-gray-100"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Create a password"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Repeat your password"
              required
            />
          </div>

          <div>
            <button type="submit" className="w-full py-3 text-white bg-violet-600 rounded-lg shadow-lg hover:bg-violet-700 transition duration-150 flex items-center justify-center">
              Create account
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account? <Link to="/" className="text-violet-600 font-semibold hover:underline ml-1">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
