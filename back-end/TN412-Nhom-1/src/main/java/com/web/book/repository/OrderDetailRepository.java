package com.web.book.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.book.entity.OrderDetail;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
	List<OrderDetail> findByOrderId(Long id);
}