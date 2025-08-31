package com.trabalho.academia.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import lombok.Data;

@Entity
@Data
public class TreinoExercicio {
    @EmbeddedId
    private TreinoExercicioId id;

    @ManyToOne
    @MapsId("idTreino")
    @JoinColumn(name = "id_treino")
    private Treino treino;

    @ManyToOne
    @MapsId("idExercicio")
    @JoinColumn(name = "id_exercicio")
    private Exercicio exercicio;

    private Integer series;
    private Integer repeticoes;
    private Integer carga;
}
