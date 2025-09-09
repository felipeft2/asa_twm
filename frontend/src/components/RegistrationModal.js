import React, { useState, useEffect } from 'react';

function RegistrationModal({ isOpen, onClose, type, onSubmit }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [specificField, setSpecificField] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      setNome('');
      setEmail('');
      setSenha('');
      setTelefone('');
      setDataNascimento('');
      setSpecificField('');
      setLoading(false);
    }
  }, [isOpen, type]);

  if (!isOpen) {
    return null;
  }

  const title = type === 'aluno' ? 'Cadastrar Aluno' : 'Cadastrar Treinador';
  const specificLabel = type === 'aluno' ? 'Objetivo (Ex: Hipertrofia)' : 'CREF';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    const formData = {
      tipo: type,
      nome,
      email,
      senha,
      telefone,
      dataNascimento,
      ...(type === 'aluno' 
          ? { objetivo: specificField } 
          : { cref: specificField }
      )
    };
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error in registration:', error);
    } finally {
      setLoading(false);
    }
  };

  // Phone mask function
  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const phoneNumber = value.replace(/\D/g, '');
    
    // Limit to 11 digits (Brazilian mobile format)
    const limitedPhone = phoneNumber.slice(0, 11);
    
    // Apply formatting based on length
    if (limitedPhone.length <= 2) {
      return `(${limitedPhone}`;
    } else if (limitedPhone.length <= 7) {
      return `(${limitedPhone.slice(0, 2)}) ${limitedPhone.slice(2)}`;
    } else {
      return `(${limitedPhone.slice(0, 2)}) ${limitedPhone.slice(2, 7)}-${limitedPhone.slice(7)}`;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'telefone') {
      // Apply phone mask
      const formattedPhone = formatPhoneNumber(value);
      setTelefone(formattedPhone);
    }
    // Note: other fields are handled by their individual onChange handlers
  };

  return (
    <>
      <div className="modal-backdrop fade show" style={{ display: 'block' }}></div>
      
      <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" onClick={onClose}>
        <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content bg-dark text-white">
            <div className="modal-header border-secondary">
              <h5 className="modal-title text-warning">{title}</h5>
              <button 
                type="button" 
                className="btn-close btn-close-white" 
                onClick={onClose}
                disabled={loading}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nome Completo</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    value={nome} 
                    onChange={(e) => setNome(e.target.value)} 
                    required 
                    disabled={loading}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    disabled={loading}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Senha</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    value={senha} 
                    onChange={(e) => setSenha(e.target.value)} 
                    required 
                    minLength="6"
                    disabled={loading}
                  />
                  <small className="form-text text-muted">Mínimo de 6 caracteres</small>
                </div>
                <div className="mb-3">
                  <label htmlFor="telefone" className="form-label">Telefone</label>
                  <input 
                    type="tel" 
                    className="form-control phone-input" 
                    id="telefone" 
                    name="telefone"
                    value={telefone} 
                    onChange={handleChange} 
                    placeholder="(11) 99999-9999"
                    required 
                    disabled={loading}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="dataNascimento" className="form-label">Data de Nascimento</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    id="dataNascimento" 
                    value={dataNascimento} 
                    onChange={(e) => setDataNascimento(e.target.value)} 
                    required 
                    disabled={loading}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="specific" className="form-label">{specificLabel}</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="specific" 
                    value={specificField} 
                    onChange={(e) => setSpecificField(e.target.value)} 
                    required 
                    disabled={loading}
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn btn-warning w-100 fw-bold"
                  disabled={loading}
                >
                  {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegistrationModal;