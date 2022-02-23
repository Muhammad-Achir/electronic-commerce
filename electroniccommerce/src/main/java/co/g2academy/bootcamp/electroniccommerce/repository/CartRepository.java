/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package co.g2academy.bootcamp.electroniccommerce.repository;

import co.g2academy.bootcamp.electroniccommerce.entity.Cart;
import co.g2academy.bootcamp.electroniccommerce.entity.Person;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

/**
 *
 * @author King Engine
 */
public interface CartRepository extends CrudRepository<Cart, Integer>{
    
    public Cart findByPerson (Person person);
    
    public Cart findByStatusAndPerson (String status, Person person);
    
}
