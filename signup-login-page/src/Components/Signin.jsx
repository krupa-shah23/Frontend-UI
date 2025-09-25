import React, { useState } from "react";


const Signin = () =>
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});


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


    const submitLogin = (e) =>
    {
        e.preventDefault();

        let tempErrors = {};

        if (!validateEmail(email))
        {
            tempErrors.email = "Please enter a valid email";
        }

        if (!validatePassword(password))
        {
            tempErrors.password = "Password must be 8+ chars, include uppercase, number, and special char.";
        }

        setErrors(tempErrors);

        if (Object.keys(tempErrors).length === 0)
        {
            alert("Login Success");
        }
    };


    const getInputClass = (value, error) =>
    {
        if (value === "")
            return "input";
        if (error)
            return "input-error";
        return "input-valid";
    };


    return (
        <div className="form">
            <form onSubmit={submitLogin}>
                <h2 className="loginlabel">Login</h2>

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

                <button className="loginbutton">Login</button>
            </form>
        </div>
    );
};


export default Signin;