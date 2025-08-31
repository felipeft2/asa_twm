import React, { useState } from 'react';
import WorkoutCard from './components/WorkoutCard';
import RegistrationModal from './components/RegistrationModal';
import LoginModal from './components/LoginModal'; // Importe o novo modal
import Header from './components/Header';

const mockWorkouts = [
    // Seus dados de treino...
  {
    id: 1,
    title: 'Membros Inferiores',
    description: 'Um treino focado no fortalecimento e hipertrofia de pernas e glúteos. Essencial para uma base sólida e equilíbrio corporal.',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto.format&fit=crop&w=1169&q=80',
    instructor: 'Ana Silva'
  },
  {
    id: 2,
    title: 'Membros Superiores',
    description: 'Desenvolva força e definição para peito, costas, ombros, bíceps e tríceps. Melhore sua postura e força funcional.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto.format&fit=crop&w=1170&q=80',
    instructor: 'Carlos Souza'
  },
  {
    id: 3,
    title: 'Mobilidade e Flexibilidade',
    description: 'Aumente sua amplitude de movimento, previna lesões e melhore sua performance em todos os outros treinos. Ideal para relaxamento.',
    image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto.format&fit=crop&w=1170&q=80',
    instructor: 'Juliana Paes'
  }
];

function App() {
  const [workouts] = useState(mockWorkouts);
  const [myWorkouts, setMyWorkouts] = useState([]);
  
  // Estados de controle
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('all'); // 'all' ou 'my'
  
  // Estados dos modais
  const [registrationModalInfo, setRegistrationModalInfo] = useState({ isOpen: false, type: null });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Funções de controle dos modais
  const openRegistrationModal = (type) => setRegistrationModalInfo({ isOpen: true, type: type });
  const closeRegistrationModal = () => setRegistrationModalInfo({ isOpen: false, type: null });
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  // Funções de Lógica do Usuário
  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    // Simula que o usuário já tinha o primeiro treino da lista
    setMyWorkouts([mockWorkouts[0]]); 
    setCurrentView('my'); // Muda para a aba "Meus Treinos" após o login
    alert(`Bem-vindo(a), ${userData.email}!`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setMyWorkouts([]);
    setCurrentView('all'); // Volta para a aba principal ao sair
  };

  const addWorkoutToMyList = (workoutToAdd) => {
    if (myWorkouts.some(workout => workout.id === workoutToAdd.id)) {
      alert('Este treino já está na sua lista!');
      return;
    }
    setMyWorkouts(prevWorkouts => [...prevWorkouts, workoutToAdd]);
    alert(`"${workoutToAdd.title}" adicionado aos seus treinos!`);
  };

  // Componente para renderizar a lista de treinos (reutilizável)
  const WorkoutList = ({ list, onAdd, showAddButton }) => (
    <div className="row g-4">
      {list.map(workout => (
        <div key={workout.id} className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch">
          <WorkoutCard workout={workout} onAddWorkout={onAdd} showAddButton={showAddButton} />
        </div>
      ))}
    </div>
  );

  // Componente para a tela de "Meus Treinos" quando vazia ou deslogada
  const MyWorkoutsPlaceholder = () => {
    if (!isLoggedIn) {
      return (
        <div className="text-center p-5 bg-secondary rounded shadow">
          <h3 className="text-warning">Área Restrita</h3>
          <p>Você precisa fazer login para ver ou adicionar seus treinos.</p>
          <button className="btn btn-warning" onClick={openLoginModal}>Fazer Login</button>
        </div>
      );
    }
    if (myWorkouts.length === 0) {
      return (
        <div className="text-center p-5 bg-secondary rounded shadow">
          <h3 className="text-white">Nenhum treino na sua lista</h3>
          <p>Navegue em "Todos os Treinos" e adicione os que mais gostar!</p>
          <button className="btn btn-outline-warning" onClick={() => setCurrentView('all')}>Ver todos os treinos</button>
        </div>
      );
    }
    return null;
  };


  return (
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
            <div className="p-4 p-md-5 mb-4 rounded text-center bg-secondary">
                <h1 className="display-5 fst-italic">Nossos Treinos</h1>
                <p className="lead my-3">Escolha seu foco e comece a transformar seu corpo e mente.</p>
            </div>
            <WorkoutList list={workouts} onAdd={addWorkoutToMyList} showAddButton={isLoggedIn} />
          </>
        )}
        
        {currentView === 'my' && (
          <>
            <div className="p-4 p-md-5 mb-4 rounded text-center bg-secondary">
                <h1 className="display-5 fst-italic">Meus Treinos</h1>
                <p className="lead my-3">Sua jornada personalizada para o sucesso.</p>
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