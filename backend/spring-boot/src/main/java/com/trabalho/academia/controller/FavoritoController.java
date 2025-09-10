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

import com.trabalho.academia.model.Favorito;
import com.trabalho.academia.service.FavoritoService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/favoritos")
public class FavoritoController {
    @Autowired
    private FavoritoService favoritoService;

    @GetMapping
    public ResponseEntity<List<Favorito>> findAll(){
        return ResponseEntity.status(HttpStatus.OK).body(favoritoService.findAllFavoritos());
    }    

    @GetMapping("/{id}")
    public ResponseEntity<Favorito> findById(@PathVariable Long id){
        Optional<Favorito> favorito = favoritoService.findById(id);
        if(favorito.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(favorito.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping
    public ResponseEntity<Favorito> create(@RequestBody Favorito favorito){
        return ResponseEntity.status(HttpStatus.CREATED).body(favoritoService.save(favorito));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Favorito> update(@PathVariable Long id, @RequestBody Favorito Favorito){
        Optional<Favorito> existingFavorito = favoritoService.findById(id);   
        if(existingFavorito.isPresent()){
            Favorito.setId(id);
            return ResponseEntity.status(HttpStatus.OK).body(favoritoService.update(Favorito));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        Optional<Favorito> favorito = favoritoService.findById(id);
        if(favorito.isPresent()){
            favoritoService.deleteById(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
