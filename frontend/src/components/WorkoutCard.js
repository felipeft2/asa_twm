import React from 'react';

const nerd_emoji = "https://www.google.com/search?sca_esv=c250b3fb2d4bb442&sxsrf=AE3TifNM82aSUPO8FMuDGQU7LE-KXWs5wQ:1757219087093&udm=2&fbs=AIIjpHxX5k-tONtMCu8aDeA7E5WMdDwGSuc8eBkl8hX51y2q6zXcRDYoJ2KzyHu-jsH4o75WMvvf9tCleQDjWlWxWoGn2W4d_dpJbh5cEnrhhHBDzRQM0OMdLRt4F88EphPVspHOz_EoMqQ7pOaxtN3LBqqOkOLbT11ZXJ4LBZWwptfeNeNneQwannuYC1jYEUVt0L8esKkSGnHHhy0gKKftjrgOY9jbfg&q=nerd+emoji&sa=X&sqi=2&ved=2ahUKEwif_umb58WPAxUmP7kGHTBWHW8QtKgLegQIFBAB&biw=2133&bih=1012&dpr=0.9";

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
          <a href={`${nerd_emoji}`} className="btn btn-outline-warning">Ver Detalhes</a> {/* Botão outline amarelo */}
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