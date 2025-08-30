import React, { useState } from 'react';
import './RegistrationModal.css';

// Nosso componente de modal recebe 3 props:
// 1. isOpen: um booleano que diz se o modal deve estar visível ou não.
// 2. onClose: uma função para ser chamada quando o modal precisar ser fechado.
// 3. type: uma string ('aluno' ou 'treinador') para sabermos qual formulário mostrar.
function RegistrationModal({ isOpen, onClose, type }) {
  // Estados para controlar os valores dos campos do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [specificField, setSpecificField] = useState(''); // Campo que muda

  // Se o modal não estiver aberto, não renderiza nada.
  if (!isOpen) {
    return null;
  }

  // Define o título e o label do campo específico com base no 'type'
  const title = type === 'aluno' ? 'Cadastrar Aluno' : 'Cadastrar Treinador';
  const specificLabel = type === 'aluno' ? 'Objetivo (Ex: Hipertrofia)' : 'Especialidade (Ex: Musculação)';

  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o recarregamento da página ao submeter o form

    // Cria um objeto com os dados do formulário
    const formData = {
      name,
      email,
      password,
      ...(type === 'aluno' ? { objetivo: specificField } : { especialidade: specificField })
    };

    // --- PONTO IMPORTANTE ---
    // Por enquanto, vamos apenas mostrar os dados no console.
    // Quando o backend Java estiver pronto, aqui você fará a chamada `fetch`
    // para a sua API, enviando `formData`.
    console.log(`Dados para cadastrar ${type}:`, formData);
    
    alert(`Cadastro de ${type} enviado com sucesso! (Verifique o console)`);
    onClose(); // Fecha o modal após o envio
  };

  return (
    // O 'overlay' é o fundo escuro que fica atrás do modal
    <div className="modal-overlay" onClick={onClose}>
      {/* Impede que o clique dentro do modal feche-o (propagação) */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome Completo</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="specific">{specificLabel}</label>
            <input type="text" id="specific" value={specificField} onChange={(e) => setSpecificField(e.target.value)} required />
          </div>
          <button type="submit" className="submit-button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationModal;