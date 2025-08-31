package com.trabalho.academia.model;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Embeddable;

@Embeddable
public class TreinoExercicioId implements Serializable {
    private Long idTreino;
    private Long idExercicio;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TreinoExercicioId)) return false;
        TreinoExercicioId that = (TreinoExercicioId) o;
        return Objects.equals(idTreino, that.idTreino) &&
               Objects.equals(idExercicio, that.idExercicio);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idTreino, idExercicio);
    }
}
