package com.trabalho.academia.service;

import java.util.List;
import java.util.Optional;

import com.trabalho.academia.model.Exercicio;

public interface ExercicioService {
    Exercicio save (Exercicio exercicio);
    List<Exercicio> findAllExercicios();
    Optional<Exercicio> findById(Long id);
    Exercicio update(Exercicio exercicio);
    void deleteById(Long id);
}
