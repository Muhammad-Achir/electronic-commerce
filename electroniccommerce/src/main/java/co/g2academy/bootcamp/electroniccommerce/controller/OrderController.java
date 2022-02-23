/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.g2academy.bootcamp.electroniccommerce.controller;

import co.g2academy.bootcamp.electroniccommerce.entity.Cart;
import co.g2academy.bootcamp.electroniccommerce.entity.Order;
import co.g2academy.bootcamp.electroniccommerce.entity.OrderItem;
import co.g2academy.bootcamp.electroniccommerce.entity.Person;
import co.g2academy.bootcamp.electroniccommerce.entity.Product;
import co.g2academy.bootcamp.electroniccommerce.model.OrderList;
import co.g2academy.bootcamp.electroniccommerce.model.OrderProcessed;
import co.g2academy.bootcamp.electroniccommerce.model.RangeDate;
import co.g2academy.bootcamp.electroniccommerce.repository.CartRepository;
import co.g2academy.bootcamp.electroniccommerce.repository.OrderItemRepository;
import co.g2academy.bootcamp.electroniccommerce.repository.OrderRepository;
import co.g2academy.bootcamp.electroniccommerce.repository.PersonRepository;
import co.g2academy.bootcamp.electroniccommerce.repository.ProductRepository;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.ArrayList;
import java.security.Principal;
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
public class OrderController {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    // my order list
    @GetMapping("/order")
    public ResponseEntity<List<OrderList>> getOrders(Principal principal) {
        Person person = personRepository.findPersonByName(principal.getName());
//        Cart cart = cartRepository.findByPerson(person);

        List<Order> orders = orderRepository.findByPerson(person);

        List<OrderList> orderLists = new ArrayList<>();

        int id = 1;
        for (Order order : orders) {
            OrderItem orderItem = orderItemRepository.findByOrder(order);
            order.setPerson(null);
            OrderList orderList = new OrderList();
            orderList.setId(id);
            orderList.setOrders(order);
            orderList.setPrice(orderItem.getPrice());
            orderList.setProductName(orderItem.getProductName());
            orderList.setQuantity(orderItem.getQuantity());
            orderLists.add(orderList);
            id -= -1;
        }

        return ResponseEntity.ok(orderLists);
    }

    // user order my product
    @GetMapping("/order-processed")
    public ResponseEntity<List<OrderProcessed>> getOrderProcessed(Principal principal) {
        Person person = personRepository.findPersonByName(principal.getName());

        List<OrderProcessed> orderProcesseds = new ArrayList<>();
        List<Product> products = productRepository.findByPerson(person);

        int id = 1;
        for (Product product : products) {
            OrderItem orderItem = orderItemRepository.findByProductId(product);
            if (orderItem != null) {
                Optional<Order> orderOptional = orderRepository.findById(orderItem.getOrder().getId());
                OrderProcessed orderProcessed = new OrderProcessed();
                orderProcessed.setId(id);
                orderProcessed.setName(orderOptional.get().getPerson().getName());
                orderProcessed.setOrderDate(orderOptional.get().getOrderDate());
                orderProcessed.setPrice(orderItem.getPrice());
                orderProcessed.setProductName(orderItem.getProductName());
                orderProcessed.setQuantity(orderItem.getQuantity());
                orderProcessed.setStatus(orderOptional.get().getStatus());
                orderProcesseds.add(orderProcessed);
                id -= -1;
            }
        }

        return ResponseEntity.ok(orderProcesseds);
    }

    // user order my product list by date
    @PostMapping("/order-processed-date")
    public ResponseEntity<List<OrderProcessed>> getOrderProcessedByDate(
            @RequestBody RangeDate rangeDate, Principal principal) {
        Person person = personRepository.findPersonByName(principal.getName());

        long minCurrDate = rangeDate.getMinDate().getTime();
        long maxCurrDate = rangeDate.getMaxDate().getTime();

        List<OrderProcessed> orderProcesseds = new ArrayList<>();
        List<Product> products = productRepository.findByPerson(person);

        int id = 1;
        for (Product product : products) {
            OrderItem orderItem = orderItemRepository.findByProductId(product);
            if (orderItem != null) {
                Optional<Order> orderOptional = orderRepository.findById(orderItem.getOrder().getId());
                OrderProcessed orderProcessed = new OrderProcessed();

                long dateOP = orderOptional.get().getOrderDate().getTime();
                if ((dateOP >= minCurrDate) && (dateOP <= maxCurrDate)) {

                    orderProcessed.setId(id);
                    orderProcessed.setName(orderOptional.get().getPerson().getName());
                    orderProcessed.setOrderDate(orderOptional.get().getOrderDate());
                    orderProcessed.setPrice(orderItem.getPrice());
                    orderProcessed.setProductName(orderItem.getProductName());
                    orderProcessed.setQuantity(orderItem.getQuantity());
                    orderProcessed.setStatus(orderOptional.get().getStatus());
                    orderProcesseds.add(orderProcessed);
                    id -= -1;
                }
            }
        }

        return ResponseEntity.ok(orderProcesseds);
    }

}
