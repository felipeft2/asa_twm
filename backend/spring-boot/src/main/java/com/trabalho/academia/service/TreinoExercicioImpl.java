package com.trabalho.academia.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trabalho.academia.model.TreinoExercicio;
import com.trabalho.academia.repository.TreinoExercicioRepository;

@Service
public class TreinoExercicioImpl implements TreinoExercicioService{
    @Autowired
    private TreinoExercicioRepository treinoExercicioRepository;

    @Override
    public TreinoExercicio save(TreinoExercicio treinoExercicio) {
        return treinoExercicioRepository.save(treinoExercicio);
    }

    @Override
    public List<TreinoExercicio> findAllTreinoExercicios() {
        return treinoExercicioRepository.findAll();
    }

    @Override
    public Optional<TreinoExercicio> findById(Long id) {
        return treinoExercicioRepository.findById(id);
    }

    @Override
    public TreinoExercicio update(TreinoExercicio treinoExercicio) {
        return treinoExercicioRepository.save(treinoExercicio);
    }

    @Override
    public void deleteById(Long id) {
        treinoExercicioRepository.deleteById(id);
    }
}
