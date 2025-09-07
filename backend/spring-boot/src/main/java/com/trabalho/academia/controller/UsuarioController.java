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

import com.trabalho.academia.model.Usuario;
import com.trabalho.academia.service.UsuarioService;
import com.trabalho.academia.security.Hash;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/usuarios")
public class UsuarioController {
     @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<Usuario>> findAll(){
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.findAllUsuarios());
    }    

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> findById(@PathVariable Long id){
        Optional<Usuario> usuario = usuarioService.findById(id);
        if(usuario.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(usuario.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping("/login")
    public ResponseEntity<Usuario> findByEmail(@RequestBody Usuario usuario){
        Optional<Usuario> user = usuarioService.findByEmail(usuario.getEmail());
        String senha = Hash.passwordHash(usuario.getSenha());

        if(!user.isPresent() || !user.get().getSenha().equals(senha)){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(user.get());
    } 

    @PostMapping
    public ResponseEntity<Usuario> create(@RequestBody Usuario usuario){
        String hsh = Hash.passwordHash(usuario.getSenha());
        usuario.setSenha(hsh);
        Optional<Usuario> user = usuarioService.findByEmail(usuario.getEmail());
        if(user.isPresent())
            return ResponseEntity.status(HttpStatus.FOUND).build(); 

        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.save(usuario));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> update(@PathVariable Long id, @RequestBody Usuario usuario){
        Optional<Usuario> existingUsuario = usuarioService.findById(id);   
        if(existingUsuario.isPresent()){
            usuario.setId(id);
            return ResponseEntity.status(HttpStatus.OK).body(usuarioService.update(usuario));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        Optional<Usuario> usuario = usuarioService.findById(id);
        if(usuario.isPresent()){
            usuarioService.deleteById(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
