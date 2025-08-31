import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RegistrationModal({ isOpen, onClose, type }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [specificField, setSpecificField] = useState('');

  useEffect(() => {
    if (isOpen) {
      setNome('');
      setEmail('');
      setSenha('');
      setTelefone('');
      setDataNascimento('');
      setSpecificField('');
    }
  }, [isOpen, type]);

  if (!isOpen) {
    return null;
  }

  const title = type === 'aluno' ? 'Cadastrar Aluno' : 'Cadastrar Treinador';
  const specificLabel = type === 'aluno' ? 'Objetivo (Ex: Hipertrofia)' : 'Especialidade (Ex: Musculação)';

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      nome,
      email,
      senha,
      telefone,
      tipo: type.toUpperCase(),
      dataNascimento,
      ...(type === 'aluno' 
          ? { objetivo: specificField } 
          : { especialidade: specificField }
      )
    };

    const url = type === 'aluno'
      ? 'http://localhost:8080/api/v1/alunos'  
      : 'http://localhost:8080/api/v1/treinadores';
      
    try {
      const response = await axios.post(url, formData);
      console.log('Cadastro realizado com sucesso:', response.data);
      alert(`Cadastro de ${type} enviado com sucesso!`);
      onClose();
    } catch (error) {
      console.error(`Erro ao cadastrar ${type}:`, error);
      if (error.response) {
        alert(`Erro: ${error.response.data.message || 'Não foi possível realizar o cadastro.'}`);
      } else if (error.request) {
        alert('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
      } else {
        alert('Ocorreu um erro inesperado.');
      }
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show" style={{ display: 'block' }}></div>
      
      <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" onClick={onClose}>
        <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content bg-dark text-white"> {/* bg-dark e text-white */}
            <div className="modal-header border-secondary">
              <h5 className="modal-title text-warning">{title}</h5> {/* Título amarelo */}
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nome Completo</label>
                  <input type="text" className="form-control" id="name" value={nome} onChange={(e) => setNome(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Senha</label>
                  <input type="password" className="form-control" id="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="telefone" className="form-label">Telefone</label>
                  <input type="tel" className="form-control" id="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
                </div>
                 <div className="mb-3">
                  <label htmlFor="dataNascimento" className="form-label">Data de Nascimento</label>
                  <input type="date" className="form-control" id="dataNascimento" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="specific" className="form-label">{specificLabel}</label>
                  <input type="text" className="form-control" id="specific" value={specificField} onChange={(e) => setSpecificField(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-warning w-100 fw-bold">Cadastrar</button> {/* Botão amarelo */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegistrationModal;