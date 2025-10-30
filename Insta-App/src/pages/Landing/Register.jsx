import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const navigate = useNavigate();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});

	const validateName = (name) => {
		const regex = /^[a-zA-Z]{2,20}$/;
		return regex.test(name);
	};

	const validateEmail = (mail) => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(mail);
	};

	const validatePassword = (pass) => {
		const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		return regex.test(pass);
	};

	const submitSignup = (e) => {
		e.preventDefault();

		let tempErrors = {};

		if (!validateName(firstName)) {
			tempErrors.firstName = "First name must be 2-20 letters only.";
		}

		if (!validateName(lastName)) {
			tempErrors.lastName = "Last name must be 2-20 letters only.";
		}

		if (!validateEmail(email)) {
			tempErrors.email = "Invalid email format.";
		}

		if (!validatePassword(password)) {
			tempErrors.password =
				"Password must be 8+ chars, include uppercase, number, and special char.";
		}

		if (password !== confirmPassword) {
			tempErrors.confirmPassword = "Passwords do not match.";
		}

		setErrors(tempErrors);

		if (Object.keys(tempErrors).length === 0) {
			navigate("/home");
		}
	};

	const getInputClass = (value, error) => {
		if (value === "") {
			return "input";
		}
		if (error) {
			return "input-error";
		}
		return "input-valid";
	};

	return (
		<div className="register-bg">
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
					{errors.confirmPassword && (
						<p className="error-text">{errors.confirmPassword}</p>
					)}

					<button className="signup-button">Sign Up</button>

					<p style={{ textAlign: "center", marginTop: "10px" }}>
						Already have an account?{" "}
						<span
							style={{ color: "#007bff", cursor: "pointer" }}
							onClick={() => navigate("/login")}
						>
							Login
						</span>
					</p>

					<p
						style={{
							textAlign: "center",
							color: "#007bff",
							cursor: "pointer",
							marginTop: "5px",
						}}
						onClick={() => navigate("/forgot-password")}
					>
						Forgot Password?
					</p>
				</form>
			</div>
		</div>
	);
};

export default Register;
