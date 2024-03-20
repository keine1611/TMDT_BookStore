package com.web.book.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "books")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
property = "id")
public class Book {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String book_name;

	private Integer book_price;

	private Integer book_quantity;

	private String book_lang;

	@Column(length = 2000)
	private String book_description;
	
	private String book_image;
	
	@ManyToOne()
	@JoinColumn(name = "author_id", referencedColumnName = "id")
	private Author author;

	@ManyToOne()
	@JoinColumn(name = "category_id",referencedColumnName = "id")
	private Category category;

	@ManyToOne()
	@JoinColumn(name = "publisher_id",referencedColumnName = "id")
	private Publisher publisher;
	
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, 
			mappedBy = "book", orphanRemoval = true)
	private List<CartItem> cartItems;
	
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, 
			mappedBy = "book", orphanRemoval = true)
	private List<OrderDetail> orderDetails;
	

	public Book(Long id, String book_name, Integer book_price, Integer book_quantity, String book_lang,
			String book_description, String book_image, Author author, Category category, Publisher publisher,
			List<CartItem> cartItems, List<OrderDetail> orderDetails) {
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
		this.cartItems = cartItems;
		this.orderDetails = orderDetails;
	}

	public List<CartItem> getCartItems() {
		return cartItems;
	}

	public void setCartItems(List<CartItem> cartItems) {
		this.cartItems = cartItems;
	}

	public List<OrderDetail> getOrderDetails() {
		return orderDetails;
	}

	public void setOrderDetails(List<OrderDetail> orderDetails) {
		this.orderDetails = orderDetails;
	}

	public Book() {
		super();
	}
	
	public Book(Long id, String book_name, Integer book_price, Integer book_quantity, String book_lang,
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
