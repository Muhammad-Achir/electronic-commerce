/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package co.g2academy.bootcamp.electroniccommerce.repository;

import co.g2academy.bootcamp.electroniccommerce.entity.Order;
import co.g2academy.bootcamp.electroniccommerce.entity.OrderItem;
import co.g2academy.bootcamp.electroniccommerce.entity.Product;
import java.util.List;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author King Engine
 */
public interface OrderItemRepository extends CrudRepository<OrderItem, Integer>{
    
    public OrderItem findByOrder (Order order);
    
    public OrderItem findByProductId (Product product);
    
}
