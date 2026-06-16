import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth"
import api from "../../api/axios";


const AnnonceDetail = () => {
  const { id } = useParams();
  const [annonce, setAnnonce] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

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

  const handleDelete = async () => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette annonce ?")) return;
    try {
      await api.delete(`/annonces/${id}`);
      alert("Annonce supprimée");
      navigate("/annonces");
    } catch (err) {
      alert("Erreur lors de la suppression");
      console.error(err);
    }
  };

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

      {user && user.id === annonce.user_id && (
        <button
          onClick={handleDelete}
          style={{
            marginTop: "15px",
            padding: "8px 16px",
            backgroundColor: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Supprimer l'annonce
        </button>
      )}

    </div>
  );
};

export default AnnonceDetail;
