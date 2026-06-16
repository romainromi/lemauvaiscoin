import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import Navbar from './components/Navbar'
import CreateCategory from './pages/dashboard/CreateCategory'
import CreateAnnonce from './pages/dashboard/CreateAnnonce'
import PrivateRoute from './routes/PrivateRoute'
import Home from './pages/Home'
import AnnoncesList from './pages/dashboard/AnnonceList'
import AnnonceDetail from './pages/dashboard/AnnonceDetail'

function App() {


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="page-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/annonces" element={<AnnoncesList />} />
            <Route path="/annonces/:id" element={<AnnonceDetail />} />

            <Route element={<PrivateRoute />}>
              <Route path="/annonces/create" element={<CreateAnnonce />} />
              <Route path="/categories/create" element={<CreateCategory />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
)}

export default App
