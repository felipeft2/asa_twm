package com.trabalho.academia.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class TreinoExercicio {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "treino")
    private Treino treino;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercicio")
    private Exercicio exercicio;

    @Column(name = "series")
    private Long series;

    @Column(name = "repeticoes")
    private Long repeticoes;

    @Column(name = "carga")
    private Long carga;
}
