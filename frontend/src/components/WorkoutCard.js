import React from 'react';
import './WorkoutCard.css';

// Este é um componente de apresentação, ele apenas recebe os dados via props e os exibe.
function WorkoutCard({ workout }) {
  // Desestruturamos as propriedades do objeto 'workout' para facilitar o uso
  const { title, description, instructor, image } = workout;

  return (
    <div className="workout-card">
      <img src={image} alt={`Imagem do treino de ${title}`} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-instructor">com {instructor}</p>
        <p className="card-description">{description}</p>
        <button className="card-button">Ver Detalhes</button>
      </div>
    </div>
  );
}

export default WorkoutCard;