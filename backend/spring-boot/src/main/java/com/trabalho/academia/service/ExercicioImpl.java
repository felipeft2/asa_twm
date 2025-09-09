package com.trabalho.academia.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trabalho.academia.model.Exercicio;
import com.trabalho.academia.repository.ExercicioRepository;

@Service
public class ExercicioImpl implements ExercicioService{
    @Autowired
    private ExercicioRepository exercicioRepository;

    @Override
    public Exercicio save(Exercicio exercicio) {
        return exercicioRepository.save(exercicio);
    }

    @Override
    public List<Exercicio> findAllExercicios() {
        return exercicioRepository.findAll();
    }

    @Override
    public Optional<Exercicio> findById(Long id) {
        return exercicioRepository.findById(id);
    }

    @Override
    public Exercicio update(Exercicio exercicio) {
        return exercicioRepository.save(exercicio);
    }

    @Override
    public void deleteById(Long id) {
        exercicioRepository.deleteById(id);
    }
}
