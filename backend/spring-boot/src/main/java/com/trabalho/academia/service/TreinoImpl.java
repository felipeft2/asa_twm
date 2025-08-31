package com.trabalho.academia.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trabalho.academia.model.Treino;
import com.trabalho.academia.repository.TreinoRepository;

@Service
public class TreinoImpl implements TreinoService {

    @Autowired
    private TreinoRepository treinoRepository;

    @Override
    public List<Treino> findAll() {
        return treinoRepository.findAll();
    }

    @Override
    public Optional<Treino> findById(Long id) {
        return treinoRepository.findById(id);
    }

    @Override
    public Treino save(Treino treino) {
        return treinoRepository.save(treino);
    }

    @Override
    public void deleteById(Long id) {
        treinoRepository.deleteById(id);
    }

    @Override
    public Treino update(Treino treino) {
        return treinoRepository.save(treino);
    }

}
