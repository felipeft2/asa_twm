package com.trabalho.academia.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trabalho.academia.model.Treinador;
import com.trabalho.academia.service.TreinadorService;
import com.trabalho.academia.security.Hash;

@RestController
@RequestMapping("/api/v1/treinador")
public class TreinadorController {
    @Autowired
    private TreinadorService treinadorService;

    @GetMapping
    public ResponseEntity<List<Treinador>> findAll(){
        return ResponseEntity.status(HttpStatus.OK).body(treinadorService.findAllTreinadores());
    }    

    @GetMapping("/{id}")
    public ResponseEntity<Treinador> findById(@PathVariable Long id){
        Optional<Treinador> treinador = treinadorService.findById(id);
        if(treinador.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(treinador.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping
    public ResponseEntity<Treinador> create(@RequestBody Treinador treinador){
        String hsh = Hash.passwordHash(treinador.getSenha());
        treinador.setSenha(hsh);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(treinadorService.save(treinador));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Treinador> update(@PathVariable Long id, @RequestBody Treinador treinador){
        Optional<Treinador> existingTreinador = treinadorService.findById(id);
        if(existingTreinador.isPresent()){
            treinador.setId(id);
            return ResponseEntity.status(HttpStatus.OK).body(treinadorService.update(treinador));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        Optional<Treinador> treinador = treinadorService.findById(id);
        if(treinador.isPresent()){
            treinadorService.deleteById(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
