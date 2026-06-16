import { NavLink } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'
import { useAuth } from '../hooks/UseAuth'

const Navbar = () => {
  const { user } = useAuth()
  return (
    <nav className="navbar shadow-1 meadow light-1">
      <NavLink to="/" className="navbar-brand">Accueil</NavLink>
      <div className="navbar-menu ml-auto">
        <NavLink className="navbar-link" to="/annonces">Annonces</NavLink>
        {!user && (
          <>
            <NavLink className="navbar-link" to="/register">Inscription</NavLink>
            <NavLink className="navbar-link" to="/login">Connexion</NavLink>
          </>
        )}
        {user && (
          <>
            <NavLink className="navbar-link" to="/annonces/create">Créer une annonce</NavLink>
            <NavLink className="navbar-link" to="/categories/create">Créer une catégorie</NavLink>
            <LogoutBtn />
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar