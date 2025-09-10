package com.trabalho.academia.dto;

import java.util.List;

import lombok.Data;

@Data
public class TreinoDTO {
    private String nome;
    private String descricao;
    private List<ExercicioDTO> exercicios;

    @Data
    public static class ExercicioDTO {
        private Long exercicioId;
        private Long series;
        private Long repeticoes;
        private Long carga;
    }
}
