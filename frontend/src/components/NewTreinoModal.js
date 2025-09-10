import React, { useEffect, useState } from 'react';
import { treinoService } from '../services/api';

function NewTreinoModal({ isOpen, onClose, onCreated }) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [exercicios, setExercicios] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(isOpen){
      (async () => {
        try{
          setLoading(true);
          const data = await treinoService.getExercises();
          setExercicios(data);
        }catch(e){
          setError('Falha ao carregar exercícios');
        }finally{setLoading(false);}
      })();
    } else {
      // reset ao fechar
      setNome('');
      setDescricao('');
      setSelected([]);
      setError(null);
    }
  }, [isOpen]);

  const addExerciseRow = () => {
    setSelected(prev => [...prev, { exercicioId: '', series: '', repeticoes: '', carga: '' }]);
  };

  const updateRow = (index, field, value) => {
    setSelected(prev => prev.map((row,i) => i===index ? { ...row, [field]: value } : row));
  };

  const removeRow = (index) => {
    setSelected(prev => prev.filter((_,i)=> i!==index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!nome.trim()){
      setError('Nome é obrigatório');
      return;
    }
    const payload = {
      nome,
      descricao,
      exercicios: selected.filter(r => r.exercicioId).map(r => ({
        exercicioId: Number(r.exercicioId),
        series: r.series ? Number(r.series) : null,
        repeticoes: r.repeticoes ? Number(r.repeticoes) : null,
        carga: r.carga ? Number(r.carga) : null
      }))
    };
    try{
      setLoading(true);
      const created = await treinoService.createWithExercises(payload);
      onCreated(created);
      onClose();
    }catch(e){
      setError(e?.response?.data || 'Erro ao criar treino');
    }finally{setLoading(false);}
  };

  if(!isOpen) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ background:'rgba(0,0,0,0.6)' }}>
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content bg-dark text-white">
          <div className="modal-header">
            <h5 className="modal-title">Novo Treino</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {error && <div className="alert alert-danger py-2">{error}</div>}
              <div className="mb-3">
                <label className="form-label">Nome</label>
                <input className="form-control" value={nome} onChange={e=>setNome(e.target.value)} maxLength={50} />
              </div>
              <div className="mb-3">
                <label className="form-label">Descrição</label>
                <input className="form-control" value={descricao} onChange={e=>setDescricao(e.target.value)} maxLength={50} />
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="m-0">Exercícios</h6>
                <button type="button" className="btn btn-sm btn-warning" onClick={addExerciseRow}>+ Adicionar Exercício</button>
              </div>
              {selected.length === 0 && <p className="text-muted">Nenhum exercício adicionado.</p>}
              {selected.map((row, index) => (
                <div key={index} className="row g-2 align-items-end mb-2">
                  <div className="col-md-4">
                    <label className="form-label small">Exercício</label>
                    <select className="form-select form-select-sm" value={row.exercicioId} onChange={e=>updateRow(index,'exercicioId', e.target.value)}>
                      <option value="">Selecione</option>
                      {exercicios.map(ex => <option key={ex.id} value={ex.id}>{ex.nome}</option>)}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label className="form-label small">Séries</label>
                    <input type="number" min="0" className="form-control form-control-sm" value={row.series} onChange={e=>updateRow(index,'series', e.target.value)} />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label small">Repetições</label>
                    <input type="number" min="0" className="form-control form-control-sm" value={row.repeticoes} onChange={e=>updateRow(index,'repeticoes', e.target.value)} />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label small">Carga</label>
                    <input type="number" min="0" className="form-control form-control-sm" value={row.carga} onChange={e=>updateRow(index,'carga', e.target.value)} />
                  </div>
                  <div className="col-md-2 text-end">
                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={()=>removeRow(index)}>Remover</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>Cancelar</button>
              <button type="submit" className="btn btn-warning" disabled={loading}>{loading ? 'Salvando...' : 'Salvar Treino'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewTreinoModal;
