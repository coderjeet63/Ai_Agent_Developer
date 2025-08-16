import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // ✅ Animation
import axios from '../config/axios';
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

      setUser(user);
      localStorage.setItem('token', token);
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid credentials or server error.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 p-4">
      <motion.form
        onSubmit={submitHandler}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-6 text-center text-gray-900"
        >
          Welcome Back 👋
        </motion.h2>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm mb-4 text-center"
          >
            {error}
          </motion.p>
        )}

        <motion.input
          whileFocus={{ scale: 1.02, borderColor: '#3b82f6' }}
          type="email"
          placeholder="✉️ Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <motion.input
          whileFocus={{ scale: 1.02, borderColor: '#3b82f6' }}
          type="password"
          placeholder="🔑 Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <motion.button
          whileHover={{ scale: !email || !password ? 1 : 1.05 }}
          whileTap={{ scale: !email || !password ? 1 : 0.95 }}
          type="submit"
          disabled={!email || !password}
          className={`w-full py-2 rounded-lg font-semibold shadow-md transition text-white ${
            !email || !password
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          Login
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-center text-sm text-gray-700"
        >
          Don’t have an account?
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline ml-1"
          >
            Sign up
          </Link>
        </motion.p>
      </motion.form>
    </div>
  );
}

export default Login;
