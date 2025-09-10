package com.trabalho.academia.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Treino {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", length = 50)
    private String nome;

    @Column(name = "descricao", length = 50)
    private String descricao;

    @Column(name = "imagem", length = 200)
    private String imagem;

    @Column(name = "treinador", length = 50)
    private String treinador;
}

