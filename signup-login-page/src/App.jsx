import React, { useState } from 'react'
import Signin from './components/Signin'
import Register from './components/Register'
import './App.css'


function App()
{
  const [showLogin, setShowLogin] = useState(true)

  return (
    <div className="form-card">
      {
        showLogin ? <Signin /> : <Register />
      }
      <p className="msg">
        {
          showLogin ? "No account?" : "Already registered?"
        }

        <button
          onClick={() => setShowLogin(!showLogin)}
          className="switch">
          {
            showLogin ? "Sign up" : "Log in"
          }
        </button>
      </p>

    </div>
  )
}



export default App