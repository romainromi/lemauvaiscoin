import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <h1>Bienvenue</h1>
      <p style={{ fontSize: "18px", color: "#555", marginBottom: "30px" }}>
        Parcourez les annonces ou publiez la vôtre.
      </p>
      <Link
        to="/annonces"
        style={{
          padding: "12px 24px",
          backgroundColor: "#2563eb",
          color: "white",
          borderRadius: "6px",
          textDecoration: "none",
          fontSize: "16px",
        }}
      >
        Voir les annonces
      </Link>
    </div>
  )
}

export default Home