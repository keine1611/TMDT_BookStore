package com.web.book.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.book.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
	
	List<Order> findByUserId(Long id);

}
