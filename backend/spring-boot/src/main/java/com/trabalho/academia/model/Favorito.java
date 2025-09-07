package com.trabalho.academia.model;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Data 
@Entity
public class Favorito {
    //@Id
    //@GeneratedValue(strategy=GenerationType.IDENTITY)
    @EmbeddedId
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("usuarioId")
    @JoinColumn(name = "usuarioId")
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("treinoId")
    @JoinColumn(name = "treinoId")
    private Treino treino;

    @Column(name="data")
    @Temporal(TemporalType.DATE)
    private Date data;
}
