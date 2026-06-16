import api from "../../api/axios"
import Form from "../../components/Form"
import { useNavigate } from "react-router-dom"

const CreateCategory = () => {

    const navigate = useNavigate()



    const fields = [
        {
            name: "name",
            label: "name",
            type: "text",
            validation: { required: 'obligatoire' }

        }
    ]

    const onSubmit = async (data) => {
        try {

            await api.post('/categories', data)
            alert("categorie créée")
            navigate('/')

        } catch (error) {

            alert(`une erreur est survenue`)
            console.error(error);

        }
    }
    return (
        <>
            <h1>Creation categorie</h1>
            <Form inputs={fields} onSubmit={onSubmit} submitLabel={`creation categorie`} />
        </>
    )
}

export default CreateCategory