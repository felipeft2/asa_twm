import React from 'react';

function WorkoutCard({ workout, onAddWorkout, showAddButton }) {
  const { title, description, instructor, image } = workout;

  return (
    <div className="card bg-secondary text-white h-100 shadow-lg border-0">
      <img src={image} className="card-img-top" alt={`Imagem do treino de ${title}`} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-white">{title}</h5> {/* Título branco */}
        <h6 className="card-subtitle mb-2 text-warning fst-italic">com {instructor}</h6> {/* Subtítulo amarelo */}
        <p className="card-text flex-grow-1 text-light">{description}</p> {/* Descrição light */}
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <a href="#" className="btn btn-outline-warning">Ver Detalhes</a> {/* Botão outline amarelo */}
          {showAddButton && (
             <button className="btn btn-warning" onClick={() => onAddWorkout(workout)}> {/* Botão amarelo sólido */}
                + Adicionar
             </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkoutCard;