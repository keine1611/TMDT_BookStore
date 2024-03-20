package com.web.book.dto;

public class OrderDetailsInOrderDTO {
	private Integer quantity;
	private BookDTOReact book;
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	public BookDTOReact getBook() {
		return book;
	}
	public void setBook(BookDTOReact book) {
		this.book = book;
	}
	public OrderDetailsInOrderDTO(Integer quantity, BookDTOReact book) {
		super();
		this.quantity = quantity;
		this.book = book;
	}
	public OrderDetailsInOrderDTO() {
		super();
	}
	
}
