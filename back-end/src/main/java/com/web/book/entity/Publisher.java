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
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "publishers")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
property = "id")
public class Publisher {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String publisher_name;
	
	@Column(length = 2000)
	private String publisher_description;
	
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, 
			mappedBy = "publisher", orphanRemoval = true)
	private List<Book> books;

	
	public Publisher() {
		super();
	}


	public Publisher(Long id, String publisher_name, String publisher_description, List<Book> books) {
		super();
		this.id = id;
		this.publisher_name = publisher_name;
		this.publisher_description = publisher_description;
		this.books = books;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getPublisher_name() {
		return publisher_name;
	}


	public void setPublisher_name(String publisher_name) {
		this.publisher_name = publisher_name;
	}


	public String getPublisher_description() {
		return publisher_description;
	}


	public void setPublisher_description(String publisher_description) {
		this.publisher_description = publisher_description;
	}


	public List<Book> getBooks() {
		return books;
	}


	public void setBooks(List<Book> books) {
		this.books = books;
	}
	
}
