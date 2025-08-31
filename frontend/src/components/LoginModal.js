import React, { useState } from 'react';

// Recebe a função de fechar (onClose) e a função para simular o login (onLogin)
function LoginModal({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Em uma aplicação real, aqui você faria uma chamada de API para autenticar.
    // Para este exemplo, vamos apenas simular um login bem-sucedido.
    console.log('Tentativa de login com:', { email, password });
    onLogin({ email: email }); // Passa o email para o App.js
    onClose(); // Fecha o modal após o login
  };

  return (
    <>
      <div className="modal-backdrop fade show" style={{ display: 'block' }}></div>
      <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" onClick={onClose}>
        <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content bg-dark text-white">
            <div className="modal-header border-secondary">
              <h5 className="modal-title text-warning">Login</h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="loginEmail" className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="loginEmail" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="loginPassword" className="form-label">Senha</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="loginPassword" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                </div>
                <button type="submit" className="btn btn-warning w-100 fw-bold">Entrar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginModal;