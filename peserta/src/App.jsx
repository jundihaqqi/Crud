import { BrowserRouter, Route,Routes,Link } from "react-router-dom";
import KejuruanPages from "./pages/KejuruanPages";
import AbsensiPages from "./pages/AbsensiPages";


function App() {
    return (
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to='/'>react CRUD</Link>
            <div className="navbar-nav">
                <Link className="nav-link" to='/kejuruans'>Kejuruan</Link>
                <Link className="nav-link" to='/absensis'>Absensi</Link>
            </div>
          </div> 
        </nav> 
        <Routes>
          <Route path="/" element={
            <div className="container py-5 text-center">
              <h1>Selamat Datang</h1>
              <p className="lead">Silahkan pilih menu</p>
            </div>
          }/>
            <Route path="/kejuruans" element={<KejuruanPages/>}/>
            <Route path="/absensis" element={<AbsensiPages/>}/>
        </Routes>    
      </BrowserRouter>
    )
}

export default App