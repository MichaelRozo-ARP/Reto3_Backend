package com.Fiestas.Partyroom.Service;

import com.Fiestas.Partyroom.Entities.Admin;
import com.Fiestas.Partyroom.Repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public List<Admin> getAll(){
        return adminRepository.getAll();
    }
    public Optional<Admin> getAdmin(Integer id){
        return adminRepository.getAdmin(id);
    }
    public Admin save(Admin admin){
        if(admin.getIdAdmin()==null){
            return adminRepository.save(admin);
        }else{
            Optional<Admin> e = adminRepository.getAdmin(admin.getIdAdmin());
            if(e.isPresent()){
                return admin;
            }else{
                return adminRepository.save(admin);
            }
        }
    }
    public Admin update(Admin admin){
        if(admin.getIdAdmin()!=null){
            Optional<Admin> q = adminRepository.getAdmin(admin.getIdAdmin());
            if(q.isPresent()){
                if(admin.getName()!=null){
                    q.get().setName(admin.getName());
                }if(admin.getEmail()!=null){
                    q.get().setEmail(admin.getEmail());
                }if(admin.getPassword()!=null){
                    q.get().setPassword(admin.getPassword());
                }
                adminRepository.save(q.get());
                return q.get();
            }else{
                return admin;
            }
        }else{
            return admin;
        }
    }
    public boolean delete(Integer id){
        boolean flag=false;
        Optional<Admin> admin= adminRepository.getAdmin(id);
        if(admin.isPresent()){
            adminRepository.delete(admin.get());
            flag=true;
        }
        return flag;

    }
}
