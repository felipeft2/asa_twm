package com.trabalho.academia.service;

import java.util.List;
import java.util.Optional;
import com.trabalho.academia.model.Aluno;

public interface AlunoService {
    Aluno save (Aluno aluno);
    List<Aluno> findAllAlunos();
    Optional<Aluno> findById(Long id);
    Aluno update(Aluno aluno);
    void deleteById(Long id);   
}
