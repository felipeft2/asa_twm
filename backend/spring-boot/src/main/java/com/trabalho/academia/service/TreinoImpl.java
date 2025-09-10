package com.trabalho.academia.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.trabalho.academia.dto.TreinoDTO;
import com.trabalho.academia.model.Exercicio;
import com.trabalho.academia.model.Treino;
import com.trabalho.academia.model.TreinoExercicio;
import com.trabalho.academia.repository.TreinoRepository;

@Service
public class TreinoImpl implements TreinoService {

    //Services
    @Autowired
    private ExercicioService exercicioService;

    @Autowired
    private TreinoExercicioService treinoExercicioService;

    @Autowired
    private TreinoRepository treinoRepository;

    //Implementations
    @Override
    public List<Treino> findAll() {
        return treinoRepository.findAll();
    }

    @Override
    public Optional<Treino> findById(Long id) {
        return treinoRepository.findById(id);
    }

    @Override
    public Treino save(Treino treino) {
        return treinoRepository.save(treino);
    }

    @Override
    public void deleteById(Long id) {
        treinoRepository.deleteById(id);
    }

    @Override
    public Treino update(Treino treino) {
        return treinoRepository.save(treino);
    }

    @Override
    public TreinoDTO saveWithExercises(@RequestBody TreinoDTO treinoDTO) {
        Treino treino = new Treino();
        treino.setNome(treinoDTO.getNome());
        treino.setDescricao(treinoDTO.getDescricao());
        treinoRepository.save(treino);

        for (TreinoDTO.ExercicioDTO exDTO : treinoDTO.getExercicios()) {
            Exercicio exercicio = exercicioService.findById(exDTO.getExercicioId())
                    .orElseThrow(() -> new RuntimeException("Exercício não encontrado: " + exDTO.getExercicioId()));

            TreinoExercicio treinoExercicio = new TreinoExercicio();
            treinoExercicio.setTreino(treino);
            treinoExercicio.setExercicio(exercicio);
            treinoExercicio.setSeries(exDTO.getSeries());
            treinoExercicio.setRepeticoes(exDTO.getRepeticoes());
            treinoExercicio.setCarga(exDTO.getCarga());

            treinoExercicioService.save(treinoExercicio);
        }

        return treinoDTO;
    }

}
