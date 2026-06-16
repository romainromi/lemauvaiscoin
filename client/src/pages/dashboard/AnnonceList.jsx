import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";
const AnnoncesList = () => {
  const [annonces, setAnnonces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        const { data } = await api.get("/annonces");
        setAnnonces(data);
        const categoriesRes = await api.get("/categories");
        setCategories(categoriesRes.data);
      } catch (err) {
        setError("Impossible de charger les annonces", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnonces();
  }, []);
  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  const filteredAnnonces = selectedCategory
    ? annonces.filter((a) => a.category_id === Number(selectedCategory))
    : annonces;

  return (
    <div>
      <h2>Annonces</h2>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "10px" }}>Filtrer par catégorie :</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Toutes</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {filteredAnnonces.length === 0 && <p>Aucune annonce disponible</p>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {filteredAnnonces.map((annonce) => (
          <div
            key={annonce.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {annonce.image && (
              <img
                src={`${import.meta.env.VITE_STATIC_URL}/${annonce.image}`}
                alt={annonce.title}
                style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
              />
            )}
            <h3>{annonce.title}</h3>
            <p>{annonce.price} €</p>
            <p>{annonce.city}</p>
            <Link
              to={`/annonces/${annonce.id}`}
              style={{
                marginTop: "auto",
                padding: "8px 16px",
                backgroundColor: "#2563eb",
                color: "white",
                textAlign: "center",
                borderRadius: "6px",
                textDecoration: "none",
              }}
            >
              Voir le détail
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AnnoncesList;