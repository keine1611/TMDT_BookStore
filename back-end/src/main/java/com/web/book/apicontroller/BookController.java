package com.web.book.apicontroller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.book.dto.BookDTOReact;
import com.web.book.entity.Book;
import com.web.book.repository.BookRepository;


@RestController
@RequestMapping("/api/books")
public class BookController {
	
	@Autowired
    private BookRepository bookRepository;

	@GetMapping
	public  List<BookDTOReact> getAllBook(){
		List<BookDTOReact> books = bookRepository.findAllBooks();
		return books;
	}
	
	@GetMapping("/{id}")
	public Optional<BookDTOReact> getBookById(@PathVariable("id") Long id) {
		return bookRepository.getBookById(id);
	}
	
	
}
