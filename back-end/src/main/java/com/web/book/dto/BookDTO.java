package com.web.book.dto;

import com.web.book.entity.Author;
import com.web.book.entity.Category;
import com.web.book.entity.Publisher;

public class BookDTO {
	
	private Long id;

	private String book_name;

	private Integer book_price;

	private Integer book_quantity;

	private String book_lang;

	private String book_description;
	
	private String book_image;
	
	private Author author;

	private Category category;
	
	private Publisher publisher;

	public BookDTO() {
		super();
	}

	public BookDTO(Long id, String book_name, Integer book_price, Integer book_quantity, String book_lang,
			String book_description, String book_image, Author author, Category category, Publisher publisher) {
		super();
		this.id = id;
		this.book_name = book_name;
		this.book_price = book_price;
		this.book_quantity = book_quantity;
		this.book_lang = book_lang;
		this.book_description = book_description;
		this.book_image = book_image;
		this.author = author;
		this.category = category;
		this.publisher = publisher;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public Author getAuthor() {
		return author;
	}

	public void setAuthor(Author author) {
		this.author = author;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Publisher getPublisher() {
		return publisher;
	}

	public void setPublisher(Publisher publisher) {
		this.publisher = publisher;
	}
	
}
