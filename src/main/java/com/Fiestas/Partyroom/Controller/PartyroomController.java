package com.Fiestas.Partyroom.Controller;

import com.Fiestas.Partyroom.Entities.Partyroom;
import com.Fiestas.Partyroom.Service.PartyroomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Partyroom")
public class PartyroomController {
    @Autowired
    private PartyroomService partyroomService;
    @GetMapping("/all")
    public List<Partyroom> getAll(){
        return partyroomService.getAll();
    }
    @GetMapping("/{id}")
    public Optional<Partyroom> getPartyroom(@PathVariable("id") Integer id){
        return partyroomService.getPartyroom(id);
    }
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Partyroom save(@RequestBody Partyroom partyroom){
        return partyroomService.save(partyroom);
    }
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Partyroom update(@RequestBody Partyroom partyroom){ return partyroomService.update(partyroom);}
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") Integer id){ return partyroomService.delete(id);}
}
