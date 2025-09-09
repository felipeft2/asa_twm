package com.trabalho.academia.service;

import java.util.List;
import java.util.Optional;

import com.trabalho.academia.model.TreinoExercicio;

public interface TreinoExercicioService {
    TreinoExercicio save (TreinoExercicio treinoExercicio);
    List<TreinoExercicio> findAllTreinoExercicios();
    Optional<TreinoExercicio> findById(Long id);
    TreinoExercicio update(TreinoExercicio treinoExercicio);
    void deleteById(Long id);
}
