package com.Fiestas.Partyroom.Service;

import com.Fiestas.Partyroom.Entities.Partyroom;
import com.Fiestas.Partyroom.Repository.PartyroomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PartyroomService {
    @Autowired
    private PartyroomRepository partyroomRepository;
    public List<Partyroom> getAll(){
        return partyroomRepository.getAll();
    }
    public Optional<Partyroom> getPartyroom(Integer id){
        return partyroomRepository.getPartyroom(id);
    }
    public Partyroom save(Partyroom partyroom){
        if(partyroom.getId()==null){
            return partyroomRepository.save(partyroom);
        }else{
            Optional<Partyroom> e = partyroomRepository.getPartyroom(partyroom.getId());
            if(e.isPresent()){
                return partyroom;
            }else{
                return partyroomRepository.save(partyroom);
            }
        }
    }
    public Partyroom update(Partyroom partyroom){
        if(partyroom.getId()!=null){
            Optional<Partyroom> q = partyroomRepository.getPartyroom(partyroom.getId());
            if(q.isPresent()){
                if(partyroom.getName()!=null){
                    q.get().setName(partyroom.getName());
                }
                if(partyroom.getDescription()!=null){
                    q.get().setDescription(partyroom.getDescription());
                }
                if(partyroom.getOwner()!=null){
                    q.get().setOwner(partyroom.getOwner());
                }
                if(partyroom.getCategory()!=null){
                    q.get().setCategory(partyroom.getCategory());
                }
                if(partyroom.getCapacity()!=null){
                    q.get().setCapacity(partyroom.getCapacity());
                }
                partyroomRepository.save(q.get());
                return q.get();
            }else{
                return partyroom;
            }
        }else{
            return partyroom;
        }
    }
    public boolean delete(Integer id){
        boolean flag=false;
        Optional<Partyroom> partyroom= partyroomRepository.getPartyroom(id);
        if(partyroom.isPresent()){
            partyroomRepository.delete(partyroom.get());
            flag=true;
        }
        return flag;
    }
}
