import React, { useState } from 'react';
import WorkoutCard from './components/WorkoutCard';
import RegistrationModal from './components/RegistrationModal';
import LoginModal from './components/LoginModal';
import Header from './components/Header';
import './App.css';
import mockWorkouts from './data/mockWorkouts.json';

function App() {
  const [workouts] = useState(mockWorkouts.mockWorkouts);
  const [myWorkouts, setMyWorkouts] = useState([]);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('all'); // 'all' ou 'my'
  
  const [registrationModalInfo, setRegistrationModalInfo] = useState({ isOpen: false, type: null });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openRegistrationModal = (type) => setRegistrationModalInfo({ isOpen: true, type: type });
  const closeRegistrationModal = () => setRegistrationModalInfo({ isOpen: false, type: null });
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setMyWorkouts([mockWorkouts.mockWorkouts[0]]); 
    setCurrentView('my'); 
    alert(`Bem-vindo(a), ${userData.email}!`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setMyWorkouts([]);
    setCurrentView('all'); 
  };

  const addWorkoutToMyList = (workoutToAdd) => {
    if (myWorkouts.some(workout => workout.id === workoutToAdd.id)) {
      alert('Este treino já está na sua lista!');
      return;
    }
    setMyWorkouts(prevWorkouts => [...prevWorkouts, workoutToAdd]);
    alert(`"${workoutToAdd.title}" adicionado aos seus treinos!`);
  };

  const WorkoutList = ({ list, onAdd, showAddButton }) => (
    <div className="row g-4">
      {list.map(workout => (
        <div key={workout.id} className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch">
          <WorkoutCard workout={workout} onAddWorkout={onAdd} showAddButton={showAddButton} />
        </div>
      ))}
    </div>
  );

  const MyWorkoutsPlaceholder = () => {
    if (!isLoggedIn) {
      return (
        <div className="text-center p-5 bg-secondary rounded shadow"> {/* Usa bg-secondary customizado */}
          <h3 className="text-warning">Área Restrita</h3>
          <p className="text-light">Você precisa fazer login para ver ou adicionar seus treinos.</p>
          <button className="btn btn-warning" onClick={openLoginModal}>Fazer Login</button>
        </div>
      );
    }
    if (myWorkouts.length === 0) {
      return (
        <div className="text-center p-5 bg-secondary rounded shadow"> {/* Usa bg-secondary customizado */}
          <h3 className="text-white">Nenhum treino na sua lista</h3>
          <p className="text-light">Navegue em "Todos os Treinos" e adicione os que mais gostar!</p>
          <button className="btn btn-outline-warning" onClick={() => setCurrentView('all')}>Ver todos os treinos</button>
        </div>
      );
    }
    return null;
  };


  return (
    // Adiciona bg-dark para garantir o fundo, mas o CSS sobrescreve para preto
    <div data-bs-theme="dark" className="bg-dark min-vh-100 text-white"> 
      <Header 
        openModal={openRegistrationModal}
        openLoginModal={openLoginModal}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      <main className="container" style={{ paddingTop: '80px', paddingBottom: '40px' }}>
        {currentView === 'all' && (
          <>
            <div className="p-4 p-md-5 mb-4 rounded text-center bg-secondary"> {/* Usa bg-secondary customizado */}
                <h1 className="display-5 fst-italic">Nossos Treinos</h1>
                <p className="lead my-3 text-light">Escolha seu foco e comece a transformar seu corpo e mente.</p>
            </div>
            <WorkoutList list={workouts} onAdd={addWorkoutToMyList} showAddButton={isLoggedIn} />
          </>
        )}
        
        {currentView === 'my' && (
          <>
            <div className="p-4 p-md-5 mb-4 rounded text-center bg-secondary"> {/* Usa bg-secondary customizado */}
                <h1 className="display-5 fst-italic">Meus Treinos</h1>
                <p className="lead my-3 text-light">Sua jornada personalizada para o sucesso.</p>
            </div>
            {myWorkouts.length > 0 ? (
              <WorkoutList list={myWorkouts} showAddButton={false} />
            ) : (
              <MyWorkoutsPlaceholder />
            )}
          </>
        )}
      </main>

      <RegistrationModal 
        isOpen={registrationModalInfo.isOpen}
        onClose={closeRegistrationModal}
        type={registrationModalInfo.type}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onLogin={handleLogin}
      />
    </div>
  );
}

export default App;