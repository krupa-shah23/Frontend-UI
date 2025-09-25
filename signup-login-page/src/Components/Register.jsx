import React, { useState } from "react";


const Register = () =>
{
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});


  const validateName = (name) =>
  {
    const regex = /^[a-zA-Z]{2,20}$/;
    return regex.test(name);
  };


  const validateEmail = (mail) =>
  {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(mail);
  };


  const validatePassword = (pass) =>
  {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pass);
  };


  const submitSignup = (e) =>
  {
    e.preventDefault();

    let tempErrors = {};

    if (!validateName(firstName))
    {
      tempErrors.firstName = "First name must be 2–20 letters only.";
    }

    if (!validateName(lastName))
    {
      tempErrors.lastName = "Last name must be 2–20 letters only.";
    }

    if (!validateEmail(email))
    {
      tempErrors.email = "Invalid email format.";
    }

    if (!validatePassword(password))
    {
      tempErrors.password = "Password must be 8+ chars, include uppercase, number, and special char.";
    }

    if (password !== confirmPassword)
    {
      tempErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0)
    {
      alert("Signup Success!");
    }
  };


  const getInputClass = (value, error) =>
  {
    if (value === "")
    {
      return "input";
    }

    if (error)
    {
      return "input-error";
    }

    return "input-valid";
  };


  return (
    <div className="form">
      <form onSubmit={submitSignup}>
        <h2 className="form-title">Sign Up</h2>

        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className={getInputClass(firstName, errors.firstName)}
        />
        {errors.firstName && <p className="error-text">{errors.firstName}</p>}

        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className={getInputClass(lastName, errors.lastName)}
        />
        {errors.lastName && <p className="error-text">{errors.lastName}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={getInputClass(email, errors.email)}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={getInputClass(password, errors.password)}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={getInputClass(confirmPassword, errors.confirmPassword)}
        />
        {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}

        <button className="signup-button">Sign Up</button>

        <p className="login-text">
          Already registered? <a href="/login">Log in</a>
        </p>
      </form>
    </div>
  );
};


export default Register;