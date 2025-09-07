package com.trabalho.academia.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trabalho.academia.model.Favorito;
import com.trabalho.academia.repository.FavoritoRepository;

@Service
public class FavoritoImpl implements FavoritoService{
    @Autowired
    private FavoritoRepository favoritoRepository;

    @Override
    public Favorito save(Favorito favorito) {
        return favoritoRepository.save(favorito);
    }

    @Override
    public List<Favorito> findAllFavoritos() {
        return favoritoRepository.findAll();
    }

    @Override
    public Optional<Favorito> findById(Long id) {
        return favoritoRepository.findById(id);
    }

    @Override
    public Favorito update(Favorito Favorito) {
        return favoritoRepository.save(Favorito);
    }

    @Override
    public void deleteById(Long id) {
        favoritoRepository.deleteById(id);
    }
}
