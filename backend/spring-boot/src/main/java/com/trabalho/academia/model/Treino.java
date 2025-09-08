package com.trabalho.academia.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class Treino {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long idTreino;

    private String nome;
    private String descricao;

    /* NECESSÁRIO IMPLEMENTAR TREINADOR */
    @ManyToOne
    @JoinColumn(name = "id_treinador")
    private Treinador treinador;

    @OneToMany(mappedBy = "treino", cascade = CascadeType.ALL)
    private List<TreinoExercicio> treinoExercicios;

}

