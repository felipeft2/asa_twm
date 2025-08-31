package com.trabalho.academia.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class Exercicio {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long idExercicio;

    private String nome;
    private String descricao;
    private String grupoMuscular;

    @OneToMany(mappedBy = "exercicio")
    private List<TreinoExercicio> treinoExercicios;

}

