package com.web.book.dto;

public class CartDTO {
	private Integer cart_item_quantity;
	private Long book_id;
	public Integer getCart_item_quantity() {
		return cart_item_quantity;
	}
	public void setCart_item_quantity(Integer cart_item_quantity) {
		this.cart_item_quantity = cart_item_quantity;
	}
	public Long getBook_id() {
		return book_id;
	}
	public void setBook_id(Long book_id) {
		this.book_id = book_id;
	}
	public CartDTO(Integer cart_item_quantity, Long book_id) {
		super();
		this.cart_item_quantity = cart_item_quantity;
		this.book_id = book_id;
	}
	public CartDTO() {
		super();
	}
	
}
