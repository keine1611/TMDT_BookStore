package com.web.book.apicontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.web.book.dto.OrderDetailDTO;
import com.web.book.entity.Book;
import com.web.book.entity.Order;
import com.web.book.entity.OrderDetail;
import com.web.book.repository.BookRepository;
import com.web.book.repository.OrderDetailRepository;
import com.web.book.repository.OrderRepository;

@RestController
@RequestMapping("/api/orderdetail")
public class OrderDetailController {
	@Autowired
	OrderDetailRepository orderDetailRepository;
	
	@Autowired
	OrderRepository orderRepository;
	
	@Autowired
	BookRepository bookRepository;

	@PostMapping("/{id}")
	private ResponseEntity<?> addOrderDetail(@PathVariable("id") Long order_id,
			@RequestBody List<OrderDetailDTO> listOrderDetails) {
		HttpHeaders headers = new HttpHeaders();
		headers.add("Custom-Header", "header-value");
		try {
			Order order = orderRepository.findById(order_id).orElseThrow();
			for (OrderDetailDTO ord : listOrderDetails) {
				Book book = bookRepository.findById(ord.getBook_id()).orElseThrow();
				OrderDetail orderDetail = new OrderDetail();
				orderDetail.setOrder(order);
				orderDetail.setQuantity(ord.getQuantity());
				orderDetail.setBook(book);
				orderDetailRepository.save(orderDetail);
			}	
			
		} catch (Exception e) {
			return new ResponseEntity<>("error", headers, HttpStatus.BAD_REQUEST);
		}
		return ResponseEntity.ok("success");
		
	}

}
