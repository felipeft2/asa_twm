package com.trabalho.academia.service;

import java.util.List;
import java.util.Optional;

import com.trabalho.academia.dto.TreinoDTO;
import com.trabalho.academia.model.Treino;

public interface TreinoService {
    List<Treino> findAll();
    Optional<Treino> findById(Long id);
    Treino save(Treino treino);
    void deleteById(Long id);
    Treino update(Treino treino);
    TreinoDTO saveWithExercises(TreinoDTO treino);
}
