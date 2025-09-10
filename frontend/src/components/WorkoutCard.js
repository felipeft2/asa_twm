import React from 'react';

const nerd_emoji = "https://www.google.com/search?sca_esv=c250b3fb2d4bb442&sxsrf=AE3TifNM82aSUPO8FMuDGQU7LE-KXWs5wQ:1757219087093&udm=2&fbs=AIIjpHxX5k-tONtMCu8aDeA7E5WMdDwGSuc8eBkl8hX51y2q6zXcRDYoJ2KzyHu-jsH4o75WMvvf9tCleQDjWlWxWoGn2W4d_dpJbh5cEnrhhHBDzRQM0OMdLRt4F88EphPVspHOz_EoMqQ7pOaxtN3LBqqOkOLbT11ZXJ4LBZWwptfeNeNneQwannuYC1jYEUVt0L8esKkSGnHHhy0gKKftjrgOY9jbfg&q=nerd+emoji&sa=X&sqi=2&ved=2ahUKEwif_umb58WPAxUmP7kGHTBWHW8QtKgLegQIFBAB&biw=2133&bih=1012&dpr=0.9";

function WorkoutCard({ workout = {}, onAddWorkout, showAddButton }) {
  const {
    id,
    nome = 'Treino',
    descricao = 'Sem descrição disponível.',
    imagem: rawImagem,
    treinador: rawTreinador
  } = workout || {};

  const imagem = (typeof rawImagem === 'string' && rawImagem.trim() !== '')
    ? rawImagem.trim()
    : 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2025/02/treino.jpg?w=419&h=283&crop=0';

  const treinador = (typeof rawTreinador === 'string' && rawTreinador.trim() !== '')
    ? rawTreinador.trim()
    : 'Treinador Desconhecido';

  return (
    <div className="card bg-secondary text-white h-100 shadow-lg border-0 w-100">
      <img 
        src={imagem} 
        className="card-img-top" 
        alt={`Imagem do treino de ${nome}`}
        style={{
          height: '200px',
          objectFit: 'cover',
          objectPosition: 'center',
          borderTopLeftRadius: '0.375rem',
          borderTopRightRadius: '0.375rem'
        }}
      />
      <div className="card-body d-flex flex-column p-3">
        <h5 className="card-title text-white mb-2" style={{ minHeight: '1.5rem', fontSize: '1.1rem' }}>{nome}</h5>
        <h6 className="card-subtitle mb-2 text-warning fst-italic" style={{ minHeight: '1.2rem', fontSize: '0.9rem' }}>com {treinador}</h6>
        <p className="card-text flex-grow-1 text-light" style={{ 
          minHeight: '3rem', 
          fontSize: '0.85rem',
          lineHeight: '1.4',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical'
        }}>{descricao}</p>
        <div className="d-flex justify-content-between align-items-center mt-auto pt-2">
          <a href={`${nerd_emoji}`} className="btn btn-outline-warning btn-sm flex-grow-1 me-2">Ver Detalhes</a>
          {showAddButton && (
             <button className="btn btn-warning btn-sm" onClick={() => onAddWorkout(workout)}>
                + Add
             </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkoutCard;