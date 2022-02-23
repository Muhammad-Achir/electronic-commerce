/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.g2academy.bootcamp.electroniccommerce.controller;

import co.g2academy.bootcamp.electroniccommerce.entity.Cart;
import co.g2academy.bootcamp.electroniccommerce.entity.CartItem;
import co.g2academy.bootcamp.electroniccommerce.entity.Order;
import co.g2academy.bootcamp.electroniccommerce.entity.OrderItem;
import co.g2academy.bootcamp.electroniccommerce.entity.Person;
import co.g2academy.bootcamp.electroniccommerce.entity.Product;
import co.g2academy.bootcamp.electroniccommerce.model.AddToCart;
import co.g2academy.bootcamp.electroniccommerce.repository.CartItemRepository;
import co.g2academy.bootcamp.electroniccommerce.repository.CartRepository;
import co.g2academy.bootcamp.electroniccommerce.repository.OrderItemRepository;
import co.g2academy.bootcamp.electroniccommerce.repository.OrderRepository;
import co.g2academy.bootcamp.electroniccommerce.repository.PersonRepository;
import co.g2academy.bootcamp.electroniccommerce.repository.ProductRepository;
import java.security.Principal;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
public class CartAndCheckOutController {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @GetMapping("/cart")
    public ResponseEntity<Cart> getShoppingCart(Principal principal) {
        Person person = personRepository.findPersonByName(principal.getName());
        Cart cart = cartRepository.findByStatusAndPerson("ACTIVE", person);
        if (cart != null) {
            cart.setPerson(null);
            for (CartItem cartItem : cart.getCartItems()) {
                cartItem.setCart(null);
                cartItem.getProduct().setPerson(null);
            }
        }
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/add-to-cart")
    public ResponseEntity<String> addToCart(
            @RequestBody AddToCart addToCart, Principal principal) {
        Person person = personRepository.findPersonByName(principal.getName());
        Optional<Product> productOptional
                = productRepository.findById(addToCart.getProductId());

        // check stock
        Iterable<Product> products = productRepository.findAll();
        for (Product product : products) {
            if (product.getId() == addToCart.getProductId()) {
                if (addToCart.getQuantity() > product.getStock()) {
                    return ResponseEntity.ok("Not enough product");
                }
            }
        }
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            Cart cart = cartRepository.findByStatusAndPerson("ACTIVE", person);
            if (cart == null) {
                cart = new Cart();
                cart.setPerson(person);
                cart.setStatus("ACTIVE");
                cart.setTransactionDate(new Date());
                cartRepository.save(cart);
                cart = cartRepository.findByStatusAndPerson("ACTIVE", person);
            }

            //avoid double cart item with same product
            //if same product sent to add cart then sum the quantity
            boolean isProductExist = false;
            if (cart.getCartItems() != null) {
                for (CartItem cartItem : cart.getCartItems()) {
                    if (cartItem.getProduct().getId().equals(addToCart.getProductId())) {
                        cartItem.setQuantity(cartItem.getQuantity() + addToCart.getQuantity());
                        cartItemRepository.save(cartItem);
                        isProductExist = true;
                        break;
                    }
                }
            }
            if (!isProductExist) {
                CartItem cartItem = new CartItem();
                cartItem.setCart(cart);
                cartItem.setPrice(product.getPrice() * addToCart.getQuantity());
                cartItem.setQuantity(addToCart.getQuantity());
                cartItem.setProduct(product);
                cartItemRepository.save(cartItem);
            }
            return ResponseEntity.ok("ok");
        }
        return ResponseEntity.ok("Product not found");
    }

    @PostMapping("/checkout")
    public ResponseEntity<String> checkout(Principal principal) {
        Person person = personRepository.findPersonByName(principal.getName());
        Cart cart = cartRepository.findByStatusAndPerson("ACTIVE", person);
        List<CartItem> cartItems = cartItemRepository.findByCart(cart);

        for (CartItem cartItem : cartItems) {

            if (cart != null) {
                cart.setStatus("PROCESSED");
                cartRepository.save(cart);

                Order order = new Order();
                order.setCartId(cart.getId());
                order.setPerson(person);
                order.setOrderDate(cart.getTransactionDate());
                order.setStatus(cart.getStatus());
                orderRepository.save(order);

                OrderItem orderItem = new OrderItem();
                orderItem.setOrder(order);
                orderItem.setPrice(cartItem.getPrice());
                orderItem.setProductId(cartItem.getProduct());
                orderItem.setProductName(cartItem.getProduct().getName());
                orderItem.setQuantity(cartItem.getQuantity());
                orderItemRepository.save(orderItem);

                //send to order
//            Order order = new Order();
//            order.setCartId(cart);
//            order.setOrderDate(cart.getTransactionDate());
//            order.setPerson(person);
//            order.setStatus(cart.getStatus());
//            
//            OrderItem orderItem = new OrderItem();
//            orderItem.setOrder(order);
//            orderItem.setProductId(cart.get);
            }
        }
        return ResponseEntity.ok("ok");
    }
}
