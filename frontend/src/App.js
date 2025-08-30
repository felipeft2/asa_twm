import React, { useState } from 'react';
import WorkoutCard from './components/WorkoutCard';
import RegistrationModal from './components/RegistrationModal'; // 1. Importe o novo componente
import './App.css';

const mockWorkouts = [
  // ... (seus dados mockados de treinos continuam aqui, sem alteração)
  {
    id: 1,
    title: 'Membros Inferiores',
    description: 'Um treino focado no fortalecimento e hipertrofia de pernas e glúteos. Essencial para uma base sólida e equilíbrio corporal.',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
    instructor: 'Ana Silva'
  },
  {
    id: 2,
    title: 'Membros Superiores',
    description: 'Desenvolva força e definição para peito, costas, ombros, bíceps e tríceps. Melhore sua postura e força funcional.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    instructor: 'Carlos Souza'
  },
  {
    id: 3,
    title: 'Mobilidade e Flexibilidade',
    description: 'Aumente sua amplitude de movimento, previna lesões e melhore sua performance em todos os outros treinos. Ideal para relaxamento.',
    image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    instructor: 'Juliana Paes'
  }
];

function App() {
  const [workouts, setWorkouts] = useState(mockWorkouts);
  
  // 2. Crie um estado para controlar o modal.
  // Ele guarda se está aberto (isOpen) e qual o tipo de formulário (type).
  const [modalInfo, setModalInfo] = useState({ isOpen: false, type: null });

  // Funções para abrir e fechar o modal
  const openModal = (type) => setModalInfo({ isOpen: true, type: type });
  const closeModal = () => setModalInfo({ isOpen: false, type: null });

  return (
    <div className="App">
      <header className="app-header">
        <h1>Nossos Treinos</h1>
        <p>Escolha seu foco e comece a transformar seu corpo e sua mente hoje mesmo.</p>
        
        {/* 3. Adicione a nova região com os botões de cadastro */}
        <div className="header-actions">
          <button className="action-button" onClick={() => openModal('aluno')}>
            Cadastrar Aluno
          </button>
          <button className="action-button" onClick={() => openModal('treinador')}>
            Cadastrar Treinador
          </button>
        </div>
      </header>
      
      <main className="workouts-container">
        {workouts.map(workout => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </main>

      {/* 4. Renderize o componente do modal aqui. */}
      {/* Ele só será visível quando modalInfo.isOpen for true. */}
      <RegistrationModal 
        isOpen={modalInfo.isOpen}
        onClose={closeModal}
        type={modalInfo.type}
      />
    </div>
  );
}

export default App;