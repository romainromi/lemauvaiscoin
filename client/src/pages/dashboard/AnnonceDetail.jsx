import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/axios";


const AnnonceDetail = () => {
  const { id } = useParams();
  const [annonce, setAnnonce] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnonce = async () => {
      try {
        const { data } = await api.get(`/annonces/${id}`);
        setAnnonce(data);
      } catch (err) {
        if (err.response?.status === 404) {
          setError("Annonce introuvable");
        } else {
          setError("Erreur lors du chargement");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAnnonce();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!annonce) return null;

  return (
    <div>
      <Link to="/annonces">← Retour</Link>

      <h2>{annonce.title}</h2>

      {annonce.image && (
        <img
           src={`${import.meta.env.VITE_STATIC_URL}/${annonce.image}`}
          alt={annonce.title}
          style={{ maxWidth: "400px", display: "block" }}
        />
      )}

      <p>
        <strong>Prix :</strong> {annonce.price} €
      </p>

      <p>
        <strong>Ville :</strong> {annonce.city}
      </p>

      <p>
        <strong>Catégorie :</strong> {annonce.category_id}
      </p>

      <p>
        <strong>Publié le :</strong>{" "}
        {new Date(annonce.created_at).toLocaleDateString()}
      </p>
    </div>
  );
};

export default AnnonceDetail;
