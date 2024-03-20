package com.web.book.dto;

import com.web.book.entity.Author;
import com.web.book.entity.Category;
import com.web.book.entity.Publisher;

public class BookInitDTO {

	private String book_name;

	private Integer book_price;

	private Integer book_quantity;

	private String book_lang;

	private String book_description;
	
	private String book_image;
	
	private Long author_id;

	private Long category_id;
	
	private Long publisher_id;

	public BookInitDTO(String book_name, Integer book_price, Integer book_quantity, String book_lang,
			String book_description, String book_image, Long author_id, Long category_id, Long publisher_id) {
		super();
		this.book_name = book_name;
		this.book_price = book_price;
		this.book_quantity = book_quantity;
		this.book_lang = book_lang;
		this.book_description = book_description;
		this.book_image = book_image;
		this.author_id = author_id;
		this.category_id = category_id;
		this.publisher_id = publisher_id;
	}

	public BookInitDTO() {
		super();
	}

	public String getBook_name() {
		return book_name;
	}

	public void setBook_name(String book_name) {
		this.book_name = book_name;
	}

	public Integer getBook_price() {
		return book_price;
	}

	public void setBook_price(Integer book_price) {
		this.book_price = book_price;
	}

	public Integer getBook_quantity() {
		return book_quantity;
	}

	public void setBook_quantity(Integer book_quantity) {
		this.book_quantity = book_quantity;
	}

	public String getBook_lang() {
		return book_lang;
	}

	public void setBook_lang(String book_lang) {
		this.book_lang = book_lang;
	}

	public String getBook_description() {
		return book_description;
	}

	public void setBook_description(String book_description) {
		this.book_description = book_description;
	}

	public String getBook_image() {
		return book_image;
	}

	public void setBook_image(String book_image) {
		this.book_image = book_image;
	}

	public Long getAuthor_id() {
		return author_id;
	}

	public void setAuthor_id(Long author_id) {
		this.author_id = author_id;
	}

	public Long getCategory_id() {
		return category_id;
	}

	public void setCategory_id(Long category_id) {
		this.category_id = category_id;
	}

	public Long getPublisher_id() {
		return publisher_id;
	}

	public void setPublisher_id(Long publisher_id) {
		this.publisher_id = publisher_id;
	}

	
	
	
}
