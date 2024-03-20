package com.web.book.dto;

public class CartAPIDTO {
	private Integer cart_item_quantity;
	private BookDTOReact book;
	private boolean selected;
	public Integer getCart_item_quantity() {
		return cart_item_quantity;
	}
	public void setCart_item_quantity(Integer cart_item_quantity) {
		this.cart_item_quantity = cart_item_quantity;
	}
	public BookDTOReact getBook() {
		return book;
	}
	public void setBook(BookDTOReact book) {
		this.book = book;
	}
	public boolean isSelected() {
		return selected;
	}
	public void setSelected(boolean selected) {
		this.selected = selected;
	}
	public CartAPIDTO(Integer cart_item_quantity, BookDTOReact book, boolean selected) {
		super();
		this.cart_item_quantity = cart_item_quantity;
		this.book = book;
		this.selected = selected;
	}
	public CartAPIDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
}
