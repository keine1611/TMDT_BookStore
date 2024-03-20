package com.web.book.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.web.book.entity.Author;
import com.web.book.entity.Book;
import com.web.book.repository.AuthorRepository;
import com.web.book.repository.BookRepository;
import com.web.book.repository.CategoryRepository;
import com.web.book.repository.PublisherRepository;

public class DBService {


	@Autowired
	private BookRepository bookRepository;
	
	@Autowired
	private AuthorRepository authorRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private PublisherRepository publisherRepository;
	
	public void initAuthor() {
		
	}
	
	
}
