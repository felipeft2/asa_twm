package com.trabalho.academia.service;

import java.util.List;
import java.util.Optional;

import com.trabalho.academia.model.Usuario;

public interface UsuarioService {
    Usuario save (Usuario usuario);
    List<Usuario> findAllUsuarios();
    Optional<Usuario> findById(Long id);
    Usuario update(Usuario usuario);
    void deleteById(Long id);
    Optional<Usuario> findByEmail(String email);
}
