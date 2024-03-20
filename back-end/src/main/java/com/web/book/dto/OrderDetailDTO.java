package com.web.book.dto;

public class OrderDetailDTO {
	private int quantity;
	private Long book_id;
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public Long getBook_id() {
		return book_id;
	}
	public void setBook_id(Long book_id) {
		this.book_id = book_id;
	}
	public OrderDetailDTO(int quantity, Long book_id) {
		super();
		this.quantity = quantity;
		this.book_id = book_id;
	}
	public OrderDetailDTO() {
		super();
	}
	
}
