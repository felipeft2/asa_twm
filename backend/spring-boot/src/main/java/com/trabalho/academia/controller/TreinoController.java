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

import com.trabalho.academia.model.Treino;
import com.trabalho.academia.service.TreinoService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/Treinos")
public class TreinoController {
     @Autowired
    private TreinoService treinoService;

    @GetMapping
    public ResponseEntity<List<Treino>> findAll(){
        return ResponseEntity.status(HttpStatus.OK).body(treinoService.findAll());
    }    

    @GetMapping("/{id}")
    public ResponseEntity<Treino> findById(@PathVariable Long id){
        Optional<Treino> treino = treinoService.findById(id);
        if(treino.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(treino.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping
    public ResponseEntity<Treino> create(@RequestBody Treino treino){
        return ResponseEntity.status(HttpStatus.CREATED).body(treinoService.save(treino));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Treino> update(@PathVariable Long id, @RequestBody Treino treino){
        Optional<Treino> existingTreino = treinoService.findById(id);   
        if(existingTreino.isPresent()){
            treino.setId(id);
            return ResponseEntity.status(HttpStatus.OK).body(treinoService.update(treino));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        Optional<Treino> treino = treinoService.findById(id);
        if(treino.isPresent()){
            treinoService.deleteById(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
