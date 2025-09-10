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

import com.trabalho.academia.model.Exercicio;
import com.trabalho.academia.service.ExercicioService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/exercicios")
public class ExercicioController {
     @Autowired
    private ExercicioService exercicioService;

    @GetMapping
    public ResponseEntity<List<Exercicio>> findAll(){
        return ResponseEntity.status(HttpStatus.OK).body(exercicioService.findAllExercicios());
    }    

    @GetMapping("/{id}")
    public ResponseEntity<Exercicio> findById(@PathVariable Long id){
        Optional<Exercicio> exercicio = exercicioService.findById(id);
        if(exercicio.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(exercicio.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping
    public ResponseEntity<Exercicio> create(@RequestBody Exercicio exercicio){
        return ResponseEntity.status(HttpStatus.CREATED).body(exercicioService.save(exercicio));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Exercicio> update(@PathVariable Long id, @RequestBody Exercicio exercicio){
        Optional<Exercicio> existingExercicio = exercicioService.findById(id);   
        if(existingExercicio.isPresent()){
            exercicio.setId(id);
            return ResponseEntity.status(HttpStatus.OK).body(exercicioService.update(exercicio));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        Optional<Exercicio> exercicio = exercicioService.findById(id);
        if(exercicio.isPresent()){
            exercicioService.deleteById(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
