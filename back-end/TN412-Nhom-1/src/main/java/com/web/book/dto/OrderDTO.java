package com.web.book.dto;

public class OrderDTO {
	
	private Integer book_cost;
	private Integer ship_cost;
	private Integer subtotal;
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
	public OrderDTO(Integer book_cost, Integer ship_cost, Integer subtotal) {
		super();
		this.book_cost = book_cost;
		this.ship_cost = ship_cost;
		this.subtotal = subtotal;
	}
	public OrderDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

}

