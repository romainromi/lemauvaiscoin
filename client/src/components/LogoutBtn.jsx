import { useAuth } from "../hooks/UseAuth";

const LogoutBtn = () => {

  const {logout} = useAuth()


  return (

    <button style={{background:"green", color:"whitesmoke"}} onClick={logout}>Se deconnecter</button>
  )
}

export default LogoutBtn