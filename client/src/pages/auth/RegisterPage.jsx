import Form from "../../components/Form";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";


const RegisterPage = () => {
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
    },
    {
      name: "avatar",
      label: "avatar", // label pour l'accessibilité 
      type: "file",
    },
  ];

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("email", data.email)
    formData.append("password", data.password)
    if(data.avatar[0])formData.append("avatar", data.avatar[0])

  try { 
    
    await api.post('/auth/register',formData)
  
    navigate("/login")

  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message)
    
  }
  }

  return (
    <>
    <h1>Inscription</h1>
    <Form inputs={fields} btnBg="btn shadow-1 rounded-1 green" onSubmit={onSubmit} submitLabel={`s'inscrire`}/>
    </>
  )
}

export default RegisterPage