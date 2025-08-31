package com.trabalho.academia.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trabalho.academia.model.Treinador;
import com.trabalho.academia.repository.TreinadorRepository;

@Service
public class TreinadorImpl implements TreinadorService{
    @Autowired
    private TreinadorRepository treinadorRepository;

    @Override
    public Treinador save(Treinador treinador) {
        return treinadorRepository.save(treinador);

    }

    @Override
    public List<Treinador> findAllTreinadores() {
        return treinadorRepository.findAll();
    }

    @Override
    public Optional<Treinador> findById(Long id) {
        return treinadorRepository.findById(id);
    }

    @Override
    public Treinador update(Treinador treinador) {
        return treinadorRepository.save(treinador);
    }

    @Override
    public void deleteById(Long id) {
        treinadorRepository.deleteById(id);
    }
}
