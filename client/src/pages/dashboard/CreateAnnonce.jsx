import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import api from "../../api/axios"

const CreateAnnonce = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [categories, setCategories] = useState([])

  // Charger les catégories pour le menu déroulant
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories')
        setCategories(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchCategories()
  }, [])

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('price', data.price)
      formData.append('city', data.city)
      formData.append('category_id', data.category_id)
      if (data.image && data.image[0]) {
        formData.append('image', data.image[0])
      } 

      await api.post('/annonces', formData)
      alert("Annonce créée")
      navigate('/annonces')
    } catch (error) {
      alert("Une erreur est survenue")
      console.error(error)
    }
  }

  return (
    <>
      <h1>Création annonce</h1>
      <form className="form-material" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Titre</label>
          <input className="form-control" type="text"
            {...register("title", { required: "obligatoire" })} />
          {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}
        </div>

        <div>
          <label>Prix</label>
          <input className="form-control" type="number" step="0.01"
            {...register("price", { required: "obligatoire" })} />
          {errors.price && <p style={{ color: 'red' }}>{errors.price.message}</p>}
        </div>

        <div>
          <label>Ville</label>
          <input className="form-control" type="text"
            {...register("city", { required: "obligatoire" })} />
          {errors.city && <p style={{ color: 'red' }}>{errors.city.message}</p>}
        </div>

        <div>
          <label>Catégorie</label>
          <select className="form-control"
            {...register("category_id", { required: "obligatoire" })}>
            <option value="">selectionner une categorie</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          {errors.category_id && <p style={{ color: 'red' }}>{errors.category_id.message}</p>}
        </div>

        <div>
          <label>Image</label>
          <input className="form-control" type="file" accept="image/*"
            {...register("image")} />
        </div>

        <button type="submit">Créer l'annonce</button>
      </form>
    </>
  )
}

export default CreateAnnonce