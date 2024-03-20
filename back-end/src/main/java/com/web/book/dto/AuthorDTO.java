package com.web.book.dto;

import java.util.List;

import com.web.book.entity.Book;

public class AuthorDTO {
	
	private String author_name;
	private String author_description;
	private List<Book> books;
	
	public AuthorDTO() {
		super();
	}

	public AuthorDTO(String author_name, String author_description, List<Book> books) {
		super();
		this.author_name = author_name;
		this.author_description = author_description;
		this.books = books;
	}

	public String getAuthor_name() {
		return author_name;
	}

	public void setAuthor_name(String author_name) {
		this.author_name = author_name;
	}

	public String getAuthor_description() {
		return author_description;
	}

	public void setAuthor_description(String author_description) {
		this.author_description = author_description;
	}

	public List<Book> getBooks() {
		return books;
	}

	public void setBooks(List<Book> books) {
		this.books = books;
	}
	
}
