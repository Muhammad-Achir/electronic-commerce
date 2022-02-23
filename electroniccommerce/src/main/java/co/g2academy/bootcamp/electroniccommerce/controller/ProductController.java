/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.g2academy.bootcamp.electroniccommerce.controller;

import co.g2academy.bootcamp.electroniccommerce.entity.CategoryProduct;
import co.g2academy.bootcamp.electroniccommerce.entity.Person;
import co.g2academy.bootcamp.electroniccommerce.entity.Product;
import co.g2academy.bootcamp.electroniccommerce.repository.CategoryProductRepository;
import co.g2academy.bootcamp.electroniccommerce.repository.PersonRepository;
import co.g2academy.bootcamp.electroniccommerce.repository.ProductRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.security.Principal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author King Engine
 */
@RestController
@RequestMapping("/api")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private CategoryProductRepository categoryProductRepository;

    @GetMapping("/product")
    public ResponseEntity<List<Product>> getProducts(Principal principal) {

        Person person = personRepository.findPersonByName(principal.getName());
//        Iterable<Product> products = productRepository.findAll();
        List<Product> products = productRepository.findByPerson(person);
        for (Product product : products) {
            product.setPerson(null);
        }

        return ResponseEntity.ok(products);
    }

    @GetMapping("/product/{id_product}")
    public ResponseEntity<Product> getProductById(
            @PathVariable("id_product") Integer id_product, Principal principal) {
//        Optional<Product> productOptional = productRepository.findById(id);
        Person person = personRepository.findPersonByName(principal.getName());
        Product product = productRepository.findByIdAndPerson(id_product, person);
        product.setPerson(null);
        return ResponseEntity.ok(product);
    }

    @PostMapping("/product")
    public ResponseEntity<String> save(
            @RequestBody Product product, Principal principal) {
        Person person = personRepository.findPersonByName(principal.getName());
        product.setPerson(person);

        if (product.getId_category_product() != null) {
            CategoryProduct categoryProduct = categoryProductRepository.findByCategory(product.getId_category_product().getCategory());
            if (categoryProduct != null) {
                product.setId_category_product(categoryProduct);
            } else {
                categoryProductRepository.save(product.getId_category_product());
            }
        } else {
            categoryProductRepository.save(product.getId_category_product());
        }
        productRepository.save(product);
        return ResponseEntity.ok("ok");
    }
    
    @DeleteMapping ("/product/{id}")
    public ResponseEntity <String> delete (
        @PathVariable Integer id, Principal principal) {
        Person person = personRepository.findPersonByName(principal.getName());
        Product productToDelete = productRepository.findByIdAndPerson(id, person);
        if (productToDelete != null) {
            productRepository.deleteById(id);
            return ResponseEntity.ok("Ok");
        }
        return ResponseEntity.ok("Product not found");
    }
}
