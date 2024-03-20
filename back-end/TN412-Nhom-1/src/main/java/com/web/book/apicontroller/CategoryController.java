package com.web.book.apicontroller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.book.entity.Category;
import com.web.book.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
	
	@Autowired
	private CategoryRepository categoryRepository;

	public CategoryController(CategoryRepository categoryRepos) {
		this.categoryRepository = categoryRepos;
	}
	
	@GetMapping
	public List<Category> getAllCategories() {
		return categoryRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public Optional<Category> getBookById(@PathVariable("id") Long id) {
		return categoryRepository.findById(id);
	}
}
