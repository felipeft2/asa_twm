package com.trabalho.academia.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trabalho.academia.model.Aluno;
import com.trabalho.academia.repository.AlunoRepository;

@Service
public class AlunoImpl implements AlunoService{
    @Autowired
    private AlunoRepository alunoRepository;

    @Override
    public Aluno save(Aluno aluno) {
        return alunoRepository.save(aluno);

    }

    @Override
    public List<Aluno> findAllAlunos() {
        return alunoRepository.findAll();
    }

    @Override
    public Optional<Aluno> findById(Long id) {
        return alunoRepository.findById(id);
    }

    @Override
    public Aluno update(Aluno aluno) {
        return alunoRepository.save(aluno);
    }

    @Override
    public void deleteById(Long id) {
        alunoRepository.deleteById(id);
    }
}
