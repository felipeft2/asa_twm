package com.trabalho.academia.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.trabalho.academia.model.Exercicio;

public interface ExercicioRepository extends JpaRepository<Exercicio, Long> {
    
}
