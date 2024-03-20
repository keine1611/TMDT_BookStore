package com.web.book.dto;

import java.util.List;

public class OrderDTOReact {
	private Integer book_cost;
	private Integer ship_cost;
	private Integer subtotal;
	private String status;
	public OrderDTOReact(Integer book_cost, Integer ship_cost, Integer subtotal, String status,
			List<OrderDetailsInOrderDTO> orderDetails) {
		super();
		this.book_cost = book_cost;
		this.ship_cost = ship_cost;
		this.subtotal = subtotal;
		this.status = status;
		this.orderDetails = orderDetails;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	private List<OrderDetailsInOrderDTO> orderDetails;
	public Integer getBook_cost() {
		return book_cost;
	}
	public void setBook_cost(Integer book_cost) {
		this.book_cost = book_cost;
	}
	public Integer getShip_cost() {
		return ship_cost;
	}
	public void setShip_cost(Integer ship_cost) {
		this.ship_cost = ship_cost;
	}
	public Integer getSubtotal() {
		return subtotal;
	}
	public void setSubtotal(Integer subtotal) {
		this.subtotal = subtotal;
	}
	public List<OrderDetailsInOrderDTO> getOrderDetails() {
		return orderDetails;
	}
	public void setOrderDetails(List<OrderDetailsInOrderDTO> orderDetails) {
		this.orderDetails = orderDetails;
	}
	public OrderDTOReact() {
		super();
		// TODO Auto-generated constructor stub
	}
	public OrderDTOReact(Integer book_cost, Integer ship_cost, Integer subtotal,
			List<OrderDetailsInOrderDTO> orderDetails) {
		super();
		this.book_cost = book_cost;
		this.ship_cost = ship_cost;
		this.subtotal = subtotal;
		this.orderDetails = orderDetails;
	}
	
	
	
}
