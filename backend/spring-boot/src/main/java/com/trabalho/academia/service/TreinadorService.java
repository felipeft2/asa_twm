package com.trabalho.academia.service;

import java.util.List;
import java.util.Optional;

import com.trabalho.academia.model.Treinador;

public interface TreinadorService {
    Treinador save (Treinador treinador);
    List<Treinador> findAllTreinadores();
    Optional<Treinador> findById(Long id);
    Treinador update(Treinador treinador);
    void deleteById(Long id); 
}
