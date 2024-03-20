package com.web.book.apicontroller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.web.book.dto.BookDTOReact;
import com.web.book.dto.OrderDTO;
import com.web.book.dto.OrderDTOReact;
import com.web.book.dto.OrderDetailDTO;
import com.web.book.dto.OrderDetailsInOrderDTO;
import com.web.book.entity.Book;
import com.web.book.entity.Order;
import com.web.book.entity.OrderDetail;
import com.web.book.entity.User;
import com.web.book.repository.BookRepository;
import com.web.book.repository.OrderDetailRepository;
import com.web.book.repository.OrderRepository;
import com.web.book.repository.UserEntityRepository;


@RestController
@RequestMapping("/api/order")
public class OrderController {
	
	@Autowired
	private OrderRepository orderRepos;
	
	@Autowired
	private UserEntityRepository userEntityRepos;
	@Autowired
	private OrderDetailRepository orderDetailRepository;
	
	@Autowired
	private BookRepository bookRepository;
	
	@PostMapping("/{id}")
	private ResponseEntity<?> orderBook (@PathVariable("id") Long user_id, @RequestParam("book_cost") int book_cost,
			@RequestParam("ship_cost") int ship_cost, @RequestParam("subtotal") int subtotal) {
		User orderUser = userEntityRepos.findById(user_id).orElseThrow(() -> new IllegalArgumentException("User Not Found"));
		Order neworOrder = new Order();
		neworOrder.setBook_cost(book_cost);
		neworOrder.setShip_cost(ship_cost);
		neworOrder.setSubtotal(subtotal);
		neworOrder.setUser(orderUser);
		neworOrder.setStatus("PENDING");
		orderRepos.save(neworOrder);
		return ResponseEntity.ok(neworOrder);
	}
	
	@GetMapping("/{id}")
	private ResponseEntity<?> getOrderUser (@PathVariable("id") Long user_id) {
		List<Order> orderList = orderRepos.findByUserId(user_id);
		List<OrderDTOReact> orderDTOs = new ArrayList<>();
		for(Order order : orderList) {
			OrderDTOReact orderDTOReact = new OrderDTOReact();
			orderDTOReact.setBook_cost(order.getBook_cost());
			orderDTOReact.setShip_cost(order.getShip_cost());
			orderDTOReact.setSubtotal(order.getSubtotal());
			orderDTOReact.setStatus(order.getStatus());
			List<OrderDetailsInOrderDTO> lisstDetailsInOrderDTOs = new ArrayList<>();
			List<OrderDetail> listOrderDetails = orderDetailRepository.findByOrderId(order.getId());
			for(OrderDetail orderDetail:  listOrderDetails) {
				OrderDetailsInOrderDTO orderDetailsInOrderDTO = new OrderDetailsInOrderDTO();
				BookDTOReact bookDTOReact = bookRepository.getBookById(orderDetail.getBook().getId()).orElseThrow();
				orderDetailsInOrderDTO.setBook(bookDTOReact);
				orderDetailsInOrderDTO.setQuantity(orderDetail.getQuantity());
				lisstDetailsInOrderDTOs.add(orderDetailsInOrderDTO);
			}
			orderDTOReact.setOrderDetails(lisstDetailsInOrderDTOs);
			orderDTOs.add(orderDTOReact);
		}
		return ResponseEntity.ok(orderDTOs);
	}
	
}
