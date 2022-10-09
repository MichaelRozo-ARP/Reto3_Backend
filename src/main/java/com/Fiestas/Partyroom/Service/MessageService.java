package com.Fiestas.Partyroom.Service;

import com.Fiestas.Partyroom.Entities.Message;
import com.Fiestas.Partyroom.Repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;
    public List<Message> getAll(){
        return messageRepository.getAll();
    }
    public Optional<Message> getMessage(Integer id){
        return messageRepository.getMessage(id);
    }
    public Message save(Message message){
        if(message.getIdMessage()==null){
            return messageRepository.save(message);
        }else{
            Optional<Message> e = messageRepository.getMessage(message.getIdMessage());
            if(e.isPresent()){
                return message;
            }else{
                return messageRepository.save(message);
            }
        }
    }
    public Message update(Message message){
        if(message.getIdMessage()!=null){
            Optional<Message> q = messageRepository.getMessage(message.getIdMessage());
            if(q.isPresent()){
                if(message.getMessageText()!=null){
                    q.get().setMessageText(message.getMessageText());
                }
                messageRepository.save(q.get());
                return q.get();
            }else{
                return message;
            }
        }else{
            return message;
        }
    }
    public boolean delete(Integer id){
        boolean flag=false;
        Optional<Message> message= messageRepository.getMessage(id);
        if(message.isPresent()){
            messageRepository.delete(message.get());
            flag=true;
        }
        return flag;
    }
}
