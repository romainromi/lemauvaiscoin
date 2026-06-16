import api from "../../api/axios";
import Form from "../../components/Form";
import { useAuth } from "../../hooks/UseAuth";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const {setUser} = useAuth();
  const navigate = useNavigate()

  const fields = [

    {
      name: "email",
      label: "email", // label pour l'accessibilité 
      type: "email",
      validation: { required: 'obligatoire' }
    },
    {
      name: "password",
      label: "password", // label pour l'accessibilité 
      type: "password",
      validation: { required: 'obligatoire' }
    }
  ];

  const onSubmit = async(data) => {
    try {
      const res= await api.post('/auth/login', data)
      localStorage.setItem('token', res.data.token);
      setUser(jwtDecode(res.data.token))
      navigate('/dashboard')
      alert('vous etes bien connecté')
    } catch (error) {
      alert(error)
    }
  };


  return (
    <>
        <h1>Connexion</h1>
    <Form inputs={fields} onSubmit={onSubmit} submitLabel={`se connecter`}/>
    
    </>
  )
}

export default LoginPage