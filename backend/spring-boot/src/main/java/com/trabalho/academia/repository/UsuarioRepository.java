package com.trabalho.academia.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.trabalho.academia.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
    Optional<Usuario> findByEmail(String email);
}
