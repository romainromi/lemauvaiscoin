import { createContext, useState, useEffect} from "react";
import { jwtDecode } from "jwt-decode"



export const AuthContext = createContext()


export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const token = localStorage.getItem(`token`)

    if (token) {

      try {

        setUser(jwtDecode(token));

      } catch (error) {
        localStorage.removeItem(`token`)
        console.error(error);

      }
    }
    setLoading(false)
  }, [])

  const logout = () => {
    localStorage.removeItem(`token`)
    setUser(null)
   
  }


  return (
    <AuthContext.Provider value={{user, setUser, logout, loading}}>
      {children}
    </AuthContext.Provider>
  )
};



