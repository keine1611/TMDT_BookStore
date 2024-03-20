package com.web.book.apicontroller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.book.entity.Publisher;
import com.web.book.repository.PublisherRepository;


@RestController
@RequestMapping("/api/publishers")
public class PublisherController {
	
	@Autowired
	private PublisherRepository publisherRepository;
	
	public PublisherController(PublisherRepository publisherRepos) {
		this.publisherRepository = publisherRepos;
	}
	
	@GetMapping
	public List<Publisher> getAllCategories() {
		return publisherRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public Optional<Publisher> getBookById(@PathVariable("id") Long id) {
		return publisherRepository.findById(id);
	}
}
