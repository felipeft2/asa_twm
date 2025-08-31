import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationModal.css';

// Nosso componente de modal recebe 3 props:
// 1. isOpen: um booleano que diz se o modal deve estar visível ou não.
// 2. onClose: uma função para ser chamada quando o modal precisar ser fechado.
// 3. type: uma string ('aluno' ou 'treinador') para sabermos qual formulário mostrar.
function RegistrationModal({ isOpen, onClose, type }) {
  // Estados para controlar os valores dos campos do formulário
  const [nome, setName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [specificField, setSpecificField] = useState(''); // Campo que muda

  // Se o modal não estiver aberto, não renderiza nada.
  if (!isOpen) {
    return null;
  }

  // Define o título e o label do campo específico com base no 'type'
  const title = type === 'aluno' ? 'Cadastrar Aluno' : 'Cadastrar Treinador';
  const specificLabel = type === 'aluno' ? 'Objetivo (Ex: Hipertrofia)' : 'Especialidade (Ex: Musculação)';

  const handleSubmit = async (event) => {
    event.preventDefault(); // Impede o recarregamento da página ao submeter o form

    // Cria um objeto com os dados do formulário
    const formData = {
      nome,
      email,
      senha,
      telefone,
      tipo: type.toUpperCase(),
      dataNascimento,
      ...(type === 'aluno' 
          ? { objetivo: specificField } 
          : { especialidade: specificField}
         )
    };

    const url = type === 'aluno'
      ? 'http://localhost:8080/api/v1/alunos'  
      : 'http://localhost:8080/api/v1/treinadores';
    try{
      const response = await axios.post(url, formData);

      console.log('Cadastro realizado com sucesso:', response.data);
      alert(`Cadastro de ${type} enviado com sucesso!`);
      onClose();
    }
    catch(error){
      console.error(`Erro ao cadastrar ${type}:`, error);

      if(error.response){
        alert(`Erro: ${error.response.data.message || 'Não foi possível realizar o cadastro.'}`);
      }
      else if (error.request) {
        alert('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
      } else {
        alert('Ocorreu um erro inesperado.');
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>x</button>
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome Completo</label>
            <input 
              type="text" 
              id="name" value={nome} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input 
              type="password" 
              id="password" 
              value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input 
              type="telefone" 
              id="telefone" 
              value={telefone} 
              onChange={(e) => setTelefone(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="specific">{specificLabel}</label>
            <input 
              type="text" 
              id="specific" 
              value={specificField} 
              onChange={(e) => setSpecificField(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="dataNascimento">Data de Nascimento</label>
            <input
              type="date"
              id="dataNascimento"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationModal;