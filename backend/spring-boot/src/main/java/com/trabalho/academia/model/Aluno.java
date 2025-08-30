package com.trabalho.academia.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Aluno {
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    private long id;

    @Column(name = "nome", length = 50)
    private String nome;

    @Column(name = "email", length = 30)
    private String email;

    @Column(name="senha", length=64)
    private String hashSenha;

    @Column(name = "telefone", length = 20)
    private String telefone;

    @Column(name = "nome", length = 50)
    private String objetivo; 
}
