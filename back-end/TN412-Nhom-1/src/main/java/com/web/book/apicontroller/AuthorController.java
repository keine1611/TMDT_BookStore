package com.web.book.apicontroller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.book.entity.Author;
import com.web.book.repository.AuthorRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/authors")
public class AuthorController {
	
	@Autowired
	private AuthorRepository authorRepository;


	@GetMapping
	public List<Author> getAllAuthor() {
		return authorRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public Optional<Author> getBookById(@PathVariable("id") Long id) {
		return authorRepository.findById(id);
	}
}
