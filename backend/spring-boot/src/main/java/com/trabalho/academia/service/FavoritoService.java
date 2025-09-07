package com.trabalho.academia.service;

import java.util.List;
import java.util.Optional;

import com.trabalho.academia.model.Favorito;

public interface FavoritoService {
    Favorito save (Favorito usuario);
    List<Favorito> findAllFavoritos();
    Optional<Favorito> findById(Long id);
    Favorito update(Favorito usuario);
    void deleteById(Long id);
}
