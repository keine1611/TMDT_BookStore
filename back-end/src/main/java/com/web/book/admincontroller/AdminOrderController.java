package com.web.book.admincontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.web.book.entity.Order;
import com.web.book.entity.OrderDetail;
import com.web.book.repository.OrderDetailRepository;
import com.web.book.repository.OrderRepository;




@Controller
@RequestMapping("/admin")
public class AdminOrderController {
	
	@Autowired
	private OrderRepository orderRepos;
	
	@Autowired
	private OrderDetailRepository orderDetailRepos;
	
	@GetMapping("/order/list-orders")
	private String getListOrder (Model model) {	
		List<Order> listOrders = orderRepos.findAll();
		model.addAttribute("listorders",listOrders);
		return "/admin/order/listorders";
	}
	
	@GetMapping("/order/detail/{id}")
	public String getOrderDetail (@PathVariable("id") Long id_order, Model model) {
		OrderDetail orderDetail = orderDetailRepos.findById(id_order).orElseThrow();
		model.addAttribute(orderDetail);
		return "/admin/order/orderdetail";
	}
}
