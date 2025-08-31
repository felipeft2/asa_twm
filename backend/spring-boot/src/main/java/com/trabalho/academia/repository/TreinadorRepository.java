package com.trabalho.academia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.trabalho.academia.model.Treinador;

public interface TreinadorRepository extends JpaRepository<Treinador, Long>{
    
}
