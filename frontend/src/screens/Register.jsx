import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axios'; // ✅ Axios instance
import { UserContext } from '../context/user.context'; // ✅ Import context

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // ✅ Access context
  const disabled = !email || !password || !confirmPassword;

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post('/users/register', { email, password });

      const { user, token } = res.data;

      setUser(user); // ✅ Save to context
      localStorage.setItem('token', token); // ✅ Save token
      navigate('/'); // ✅ Redirect

    } catch (err) {
      console.error('Registration error:', err);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <form onSubmit={submitHandler} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Register</h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Write your email"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Write your password"
        />

        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Confirm your password"
        />

        <button
          type="submit"
          disabled={disabled}
          className={`w-full py-2 rounded-md transition-colors text-white ${
            disabled
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          Register
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?
          <Link to="/login" className="text-blue-500 hover:underline ml-1">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;

