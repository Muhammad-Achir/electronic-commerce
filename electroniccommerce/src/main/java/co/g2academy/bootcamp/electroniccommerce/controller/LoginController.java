/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.g2academy.bootcamp.electroniccommerce.controller;

import co.g2academy.bootcamp.electroniccommerce.entity.Person;
import co.g2academy.bootcamp.electroniccommerce.model.LoginModel;
import co.g2academy.bootcamp.electroniccommerce.repository.PersonRepository;
import co.g2academy.bootcamp.electroniccommerce.security.JwtTokenUtil;
import co.g2academy.bootcamp.electroniccommerce.security.JwtUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author King Engine
 */
@RestController
@RequestMapping ("/api")
public class LoginController {
    
    @Autowired
    private PersonRepository personRepository;
    
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    
    @Autowired
    private JwtUserDetailService userDetailService;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @PostMapping("/login")
    public ResponseEntity<LoginModel> login (@RequestBody Person login)
            throws Exception{
        authenticate(login.getName(), login.getPassword());
        UserDetails userDetails = userDetailService.loadUserByUsername(login.getName());
        String token = jwtTokenUtil.generateToken(userDetails);
        
        LoginModel loginModel = new LoginModel();
        loginModel.setName(userDetails.getUsername());
        loginModel.setToken(token);
        
        return ResponseEntity.ok(loginModel);
    }
    
    private void authenticate(String userName, String password) throws Exception{
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userName, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLE", e);
        }catch(BadCredentialsException e){
            throw new Exception("INVALID_CREDENTIAL", e);
        }
            
    }
    
}
