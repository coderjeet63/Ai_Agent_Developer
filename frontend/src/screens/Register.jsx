import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from '../config/axios';
import { UserContext } from '../context/user.context';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const disabled = !name || !email || !password;

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/users/register', { name, email, password });
      const { user, token } = res.data;

      setUser(user);
      localStorage.setItem('token', token);
      navigate('/');
    } catch (err) {
      console.error('Registration error:', err);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-4">
      <motion.form
        onSubmit={submitHandler}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center mb-6 text-gray-900"
        >
          Create an Account 🚀
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

        {/* Name Input */}
        <motion.input
          whileFocus={{ scale: 1.02, borderColor: "#3b82f6" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          type="text"
          placeholder="👤 Enter your name"
        />

        {/* Email Input */}
        <motion.input
          whileFocus={{ scale: 1.02, borderColor: "#3b82f6" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          type="email"
          placeholder="✉️ Enter your email"
        />

        {/* Password Input */}
        <motion.input
          whileFocus={{ scale: 1.02, borderColor: "#3b82f6" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          type="password"
          placeholder="🔑 Enter your password"
        />

        {/* Register Button */}
        <motion.button
          whileHover={{ scale: disabled ? 1 : 1.05 }}
          whileTap={{ scale: disabled ? 1 : 0.95 }}
          type="submit"
          disabled={disabled}
          className={`w-full py-2 rounded-lg font-semibold shadow-md transition text-white ${
            disabled
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          Register
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-center text-sm text-gray-700"
        >
          Already have an account?
          <Link to="/login" className="text-blue-600 font-medium hover:underline ml-1">
            Login
          </Link>
        </motion.p>
      </motion.form>
    </div>
  );
}

export default Register;
