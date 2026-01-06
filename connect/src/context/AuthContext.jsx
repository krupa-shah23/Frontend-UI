import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getMe } from "../api/auth";


const AuthContext = createContext();


export function AuthProvider({ children }) 
{
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => 
  {
    async function checkAuth() 
    {
      
      const token = Cookies.get("token");
      
      if (!token) 
      {
        setLoading(false);
        return;
      }


      try 
      {
        const res = await getMe();
        setUser(res.data);
      } 
      
      catch 
      {
        Cookies.remove("token");
        setUser(null);
      } 
      
      finally 
      {
        setLoading(false);
      }
    
    }

    checkAuth();
  }, []);

  
  function loginSuccess(token, userData) 
  {
    Cookies.set("token", token, { expires: 7 });
    setUser(userData);
  }

  
  function logout() 
  {
    Cookies.remove("token");
    setUser(null);
  }

  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        loginSuccess,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);