package com.Fiestas.Partyroom.Service;

import com.Fiestas.Partyroom.Entities.Score;
import com.Fiestas.Partyroom.Repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScoreService {

    @Autowired
    private ScoreRepository scoreRepository;

    public List<Score> getAll(){
        return scoreRepository.getAll();
    }
    public Optional<Score> getScore(Integer id){
        return scoreRepository.getScore(id);
    }

    public Score save(Score score){
        if(score.getIdScore()==null){
            return scoreRepository.save(score);
        }else{
            Optional<Score> e = scoreRepository.getScore(score.getIdScore());
            if(e.isPresent()){
                return score;
            }else{
                return scoreRepository.save(score);
            }
        }
    }

    public Score update(Score score){
        if(score.getIdScore()!=null){
            Optional<Score> q = scoreRepository.getScore(score.getIdScore());
            if(q.isPresent()){
                if(score.getMessageText()!= null){
                    q.get().setMessageText(score.getMessageText());
                }
                if(score.getStars()!= null){
                    q.get().setStars(score.getStars());
                }
                if(score.getReservation()!= null){
                    q.get().setReservation(score.getReservation());
                }
                scoreRepository.save(q.get());
                return q.get();
            }else{
                return score;
            }
        }else{
            return score;
        }
    }

    public boolean delete(Integer id){
        boolean flag=false;
        Optional<Score> score= scoreRepository.getScore(id);
        if(score.isPresent()){
            scoreRepository.delete(score.get());
            flag=true;
        }
        return flag;
    }

}

