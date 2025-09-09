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

import com.trabalho.academia.model.TreinoExercicio;
import com.trabalho.academia.service.TreinoExercicioService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/TreinoExercicios")
public class TreinoExercicioController {
     @Autowired
    private TreinoExercicioService treinoExercicioService;

    @GetMapping
    public ResponseEntity<List<TreinoExercicio>> findAll(){
        return ResponseEntity.status(HttpStatus.OK).body(treinoExercicioService.findAllTreinoExercicios());
    }    

    @GetMapping("/{id}")
    public ResponseEntity<TreinoExercicio> findById(@PathVariable Long id){
        Optional<TreinoExercicio> treinoExercicio = treinoExercicioService.findById(id);
        if(treinoExercicio.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(treinoExercicio.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping
    public ResponseEntity<TreinoExercicio> create(@RequestBody TreinoExercicio treinoExercicio){
        return ResponseEntity.status(HttpStatus.CREATED).body(treinoExercicioService.save(treinoExercicio));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TreinoExercicio> update(@PathVariable Long id, @RequestBody TreinoExercicio treinoExercicio){
        Optional<TreinoExercicio> existingTreinoExercicio = treinoExercicioService.findById(id);   
        if(existingTreinoExercicio.isPresent()){
            treinoExercicio.setId(id);
            return ResponseEntity.status(HttpStatus.OK).body(treinoExercicioService.update(treinoExercicio));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        Optional<TreinoExercicio> treinoExercicio = treinoExercicioService.findById(id);
        if(treinoExercicio.isPresent()){
            treinoExercicioService.deleteById(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
