import React from 'react';

// Recebe novas props para controlar o estado de login e a visão atual
function Header({ 
  openModal, 
  openLoginModal, 
  isLoggedIn, 
  handleLogout,
  currentView,
  setCurrentView
}) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow">
      <div className="container">
        <a className="navbar-brand fw-bold text-warning" href="#" onClick={() => setCurrentView('all')}>GymLife</a>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a 
                className={`nav-link ${currentView === 'all' ? 'active fw-bold' : ''}`} 
                href="#" 
                onClick={() => setCurrentView('all')}>
                Todos os Treinos
              </a>
            </li>
            {isLoggedIn && ( // Mostra "Meus Treinos" apenas se estiver logado
              <li className="nav-item">
                <a 
                  className={`nav-link ${currentView === 'my' ? 'active fw-bold' : ''}`} 
                  href="#" 
                  onClick={() => setCurrentView('my')}>
                  Meus Treinos
                </a>
              </li>
            )}
          </ul>

          <div className="d-flex gap-2">
            {isLoggedIn ? (
              // Se estiver logado, mostra o botão de Logout
              <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
            ) : (
              // Se não, mostra Login e Cadastro
              <>
                <button className="btn btn-outline-light" onClick={openLoginModal}>Login</button>
                <div className="dropdown">
                  <button className="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Cadastrar
                  </button>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li><a className="dropdown-item" href="#" onClick={() => openModal('aluno')}>Sou Aluno</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => openModal('treinador')}>Sou Treinador</a></li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;