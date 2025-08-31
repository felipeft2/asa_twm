import React from 'react';

// Recebe a função para adicionar treino e um booleano para mostrar ou não o botão
function WorkoutCard({ workout, onAddWorkout, showAddButton }) {
  const { title, description, instructor, image } = workout;

  return (
    <div className="card bg-secondary text-white h-100 shadow-lg border-0">
      <img src={image} className="card-img-top" alt={`Imagem do treino de ${title}`} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-warning fst-italic">com {instructor}</h6>
        <p className="card-text flex-grow-1">{description}</p>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <a href="#" className="btn btn-outline-warning">Ver Detalhes</a>
          {showAddButton && (
             <button className="btn btn-warning" onClick={() => onAddWorkout(workout)}>
                + Adicionar
             </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkoutCard;