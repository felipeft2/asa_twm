package com.trabalho.academia.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class Aluno extends Usuario{
    @Column(name = "dataNascimento")
    private LocalDate dataNascimento;

    @Column(name = "objetivo", length = 50)
    private String objetivo; 
}
