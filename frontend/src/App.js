import React, { useState, useEffect, useCallback } from 'react';
import WorkoutCard from './components/WorkoutCard';
import RegistrationModal from './components/RegistrationModal';
import LoginModal from './components/LoginModal';
import Header from './components/Header';
import './App.css';
import { userService, favoritoService } from './services/api';
import mockWorkouts from './data/mockWorkouts.json';

function App() {
  const [workouts] = useState(mockWorkouts.mockWorkouts);
  const [myWorkouts, setMyWorkouts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('all');
  const [registrationModalInfo, setRegistrationModalInfo] = useState({ isOpen: false, type: null });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkLoggedInUser = async() => {
      const token = localStorage.getItem("authToken");
      if(token){
        try{
          const user = await userService.getUserById(token);
          setCurrentUser(user); 
          setIsLoggedIn(true); 
        }
        catch(error){
          console.error("Session expired or token is invalid.", error);
            localStorage.removeItem('authToken');
            setCurrentUser(null);
            setIsLoggedIn(false);
        }
      }
    };
    checkLoggedInUser();
  }, []); 

  const loadUserFavorites = useCallback(async () => {
    try {
      setLoading(true);
      const favorites = await favoritoService.getAllFavorites();
      // Filter favorites for current user (assuming favorites have userId field)
      const userFavorites = favorites.filter(fav => fav.usuarioId === currentUser.id);
      setMyWorkouts(userFavorites);
    } catch (error) {
      console.error('Error loading favorites:', error);
      // For now, use mock data if API fails
      setMyWorkouts([mockWorkouts.mockWorkouts[0]]);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      loadUserFavorites();
    }
  }, [currentUser, loadUserFavorites]);

  const openRegistrationModal = (type) => setRegistrationModalInfo({ isOpen: true, type: type });
  const closeRegistrationModal = () => setRegistrationModalInfo({ isOpen: false, type: null });
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const handleRegistration = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const registrationData = {
        tipo: userData.tipo.toUpperCase(),
        objetivo: userData.objetivo || '',
        nome: userData.nome,
        email: userData.email,
        senha: userData.senha,
        telefone: userData.telefone,
        dataNascimento: userData.dataNascimento,
        ...(userData.tipo === 'treinador' && { cref: userData.cref })
      };

      const response = await userService.register(registrationData);
      console.log('Registration successful:', response);
      alert(`Cadastro de ${userData.tipo} realizado com sucesso! Faça login para continuar.`);
      closeRegistrationModal();
      openLoginModal(); // Open login modal after successful registration
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'Erro ao realizar cadastro. Tente novamente.');
      alert(error.message || 'Erro ao realizar cadastro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const loginCredentials = {
        tipo: "ALUNO",
        objetivo: "",
        nome: "",
        email: userData.email,
        senha: userData.senha,
        telefone: "",
        dataNascimento: ""
      };

      const response = await userService.login(loginCredentials);
      console.log('Login successful:', response.data.nome);
      
      localStorage.setItem('authToken', response.data.id); 

      setCurrentUser(response.data);
      setIsLoggedIn(true);
      setCurrentView('my');
      
      alert(`Bem-vindo(a), ${response.nome || userData.email}!`);
      closeLoginModal();
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Email ou senha incorretos.');
      alert(error.message || 'Email ou senha incorretos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); 
    setIsLoggedIn(false);
    setCurrentUser(null);
    setMyWorkouts([]);
    setCurrentView('all');
    setError(null);
  };

  const addWorkoutToMyList = async (workoutToAdd) => {
    if (!currentUser) {
      alert('Você precisa estar logado para adicionar treinos aos favoritos.');
      return;
    }

    if (myWorkouts.some(workout => workout.id === workoutToAdd.id)) {
      alert('Este treino já está na sua lista!');
      return;
    }

    try {
      setLoading(true);
      
      // Create favorite object for backend
      const favoriteData = {
        usuarioId: currentUser.id,
        treinoId: workoutToAdd.id,
        titulo: workoutToAdd.title,
        descricao: workoutToAdd.description,
        instrutor: workoutToAdd.instructor,
        imagem: workoutToAdd.image
      };

      const response = await favoritoService.addFavorite(favoriteData);
      console.log('Favorite added:', response);
      
      // Update local state
      setMyWorkouts(prevWorkouts => [...prevWorkouts, workoutToAdd]);
      alert(`"${workoutToAdd.title}" adicionado aos seus treinos!`);
    } catch (error) {
      console.error('Error adding favorite:', error);
      // If API fails, still update local state for demo purposes
      setMyWorkouts(prevWorkouts => [...prevWorkouts, workoutToAdd]);
      alert(`"${workoutToAdd.title}" adicionado aos seus treinos!`);
    } finally {
      setLoading(false);
    }
  };

  const removeWorkoutFromMyList = async (workoutId) => {
    try {
      setLoading(true);
      await favoritoService.deleteFavorite(workoutId);
      setMyWorkouts(prevWorkouts => prevWorkouts.filter(w => w.id !== workoutId));
      alert('Treino removido dos favoritos.');
    } catch (error) {
      console.error('Error removing favorite:', error);
      // Still remove from local state even if API fails
      setMyWorkouts(prevWorkouts => prevWorkouts.filter(w => w.id !== workoutId));
    } finally {
      setLoading(false);
    }
  };

  const WorkoutList = ({ list, onAdd, onRemove, showAddButton, showRemoveButton }) => (
    <div className="row g-4">
      {list.map(workout => (
        <div key={workout.id} className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch">
          <WorkoutCard 
            workout={workout} 
            onAddWorkout={onAdd} 
            onRemoveWorkout={onRemove}
            showAddButton={showAddButton}
            showRemoveButton={showRemoveButton}
          />
        </div>
      ))}
    </div>
  );

  const MyWorkoutsPlaceholder = () => {
    if (!isLoggedIn) {
      return (
        <div className="text-center p-5 bg-secondary rounded shadow">
          <h3 className="text-warning">Área Restrita</h3>
          <p className="text-light">Você precisa fazer login para ver ou adicionar seus treinos.</p>
          <button className="btn btn-warning" onClick={openLoginModal}>Fazer Login</button>
        </div>
      );
    }
    if (myWorkouts.length === 0) {
      return (
        <div className="text-center p-5 bg-secondary rounded shadow">
          <h3 className="text-white">Nenhum treino na sua lista</h3>
          <p className="text-light">Navegue em "Todos os Treinos" e adicione os que mais gostar!</p>
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
        currentUser={currentUser}
      />

      <main className="container" style={{ paddingTop: '80px', paddingBottom: '40px' }}>
        {loading && (
          <div className="alert alert-info" role="alert">
            Carregando...
          </div>
        )}
        
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button type="button" className="btn-close" onClick={() => setError(null)}></button>
          </div>
        )}

        {currentView === 'all' && (
          <>
            <div className="p-4 p-md-5 mb-4 rounded text-center bg-secondary">
              <h1 className="display-5 fst-italic">Nossos Treinos</h1>
              <p className="lead my-3 text-light">Escolha seu foco e comece a transformar seu corpo e mente.</p>
            </div>
            <WorkoutList 
              list={workouts} 
              onAdd={addWorkoutToMyList} 
              showAddButton={isLoggedIn}
              showRemoveButton={false}
            />
          </>
        )}
        
        {currentView === 'my' && (
          <>
            <div className="p-4 p-md-5 mb-4 rounded text-center bg-secondary">
              <h1 className="display-5 fst-italic">Meus Treinos</h1>
              <p className="lead my-3 text-light">Sua jornada personalizada para o sucesso.</p>
              {currentUser && (
                <p className="text-warning">Olá, {currentUser.nome}!</p>
              )}
            </div>
            {myWorkouts.length > 0 ? (
              <WorkoutList 
                list={myWorkouts} 
                onRemove={removeWorkoutFromMyList}
                showAddButton={false}
                showRemoveButton={true}
              />
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
        onSubmit={handleRegistration}
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