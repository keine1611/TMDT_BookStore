package com.web.book.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.book.entity.CartItem;

public interface CartRepository extends JpaRepository<CartItem, Long> {
	List<CartItem> findByUserId(Long id);
}
