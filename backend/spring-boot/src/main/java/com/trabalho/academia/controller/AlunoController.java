package com.trabalho.academia.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trabalho.academia.model.Aluno;
import com.trabalho.academia.service.AlunoService;
import com.trabalho.academia.security.Hash;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/alunos")
public class AlunoController {
    @Autowired
    private AlunoService alunoService;

    @GetMapping
    public ResponseEntity<List<Aluno>> findAll(){
        return ResponseEntity.status(HttpStatus.OK).body(alunoService.findAllAlunos());
    }    

    @GetMapping("/{id}")
    public ResponseEntity<Aluno> findById(@PathVariable Long id){
        Optional<Aluno> aluno = alunoService.findById(id);
        if(aluno.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(aluno.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping
    public ResponseEntity<Aluno> create(@RequestBody Aluno aluno){
        String hsh = Hash.passwordHash(aluno.getSenha());
        aluno.setSenha(hsh);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(alunoService.save(aluno));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Aluno> update(@PathVariable Long id, @RequestBody Aluno aluno){
        Optional<Aluno> existingAluno = alunoService.findById(id);
        if(existingAluno.isPresent()){
            aluno.setId(id);
            return ResponseEntity.status(HttpStatus.OK).body(alunoService.update(aluno));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        Optional<Aluno> aluno = alunoService.findById(id);
        if(aluno.isPresent()){
            alunoService.deleteById(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
