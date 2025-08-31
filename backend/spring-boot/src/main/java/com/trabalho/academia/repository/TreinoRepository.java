package com.trabalho.academia.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.trabalho.academia.model.Treino;

public interface TreinoRepository extends JpaRepository<Treino, Long>{
    
}
