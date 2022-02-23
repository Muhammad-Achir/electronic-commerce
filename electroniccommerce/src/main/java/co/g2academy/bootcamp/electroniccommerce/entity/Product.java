/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.g2academy.bootcamp.electroniccommerce.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 *
 * @author King Engine
 */
@Entity
@Table (name = "T_PRODUCT")
public class Product implements Serializable{
    
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "id")
    private Integer id;
    
    @Column (name = "name", length = 255, nullable = false)
    private String name;
    
    @Column (name = "price", nullable = false)
    private Integer price;
    
    @Column (name = "stock", nullable = false)
    private Integer stock;
    
    @Column (name = "description", length = 255, nullable = false)
    private String description;
    
    @Column (name = "art", length = 255, nullable = false)
    private String art;

    @ManyToOne
    @JoinColumn (name = "id_person", nullable = false)
    private Person person;
            
    @ManyToOne
    @JoinColumn (name = "id_category_product")
    private CategoryProduct id_category_product;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getArt() {
        return art;
    }

    public void setArt(String art) {
        this.art = art;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public CategoryProduct getId_category_product() {
        return id_category_product;
    }

    public void setId_category_product(CategoryProduct id_category_product) {
        this.id_category_product = id_category_product;
    }

    
}
