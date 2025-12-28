// // import { useNavigate } from "react-router-dom";
// // import { useState } from "react";

// // function Signin() 
// // {
// //   const navigate = useNavigate();
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

// //   const handleLogin = (e) =>{
// //     e.preventDefault();


// //   return (
// //     <form onSubmit={handleLogin}>
// //       <input value={email} onChange={(e) => setEmail(e.target.value)} />
// //       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
// //       <button type="submit">Login</button>
// //     </form>
// //   );
// // }
// // }
// // export default Signin;


// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import "./Signin.css";

// function Signin() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();
//     console.log("Login clicked", email, password);
//   };

//   return (
//     <div className="login-bg">
//       <form className="form" onSubmit={handleLogin}>
//         <h2 className="loginlabel">Login</h2>

//         <input
//           className="input"
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           className="input"
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button className="loginbutton" type="submit">
//           Login
//         </button>

//         <p style={{ marginTop: "10px" }}>
//           Don’t have an account?{" "}
//           <span
//             style={{ color: "#6f19ff", cursor: "pointer" }}
//             onClick={() => navigate("/signup")}
//           >
//             Sign up
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Signin;


import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Signin.css";
import { loginUser } from "../../api/auth";
import Cookies from "js-cookie";


function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) 
  {
    alert("Please enter email and password");
    return;
  }

  try 
  {
    const res = await loginUser({
        email: email,
        password: password,
      });

      // Save token in cookies
      Cookies.set("token", res.data.token, { expires: 1 });

      console.log("LOGIN RESPONSE:", res.data);

      // Redirect to home page
      navigate("/home");
    } 
    catch (error) 
    {
      console.error(error);
      alert("Invalid email or password");
    }
};


  return (
    <div className="login-bg">
      <form className="form" onSubmit={handleLogin}>
        <h2 className="loginlabel">Login</h2>

        <input
          className="input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="loginbutton" type="submit">
          Login
        </button>

        <p style={{ marginTop: "10px" , color: "white"}}>
          Don't have an account?{" "}
          <span
            style={{ color: "#6f19ff", cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signin;
