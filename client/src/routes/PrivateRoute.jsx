import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";


const PrivateRoute = () => {
  const {user, loading} = useAuth()

  if (loading) return <p>Chargement...</p> 
  return user ? <Outlet/> : <Navigate to ='/login'/>
}

export default PrivateRoute