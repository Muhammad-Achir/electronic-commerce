/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package co.g2academy.bootcamp.electroniccommerce.repository;

import co.g2academy.bootcamp.electroniccommerce.entity.CategoryProduct;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author King Engine
 */
public interface CategoryProductRepository extends CrudRepository<CategoryProduct, Integer>{
    
    public CategoryProduct findByCategory (String category);
    
}
