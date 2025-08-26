// Login.jsx
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios"; // ✅ using your configured axios
import { UserContext } from "../context/user.context";
import "../customcss/Login.css"; // ✅ your ready CSS

function Login() {
  const [active, setActive] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  // 🔹 Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/login", { email, password });
      const { user, token } = res.data;

      setUser(user);
      localStorage.setItem("token", token);

      // ✅ role check if you want, else default home
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials or server error.");
    }
  };

  // 🔹 Signup handler
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/register", {
        name,
        email,
        password,
      });
      const { user, token } = res.data;

      setUser(user);
      localStorage.setItem("token", token);

      navigate("/"); // ✅ direct login after register
    } catch (err) {
      console.error("Registration error:", err);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <section className="user">
      <div className="user_options-container">
        {/* Left / Right Info Panels */}
        <div className="user_options-text">
          <div className="user_options-unregistered">
            <h2 className="user_unregistered-title">Don't have an account?</h2>
            <p className="user_unregistered-text">
              Sign up to explore our collections and enjoy shopping!
            </p>
            <button
              className="user_unregistered-signup"
              onClick={() => setActive("signup")}
            >
              Sign up
            </button>
          </div>

          <div className="user_options-registered">
            <h2 className="user_registered-title">Have an account?</h2>
            <p className="user_registered-text">
              Log in to continue your shopping experience.
            </p>
            <button
              className="user_registered-login"
              onClick={() => setActive("login")}
            >
              Login
            </button>
          </div>
        </div>

        {/* Forms */}
        <div
          className={`user_options-forms ${
            active === "signup" ? "bounceLeft" : "bounceRight"
          }`}
        >
          {/* Login Form */}
          <div
            className={`user_forms-login ${
              active === "login" ? "showForm" : ""
            }`}
          >
            <h2 className="forms_title">Login</h2>
            {error && active === "login" && (
              <p className="text-red-500 text-sm text-center mb-2">{error}</p>
            )}
            <form className="forms_form" onSubmit={handleLogin}>
              <fieldset className="forms_fieldset">
                <div className="forms_field">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                    className="forms_field-input"
                    required
                  />
                </div>
                <div className="forms_field">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className="forms_field-input"
                    required
                  />
                </div>
              </fieldset>
              <div className="forms_buttons">
                <button type="button" className="forms_buttons-forgot">
                  Forgot password?
                </button>
                <input
                  type="submit"
                  value="Log In"
                  className="forms_buttons-action"
                />
              </div>
            </form>
          </div>

          {/* Signup Form */}
          <div
            className={`user_forms-signup ${
              active === "signup" ? "showForm" : ""
            }`}
          >
            <h2 className="forms_title">Sign Up</h2>
            {error && active === "signup" && (
              <p className="text-red-500 text-sm text-center mb-2">{error}</p>
            )}
            <form className="forms_form" onSubmit={handleSignup}>
              <fieldset className="forms_fieldset">
                <div className="forms_field">
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Full Name"
                    className="forms_field-input"
                    required
                  />
                </div>
                <div className="forms_field">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                    className="forms_field-input"
                    required
                  />
                </div>
                <div className="forms_field">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className="forms_field-input"
                    required
                  />
                </div>
              </fieldset>
              <div className="forms_buttons">
                <input
                  type="submit"
                  value="Sign up"
                  className="forms_buttons-action"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
