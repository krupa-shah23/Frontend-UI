import { useState, useEffect } from "react";
import "./Auth.css";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser, registerUser } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";


export default function Auth() 
{
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { loginSuccess, isAuthenticated, loading } = useAuth();


  useEffect(() => 
  {
      if (!loading && isAuthenticated &&
          (location.pathname === "/login" || location.pathname === "/")
        ) 
      {
        navigate("/home", { replace: true });
      }
  }, [isAuthenticated, loading, location.pathname, navigate]);


  const initialForm = 
  {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    login: "",
    loginPassword: "",
  };

  const [form, setForm] = useState(initialForm);

  function handleChange(e) 
  {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleLogin(e) 
  {
    e.preventDefault();

    try 
    {
      const res = await loginUser({
        email: form.login.toLowerCase(),
        password: form.loginPassword,
      });

      loginSuccess(res.data.token, res.data.user);
    } 
    
    catch (err) 
    {
      alert(err.response?.data?.message || "Invalid email or password");
    }
  }

  async function handleRegister(e) 
  {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) 
    {
      alert("All fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) 
    {
      alert("Passwords do not match");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(form.password)) 
    {
      alert("Password must contain uppercase, lowercase and number");
      return;
    }

    try 
    {
      await registerUser({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        city: "Mumbai",
        gender: "female",
        dob: "2002-01-01",
        bio: "New user on Connect 🚀",
      });

      alert("Registration successful. Please login.");
      setForm(initialForm);
      setIsSignUp(false);
    } 
    
    catch (err) 
    {
      alert(err.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="auth-page">
      
      <div className={`auth-container ${isSignUp ? "right-panel-active" : ""}`}>

        <div className="form-container sign-up">
          
          <form onSubmit={handleRegister}>
            
            <h1>Create Account</h1>

            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
            <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />

            <div className="password-field">
              
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
              />
              
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </span>
            
            </div>

            <div className="password-field">
              
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              
              <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? "Hide" : "Show"}
              </span>
            
            </div>

            <button type="submit">Sign Up</button>
          
          </form>
        
        </div>

        <div className="form-container sign-in">
          
          <form onSubmit={handleLogin}>
            
            <h1>Sign In</h1>

            <input
              name="login"
              placeholder="Email"
              value={form.login}
              onChange={handleChange}
            />

            <div className="password-field">
              
              <input
                name="loginPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.loginPassword}
                onChange={handleChange}
              />
              
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </span>
            
            </div>

            <button type="submit">Sign In</button>
          
          </form>
        
        </div>

        <div className="overlay-container">
          
          <div className="overlay">
            
            <div className="overlay-panel overlay-left">
              
              <h1>Welcome Back!</h1>
              
              <p>Login to stay connected</p>
              
              <button className="ghost" type="button" onClick={() => setIsSignUp(false)}>
                Sign In
              </button>
            
            </div>

            <div className="overlay-panel overlay-right">
              
              <h1>Hello!</h1>
              
              <p>Enter your details and start your journey</p>
              
              <button className="ghost" type="button" onClick={() => setIsSignUp(true)}>
                Sign Up
              </button>
            
            </div>
          
          </div>
        
        </div>

      </div>
    
    </div>
  
  );
}
