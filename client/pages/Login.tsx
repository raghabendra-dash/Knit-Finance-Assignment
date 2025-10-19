import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ClipboardList, AlertTriangle } from "lucide-react";
import { AUTH_STORAGE_KEY, MOCK_AUTH_TOKEN, MOCK_USER } from "../lib/constants";
import { findUserByEmail } from "../lib/users";

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login = ({ onLoginSuccess }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const existing = findUserByEmail(email);
      if (existing && existing.password === password) {
        sessionStorage.setItem(AUTH_STORAGE_KEY, MOCK_AUTH_TOKEN);
        onLoginSuccess();
        return;
      }
      if (email === MOCK_USER.email && password === MOCK_USER.password) {
        sessionStorage.setItem(AUTH_STORAGE_KEY, MOCK_AUTH_TOKEN);
        onLoginSuccess();
        return;
      }
      setError("Invalid email or password. If you just signed up, ensure you used the same email/password.");
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl transition-all">
        <div className="text-center mb-8">
          <ClipboardList size={46} aria-hidden="true" className="mx-auto neon-purple" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-4">Task Manager</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            Enter your credentials to access your dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-400 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" /> {error}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">
              Email ID
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-white bg-violet-600 rounded-lg shadow-lg hover:bg-violet-700 transition duration-150 disabled:bg-violet-400 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Log In"
            )}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account? <Link to="/signup" className="text-violet-600 font-medium hover:underline ml-1">Sign up</Link>
          </p>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 flex items-center justify-center">
          Demo Credentials: <span className="font-mono font-semibold ml-2">test@example.com / test123</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
