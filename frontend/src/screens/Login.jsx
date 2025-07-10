import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axios'; // ✅ Make sure baseURL is correctly set
import { UserContext } from '../context/user.context';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/users/login', { email, password });

      const { user, token } = res.data;

      setUser(user);                            // Store in Context API
      localStorage.setItem('token', token);     // Store token for auth
      navigate('/');                            // Redirect to home/dashboard

    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid credentials or server error.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <form
        onSubmit={submitHandler}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={!email || !password}
          className={`w-full py-2 rounded-md transition-colors text-white ${
            !email || !password
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?
          <Link to="/register" className="text-blue-500 hover:underline ml-1">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;


