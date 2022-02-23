/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.g2academy.bootcamp.electroniccommerce.controller;

import co.g2academy.bootcamp.electroniccommerce.entity.CategoryProduct;
import co.g2academy.bootcamp.electroniccommerce.entity.Product;
import co.g2academy.bootcamp.electroniccommerce.repository.ProductRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author King Engine
 */
@RestController
@RequestMapping ("/api")
public class ProductSearchController {
    
    @Autowired
    private ProductRepository productRepository;
    
    @GetMapping("/search")
    public ResponseEntity<List<Product>> search(
            //                    @PathVariable String q,
            @RequestParam String q,
            @RequestParam Integer size,
            @RequestParam Integer page,
            @RequestParam String sort) {
        Pageable pageable = composePageable(page, size, sort);
        List<Product> products = productRepository.findByNameContains(q, pageable);
        
        return ResponseEntity.ok(products);
    }
    
    public Pageable composePageable(Integer page, Integer size, String sort) {
        // sort can only have 3 possible value: PRICE_ASC, PRICE_DESC, TITLE
        if ("PRICE_DESC".equals(sort)) {
            Sort sortByPriceDes = Sort.by(Sort.Direction.DESC, "price");
            return PageRequest.of(page, size, sortByPriceDes);
        } else if ("PRICE_ASC".equals(sort)) {
            Sort sortByPriceAsc = Sort.by(Sort.Direction.ASC, "price");
            return PageRequest.of(page, size, sortByPriceAsc);

        }
        Sort sortByName = Sort.by("name");
        return PageRequest.of(page, size, sortByName);

    }
}
