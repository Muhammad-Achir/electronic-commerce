/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package co.g2academy.bootcamp.electroniccommerce.repository;

import co.g2academy.bootcamp.electroniccommerce.entity.Cart;
import co.g2academy.bootcamp.electroniccommerce.entity.CartItem;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
/**
 *
 * @author King Engine
 */
public interface CartItemRepository extends CrudRepository<CartItem, Integer>{
    
    public List <CartItem> findByCart (Cart cart);
    
}
