package com.web.book.apicontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.book.dto.BookInitDTO;
import com.web.book.dto.OrderDetailDTO;
import com.web.book.entity.Author;
import com.web.book.entity.Book;
import com.web.book.entity.Category;
import com.web.book.entity.OrderDetail;
import com.web.book.entity.Publisher;
import com.web.book.repository.AuthorRepository;
import com.web.book.repository.BookRepository;
import com.web.book.repository.CategoryRepository;
import com.web.book.repository.PublisherRepository;


@RestController
@RequestMapping("/api/initDB")
public class InitDBController {
	@Autowired
	private AuthorRepository authorRepository;
	@Autowired
	private BookRepository bookRepository;
	@Autowired
	private CategoryRepository categoryRepository;
	@Autowired
	private PublisherRepository publisherRepository;
	
	@PostMapping("/author")
	private ResponseEntity<?> initAuthor(@RequestBody List<Author> listAuthors) {
		try {
			for (Author author : listAuthors) {
				authorRepository.save(author);
			}	
			return ResponseEntity.ok("Success");
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Error");
		}
		
	}
	
	@PostMapping("/category")
	private ResponseEntity<?> initCategory(@RequestBody List<Category> listcCategories) {
		try {
			for (Category category :listcCategories ) {
				categoryRepository.save(category);
			}	
			return ResponseEntity.ok("Success");
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Error");
		}
		
	}
	
	@PostMapping("/publisher")
	private ResponseEntity<?> initPubisher(@RequestBody List<Publisher> listPublishers) {
		try {
			for (Publisher publisher :listPublishers ) {
				publisherRepository.save(publisher);
			}	
			return ResponseEntity.ok("Success");
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Error");
		}
		
	}
	
	@PostMapping("/book")
	private ResponseEntity<?> initBook(@RequestBody List<BookInitDTO> listbInitDTO) {
		try {
			for (BookInitDTO bookInitDTO :listbInitDTO ) {
				Author author = authorRepository.findById(bookInitDTO.getAuthor_id()).orElseThrow();
				Category category = categoryRepository.findById(bookInitDTO.getCategory_id()).orElseThrow();
				Publisher publisher = publisherRepository.findById(bookInitDTO.getPublisher_id()).orElseThrow();
				Book book = new Book();
				book.setBook_name(bookInitDTO.getBook_name());
				book.setBook_price(bookInitDTO.getBook_price());
				book.setBook_quantity(bookInitDTO.getBook_quantity());
				book.setBook_description(bookInitDTO.getBook_description());
				book.setBook_lang(bookInitDTO.getBook_lang());
				book.setBook_image(bookInitDTO.getBook_image());
				book.setAuthor(author);
				book.setCategory(category);
				book.setPublisher(publisher);
				bookRepository.save(book);
			}	
			return ResponseEntity.ok("Success");
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Error");
		}
		
	}
}
